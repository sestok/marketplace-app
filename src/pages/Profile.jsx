import React from 'react'
import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import rightArrow from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  const [changeInfo, setChangeInfo] = useState(false)
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData
  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    toast.success('Signed Out Successfully', {
      autoClose: 2500,
      hideProgressBar: true,
    })
    navigate('/')
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //Update display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        //Update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name,
        })
        toast.success('Updated successfully', {
          autoClose: 2500,
          hideProgressBar: true,
        })
      }
    } catch (error) {
      toast.error('Error updating profile', {
        autoClose: 2500,
        hideProgressBar: true,
      })
    }
  }
  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button className='logOut' type='button' onClick={onLogout}>
          Sign out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Account Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeInfo && onSubmit()
              setChangeInfo((prevState) => !prevState)
            }}
          >
            {changeInfo ? 'Done' : 'Change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeInfo ? 'profileName' : 'profileNameActive'}
              disabled={!changeInfo}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeInfo ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeInfo}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/new-listing' className='createListing'>
          <img src={homeIcon} alt='Home' />
          <p>Create a new listing</p>
          <img src={rightArrow} alt='' />
        </Link>
      </main>
    </div>
  )
}

export default Profile
