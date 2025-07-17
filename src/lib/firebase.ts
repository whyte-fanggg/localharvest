import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyChy2SbUt0dksiyO3qURfKk9Z4IMjt_uN0",
    authDomain: "localharvest-5adf0.firebaseapp.com",
    projectId: "localharvest-5adf0",
    storageBucket: "localharvest-5adf0.firebasestorage.app",
    messagingSenderId: "957549149573",
    appId: "1:957549149573:web:894b98ba5c4d7bf67e58ec"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
