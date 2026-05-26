import { initializeApp }
from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

  apiKey:
    "AIzaSyBPLbQV2CwmttgsX_BeaW7T5IJ21Euze2M",

  authDomain:
    "expense-tracker-app-f4a57.firebaseapp.com",

  projectId:
    "expense-tracker-app-f4a57",

  storageBucket:
    "expense-tracker-app-f4a57.firebasestorage.app",

  messagingSenderId:
    "147151416755",

  appId:
    "1:147151416755:web:0312a0b6716503558aafc6",

  measurementId:
    "G-ENFMSHT5M9",

};

/* =========================
   INITIALIZE FIREBASE
========================= */

const app =
  initializeApp(
    firebaseConfig
  );

/* =========================
   EXPORT AUTH + DB
========================= */

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);