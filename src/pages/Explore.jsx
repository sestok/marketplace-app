import React from 'react'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import { Link } from 'react-router-dom'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/cat/rent'>
            <img
              src={rentCategoryImage}
              className='exploreCategoryImg'
              alt='Rent'
            />
            <p className='exploreCategoryName'>Rent your car</p>
          </Link>
          <Link to='/cat/sale'>
            <img
              src={sellCategoryImage}
              className='exploreCategoryImg'
              alt='Sell'
            />
            <p className='exploreCategoryName'>Sell your Car</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
