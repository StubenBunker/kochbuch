import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getFirestoreDb, ensureSignedIn, isFirebaseConfigured } from '../lib/firebase';
import type { CustomItem, ShoppingCategory } from '../data/types';

export const DEFAULT_PORTIONS = 4;
const MAX_PORTIONS = 12;
const STORAGE_KEY = 'kochbuch:household:v1';
const HOUSEHOLD_DOC = 'shared';

export type HouseholdState = {
  plan: string[];
  portions: Record<string, number>;
  favs: Record<string, boolean>;
  checked: Record<string, boolean>;
  cart: Record<string, boolean>;
  customItems: CustomItem[];
};

type Store = HouseholdState & {
  hydrated: boolean;
  synced: boolean;
  portionFor: (id: string) => number;
  toggleAdd: (id: string) => void;
  setPortion: (id: string, delta: number) => void;
  removeFromPlan: (id: string) => void;
  toggleFav: (id: string) => void;
  toggleChecked: (key: string) => void;
  toggleCart: (id: string) => void;
  addCustomItem: (name: string, category: ShoppingCategory) => void;
  removeCustomItem: (id: string) => void;
};

function pick(s: HouseholdState): HouseholdState {
  return {
    plan: s.plan,
    portions: s.portions,
    favs: s.favs,
    checked: s.checked,
    cart: s.cart,
    customItems: s.customItems,
  };
}

function withoutKey<T>(record: Record<string, T>, key: string): Record<string, T> {
  const { [key]: _removed, ...rest } = record;
  return rest;
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePersist(state: HouseholdState) {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  if (!isFirebaseConfigured) return;
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    ensureSignedIn()
      .then(() => setDoc(doc(getFirestoreDb(), 'households', HOUSEHOLD_DOC), state))
      .catch((e) => console.warn('Firestore-Sync fehlgeschlagen', e));
  }, 250);
}

export const useHousehold = create<Store>((set, get) => ({
  plan: [],
  portions: {},
  favs: {},
  checked: {},
  cart: {},
  customItems: [],
  hydrated: false,
  synced: false,
  portionFor: (id) => get().portions[id] ?? DEFAULT_PORTIONS,
  toggleAdd: (id) =>
    set((s) => {
      const inPlan = s.plan.includes(id);
      const plan = inPlan ? s.plan.filter((x) => x !== id) : [...s.plan, id];
      // Newly planned recipes default into the shopping cart; leaving the plan
      // also drops them from the cart so no stale selection lingers.
      const cart = inPlan ? withoutKey(s.cart, id) : { ...s.cart, [id]: true };
      schedulePersist(pick({ ...s, plan, cart }));
      return { plan, cart };
    }),
  setPortion: (id, delta) =>
    set((s) => {
      const current = s.portions[id] ?? DEFAULT_PORTIONS;
      const value = Math.max(1, Math.min(MAX_PORTIONS, current + delta));
      const portions = { ...s.portions, [id]: value };
      schedulePersist(pick({ ...s, portions }));
      return { portions };
    }),
  removeFromPlan: (id) =>
    set((s) => {
      const plan = s.plan.filter((x) => x !== id);
      const cart = withoutKey(s.cart, id);
      schedulePersist(pick({ ...s, plan, cart }));
      return { plan, cart };
    }),
  toggleFav: (id) =>
    set((s) => {
      const favs = { ...s.favs, [id]: !s.favs[id] };
      schedulePersist(pick({ ...s, favs }));
      return { favs };
    }),
  toggleChecked: (key) =>
    set((s) => {
      const checked = { ...s.checked, [key]: !s.checked[key] };
      schedulePersist(pick({ ...s, checked }));
      return { checked };
    }),
  toggleCart: (id) =>
    set((s) => {
      const cart = { ...s.cart, [id]: !s.cart[id] };
      schedulePersist(pick({ ...s, cart }));
      return { cart };
    }),
  addCustomItem: (name, category) =>
    set((s) => {
      const trimmed = name.trim();
      if (!trimmed) return {};
      const item: CustomItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: trimmed,
        category,
      };
      const customItems = [...s.customItems, item];
      schedulePersist(pick({ ...s, customItems }));
      return { customItems };
    }),
  removeCustomItem: (id) =>
    set((s) => {
      const customItems = s.customItems.filter((i) => i.id !== id);
      const checked = withoutKey(s.checked, `custom:${id}`);
      schedulePersist(pick({ ...s, customItems, checked }));
      return { customItems, checked };
    }),
}));

export async function initHouseholdSync(): Promise<void> {
  try {
    const cached = await AsyncStorage.getItem(STORAGE_KEY);
    if (cached) {
      useHousehold.setState(JSON.parse(cached) as HouseholdState);
    }
  } catch (e) {
    console.warn('Konnte lokalen Stand nicht laden', e);
  } finally {
    useHousehold.setState({ hydrated: true });
  }

  if (!isFirebaseConfigured) return;

  try {
    await ensureSignedIn();
    const ref = doc(getFirestoreDb(), 'households', HOUSEHOLD_DOC);
    onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) return;
        const data = snap.data() as HouseholdState;
        const next = {
          plan: data.plan ?? [],
          portions: data.portions ?? {},
          favs: data.favs ?? {},
          checked: data.checked ?? {},
          cart: data.cart ?? {},
          customItems: data.customItems ?? [],
        };
        useHousehold.setState({ ...next, synced: true });
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      },
      (err) => console.warn('Firestore-Listener-Fehler', err),
    );
  } catch (e) {
    console.warn('Firebase-Anmeldung fehlgeschlagen', e);
  }
}
