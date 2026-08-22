import { initializeApp, getApps } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { initializeAuth, signInAnonymously, type Auth, type Persistence } from 'firebase/auth';
import { initializeFirestore, type Firestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

// `getReactNativePersistence` ships in Firebase's React Native build (resolved at runtime via
// Metro's package-export conditions) but is missing from the published `firebase/auth` types.
const { getReactNativePersistence } = FirebaseAuth as typeof FirebaseAuth & {
  getReactNativePersistence: (storage: typeof AsyncStorage) => Persistence;
};

const extra = (Constants.expoConfig?.extra ?? {}) as { firebase?: Partial<FirebaseConfig> };
const config = extra.firebase;

export const isFirebaseConfigured = Boolean(
  config?.apiKey && config?.projectId && config?.appId,
);

let firestore: Firestore | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  const app = getApps().length ? getApps()[0] : initializeApp(config as FirebaseConfig);
  firestore = initializeFirestore(app, {});
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export function getFirestoreDb(): Firestore {
  if (!firestore) {
    throw new Error(
      'Firebase ist nicht konfiguriert. Trage deine Firebase-Projektdaten in app.json unter expo.extra.firebase ein.',
    );
  }
  return firestore;
}

export async function ensureSignedIn(): Promise<string> {
  if (!auth) {
    throw new Error('Firebase ist nicht konfiguriert.');
  }
  if (auth.currentUser) return auth.currentUser.uid;
  const credential = await signInAnonymously(auth);
  return credential.user.uid;
}
