import React from 'react'
import './header.css'
import TTD from '../../images/TTD.png'

function Header() {
  return (
    <div className='header-container'>
        <img src={TTD} alt="logo" style={{ height: '250px', width: '250px'}} />
    </div>
  )
}

export default Header