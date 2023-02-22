import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'xxxxxxxxxxx',
  authDomain: 'marketplace-app-47034.firebaseapp.com',
  projectId: 'marketplace-app-47034',
  storageBucket: 'marketplace-app-47034.appspot.com',
  messagingSenderId: '$GITHUB_secret_to_use',
  appId: '_secret_to_use'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore()
