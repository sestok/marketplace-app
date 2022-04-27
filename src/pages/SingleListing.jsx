import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { toast } from 'react-toastify'

function SingleListing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  const regularPriceNew = listing.regularPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const discountedPriceNew = listing.discountedPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const discounteAmount = listing.regularPrice - listing.discountedPrice
  const discounteAmountSum = discounteAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log(docSnap.data())
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
          {listing.offer ? discountedPriceNew : regularPriceNew}
        </p>
        <p className='listingLocation'>{listing.address}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>{'$'}{discounteAmountSum} OFF</p>
        )}
      </div>
    </main>
  )
}

export default SingleListing
