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
    seats: '',
    wheels: '',
    autoParking: true,
    address: '',
    images: {},
    latitude: 0,
    longitude: 0,
    offer: true,
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
    let boolean = null
    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
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
          <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='7'
            required
          />
          <label className='formLabel'>Auto Parking</label>
          <div className='formButtons'>
            <button
              className={autoParking ? 'formButtonActive' : 'formButton'}
              type='button'
              id='autoParking'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !autoParking && autoParking !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='autoParking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Wheels</label>
              <input
                className='formInputSmall'
                type='number'
                id='wheels'
                value={wheels}
                onChange={onMutate}
                min='10'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Seats</label>
              <input
                className='formInputSmall'
                type='number'
                id='seats'
                value={seats}
                onChange={onMutate}
                min='3'
                max='8'
                required
              />
            </div>
          </div>
          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />
          <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ /Month</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  )
}

export default NewListing
