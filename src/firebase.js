// Importa le funzioni Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configurazione della tua app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGp2grA8Co3tHUWgbOTTYeVFIxnbA_DD0",
  authDomain: "gs-smart-consulting.firebaseapp.com",
  projectId: "gs-smart-consulting",
  storageBucket: "gs-smart-consulting.firebasestorage.app",
  messagingSenderId: "1047119759520",
  appId: "1:1047119759520:web:7c88b53b0e04de4fb321c5",
  measurementId: "G-BJEKM6S8XC"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
