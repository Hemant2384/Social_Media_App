import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'

const Home = () => {

    const loggedin = localStorage.getItem('user-token')

  return (
    <div>
        {loggedin && <Navbar/>}
        Welcome
    </div>
  )
}

export default Home