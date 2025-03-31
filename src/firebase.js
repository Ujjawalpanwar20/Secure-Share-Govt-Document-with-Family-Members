import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNAWz9qYCjXOdS2BkZ3-31rO0uOMYEmRw",
    authDomain: "docs-169a3.firebaseapp.com",
    projectId: "docs-169a3",
    storageBucket: "docs-169a3.firebasestorage.app",
    messagingSenderId: "13859033094",
    appId: "1:13859033094:web:279202b3086b1861f0f387"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

