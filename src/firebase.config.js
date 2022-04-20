import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDW4xPOz9Z_oVUGL6T5vhS9ZkFQnhKp1PI',
  authDomain: 'marketplace-app-47034.firebaseapp.com',
  projectId: 'marketplace-app-47034',
  storageBucket: 'marketplace-app-47034.appspot.com',
  messagingSenderId: '802734237380',
  appId: '1:802734237380:web:2cdf6c30249e663e380b91',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore()
