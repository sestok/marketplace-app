import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { toast } from 'react-toastify'
import autoParking from '../assets/svg/autoParking.svg'
import wheelIcon from '../assets/svg/wheelIcon.svg'
import carSeats from '../assets/svg/carSeats.svg'

function SingleListing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])
  if (loading) {
    return <Spinner />
  }
  return (
    <main>
      {/* Slider */}
      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          toast.success('Link Copied', {
            autoClose: 1000,
            hideProgressBar: true,
          })
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='Share' />
      </div>
      <div className='listingDetails'>
        <p className='listingName'>{listing.name}</p>
        <p className='listingName'>
          {'$'}
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.address}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            {'$'}
            {listing.regularPrice - listing.discountedPrice} OFF
          </p>
        )}
        <br />
        <br />
        <ul className='listingDetailsList'>
          <img src={autoParking} alt='Auto Parking' width='17' />
          <li>
            {listing.autoParking
              ? ' Auto-Parking feature is available in this car'
              : ' Auto-Parking N/A'}
          </li>
          <br />
          <img src={wheelIcon} alt='Wheels Size' width='17' />
          <li>
            Wheels size are{' '}
            {listing.wheels > 13
              ? `${listing.wheels} / Sport Size`
              : `${listing.wheels} / Normal Size`}
          </li>
          <br />
          <img src={carSeats} alt='Seats' width='17' />
          <li>
            This car has{' '}
            {listing.seats > 4
              ? `${listing.seats} seats / Comfortable Mode`
              : `${listing.seats} seats / Standard Mode`}
          </li>
        </ul>
        <br />
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
              Contact Owner
          </Link>
        )}
      </div>
    </main>
  )
}

export default SingleListing
