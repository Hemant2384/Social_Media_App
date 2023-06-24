import {React} from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import {RiLogoutCircleRLine} from 'react-icons/ri'

const Logout = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        
        const token = localStorage.getItem('user-token')
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post('http://localhost:8000/user/logout').then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => {
            alert(err)
        })
        localStorage.removeItem('user-token')
    }

  return (
    <div>
        <RiLogoutCircleRLine className='logout-button' type='submit' onClick={handleSubmit}/>
        {/* <button className='logout-button' type='submit' onClick={handleSubmit}>Logout</button> */}
    </div>
  )
}

export default Logout