import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // Checking for the user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      // Create use if doesn't exist
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
        toast.success('Successfully auothrized')
        navigate('/')
      }
    } catch (error) {
      toast.error('Could not complete the authorization')
    }
  }
  return (
    <div className='socialLogin'>
      <p>
        Sign {location.pathname === '/sign-up' ? 'Up' : 'In'} With
        <button className='socialIconDiv' onClick={onGoogleClick}>
          <img
            className='socialIconImg'
            src={googleIcon}
            alt='Process with Google Account'
          />
        </button>
      </p>
    </div>
  )
}

export default OAuth
