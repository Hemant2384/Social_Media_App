import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import './Signup.css'

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')

    const handleSubmit = (e) => {
        // callapi
        e.preventDefault();
        axios.post('http://localhost:8000/register', 
        {
            username: username,
            email: email,
            password: password,
            dob: dob
        })
        .then(res => {
            alert(`${res.data} User registerd`)
            console.log(`${res.data.user} User registerd`);
        }).catch(err => {
            alert(err)
        })

        setUsername('')
        setPassword('')
        setEmail('')
        setDob('')
    }
  return (
    <form onSubmit={handleSubmit} className='signup'>
        <h3 className='signup-head'>Signup</h3>
    <label htmlFor='username'>
        Username: 
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
    </label>
    <label htmlFor='password'>
        Password: 
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    </label>
    <label htmlFor='email'>
        Email: 
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
    </label>
    <label htmlFor='date'>
        Date of Birth: 
        <input type='date' value={dob} onChange={(e) => setDob(e.target.value)}/>
    </label>
    <h4><Link className="navigate" to='/'>Already Have an Account ?</Link></h4>
    <button className='signin-button' type='submit'>Sign Up</button>
</form>
  )
}

export default Signup