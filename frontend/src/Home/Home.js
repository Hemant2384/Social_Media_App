import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import {BarWave, Hypnosis, FillingBottle} from "react-cssfx-loading";

const Home = () => {

    const [loggedin, setLoggedIn] = useState()
    useEffect(() => {
      const interval = setInterval(() => {
        setLoggedIn(localStorage.getItem('user-token'))
      }, 1500);
      return () => clearInterval(interval);
    }, []);

  return (
    <div>
        {!loggedin ? 
        <>
        <FillingBottle className="loader"/>
        </>
        :
        <Navbar/>}
    </div>
  )
}

export default Home