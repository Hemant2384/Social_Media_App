import React, { useState } from 'react'
import axios from 'axios'

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
        <h3>Signup</h3>
    <label>
        Username: 
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
    </label>
    <label>
        Password: 
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    </label>
    <label>
        Email: 
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
    </label>
    <label>
        Date of Birth: 
        <input type='date' value={dob} onChange={(e) => setDob(e.target.value)}/>
    </label>
    <button type='submit'>Sign Up</button>
</form>
  )
}

export default Signup