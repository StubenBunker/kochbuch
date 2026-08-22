import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getFirestoreDb, ensureSignedIn, isFirebaseConfigured } from '../lib/firebase';

export const DEFAULT_PORTIONS = 2;
const MAX_PORTIONS = 12;
const STORAGE_KEY = 'kochbuch:household:v1';
const HOUSEHOLD_DOC = 'shared';

export type HouseholdState = {
  plan: string[];
  portions: Record<string, number>;
  favs: Record<string, boolean>;
  checked: Record<string, boolean>;
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
};

function pick(s: HouseholdState): HouseholdState {
  return { plan: s.plan, portions: s.portions, favs: s.favs, checked: s.checked };
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
  hydrated: false,
  synced: false,
  portionFor: (id) => get().portions[id] ?? DEFAULT_PORTIONS,
  toggleAdd: (id) =>
    set((s) => {
      const inPlan = s.plan.includes(id);
      const plan = inPlan ? s.plan.filter((x) => x !== id) : [...s.plan, id];
      schedulePersist(pick({ ...s, plan }));
      return { plan };
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
      schedulePersist(pick({ ...s, plan }));
      return { plan };
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
