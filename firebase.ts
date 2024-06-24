import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';
import firebaseConfig from './firebaseConfig';

const isBrowser = () => typeof window !== 'undefined';

const initFirebase: any = (): FirebaseApp | null => {
  if (!isBrowser()) {
    return null;
  }

  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};

const firebaseApp = initFirebase();

export const messaging: Messaging | null = firebaseApp
  ? getMessaging(firebaseApp)
  : null;
