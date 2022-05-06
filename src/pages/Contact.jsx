import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
  const [message, setMessage] = useState('')
  const [ownerId, setOwnerId] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, 'users', params.ownerId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setOwnerId(docSnap.data)
      } else {
        toast.error('Error retrieving data')
      }
    }
    getOwner()
  }, [params.ownerId])
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Gontact the Owner</p>
      </header>
      {ownerId !== null && (
          <main>
              div.contact
          </main>
      )}
    </div>
  )
}

export default Contact
