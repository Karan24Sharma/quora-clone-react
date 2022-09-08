import React from 'react'
import './Login.css'
import {signInWithPopup} from 'firebase/auth'
import { auth, provider } from '../../Firebase'

function Login() {

  const handleSubmit = async() => {
    await signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    })
  }

  return (
    <div className = "login-container">
        <div className='login-content'>
            <img src = "https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif" alt = 'logo'/>
            <button onClick = {handleSubmit} className='btn-login'>Login</button>
        </div>
    </div>
  )
}

export default Login