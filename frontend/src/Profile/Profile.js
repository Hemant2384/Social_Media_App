import React from 'react'
import Post from './Post'

const Profile = () => {
  
  const authenticated = localStorage.getItem('user-token') || "";
  
  return (
    <div>
      {
        authenticated ? 
        <>
        Profile
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