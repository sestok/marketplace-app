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
  if (loading) {
    return <Spinner />
  }
  return <div>NewListing</div>
}

export default NewListing
