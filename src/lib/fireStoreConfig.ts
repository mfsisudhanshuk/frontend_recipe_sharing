// firebaseConfig.js
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDj_EKxxhmGb5S5xrX0Kk2vJ20fTVxzs-o",//process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: "fir-demo-dcda5.firebaseapp.com", //process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "fir-demo-dcda5",//process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, 
  storageBucket: "fir-demo-dcda5.firebasestorage.app",//process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "417244002019",//process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, 
  appId:  "1:417244002019:web:548f07514e026309e537d6",//process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Firebase services
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
