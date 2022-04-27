import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

function SingleListing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  useEffect(() => {
      const fetchListing = async () => {
          const docRef = db(db, 'listings', params.listingId)
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()) {
              console.log(docSnap.data)
              setListing(docSnap.data)
              setLoading(false)
          }
      }
      fetchListing()
  }, [navigate, params.listingId])
  return <div>SingleListing</div>
}

export default SingleListing
