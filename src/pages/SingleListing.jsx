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
  const [loading, setLoading] = useState(null)
  const [shareLinkCopied, setShareLinkCopied] = useState(null)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  useEffect(() => {
      
  })
  return <div>SingleListing</div>
}

export default SingleListing
