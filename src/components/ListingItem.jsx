import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import wheelIcon from '../assets/svg/wheelIcon.svg'
import carSeats from '../assets/svg/carSeats.svg'
import autoParking from '../assets/svg/autoParking.svg'

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/cat/${listing.type}/${listing.name}`}
        className='categoryListingLink'
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.address}</p>
          <p className='categoryListingName'>{listing.name}</p>
          <p className='categoryListingPrice'>
            USD{' '}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && '/ Month'}
          </p>
          <div className='categoryListingInfoDiv'>
            <img src={wheelIcon} alt='Seats' width='17' />
            <p className='categoryListingInfoText'>
              {listing.wheels > 4
                ? `${listing.wheels} Size / Sport`
                : 'Standard'}
            </p>
            <img src={autoParking} alt='Auto Parking' width='17' />
            <p className='categoryListingInfoText'>
              {listing.autoParking
                ? 'Auto-Parking Available'
                : 'Auto-Parking N/A'}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231,76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </li>
  )
}

export default ListingItem
