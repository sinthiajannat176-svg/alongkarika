import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_EeM5Q5qlNbNVepSM042C22EjuVRs0iI",
  authDomain: "steal-617ab.firebaseapp.com",
  projectId: "steal-617ab",
  storageBucket: "steal-617ab.firebasestorage.app",
  messagingSenderId: "447186337755",
  appId: "1:447186337755:web:0b19c0fb959d0e6b9531fe"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
