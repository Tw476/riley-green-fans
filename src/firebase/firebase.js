import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCkXRj31oVv6VG0yilU6HxsfKPucwzatd0",
  authDomain: "rileygreen-701ed.firebaseapp.com",
  projectId: "rileygreen-701ed",
  storageBucket: "rileygreen-701ed.appspot.com",
  messagingSenderId: "291098595836",
  appId: "1:291098595836:web:427da52f9206f099cca279"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)