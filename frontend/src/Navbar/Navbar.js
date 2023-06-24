import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import Logout from '../Login and Signup/Logout'
import {BsMessenger} from 'react-icons/bs'
import {RiNotification2Fill} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'

const Navbar = () => {
  return (
        <nav className="navbar">
        <div className="navbar-container container">
            <input type="checkbox" name="" id=""/>
            {/* <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div> */}
            <ul className="menu-items">
                <li><a href="/profile"><CgProfile/></a></li>
                <li><a href="/"><BsMessenger/></a></li>
                <li><a href="/"><RiNotification2Fill/></a></li>
                <li><Logout/></li>
            </ul>
            <Link to='/'><h1 className="logo">Muse</h1></Link>
        </div>
    </nav>
  )
}

export default Navbar