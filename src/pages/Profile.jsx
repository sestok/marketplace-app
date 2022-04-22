import React from 'react'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

function Profile() {
  const auth = getAuth()
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Account</p>
        <button className='logOut' type='button' onClick={onLogout}>
          Sign out
        </button>
      </header>
    </div>
  )
}

export default Profile
