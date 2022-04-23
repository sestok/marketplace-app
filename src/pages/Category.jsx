import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Gettings reference
        const listingsRef = collection(db, 'listings')
        // Preforming a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(7)
        )
        // Query Snapshot
        const querySnap = await getDocs(q)
        let listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Error loading the data', {
          autoClose: 2500,
          hideProgressBar: true,
        })
      }
    }
    fetchListings()
  }, [])

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent' ? 'Cars for Rent' : 'Cars for Sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listings) => {
                <h3>{listings.data.name}</h3>
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings available for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
