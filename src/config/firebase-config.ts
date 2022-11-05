import admin from 'firebase-admin';

import * as client from 'firebase/app';
import { getStorage } from 'firebase/storage';

const adminApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const clientApp = client.initializeApp({
  apiKey: process.env.FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
  messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CLIENT_APP_ID,
  measurementId: process.env.FIREBASE_CLIENT_MEANSUREMENT_ID,

  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const auth = admin.auth(adminApp);
const storage = admin.storage(adminApp).bucket();

const clientStorage = getStorage(clientApp);

export default { auth, storage, client: { storage: clientStorage } };
