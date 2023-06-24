import React from 'react'
import Post from './Post'
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  
  const authenticated = localStorage.getItem('user-token') || "";
  
  return (
    <div>
      {
        authenticated ? 
        <>
        <Navbar/>
        <Post/>
        </>
        :
        <>
        <div>Error</div>
        </>
      }
    </div>
  )
}

export default Profile