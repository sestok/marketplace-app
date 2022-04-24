import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function NewListing() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'sale',
    name: '',
    seats: '4',
    wheels: '13',
    autoParking: false,
    address: '',
    images: {},
    latitude: '',
    longitude: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
  })
  const {
    type,
    name,
    seats,
    wheels,
    autoParking,
    address,
    offer,
    images,
    latitude,
    longitude,
    regularPrice,
    discountedPrice,
  } = formData
  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])
  const onSubmit = (e) => {
    e.preventDefault()
  }
  const onMutate = (e) => {
    // here
  }
  if (loading) {
    return <Spinner />
  }
  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Add a New Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <div className='formButtons'>
            <button
              type='button'
              id='type'
              value='sale'
              onClick={onMutate}
              className={type === 'sale' ? 'formButtonActive' : 'formButton'}
            >
              Sell
            </button>
            <button
              type='button'
              id='type'
              value='rent'
              onClick={onMutate}
              className={type === 'rent' ? 'formButtonActive' : 'formButton'}
            >
              Rent
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default NewListing
