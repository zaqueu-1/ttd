import React from 'react'
import './header.css'
import TTD from '../../images/TTD.png'

function Header() {
  return (
    <div className='header-container'>
        <img src={TTD} alt="logo" className='header-logo' />
    </div>
  )
}

export default Header