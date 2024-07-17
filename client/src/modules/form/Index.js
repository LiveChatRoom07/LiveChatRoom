<<<<<<< HEAD
import React from 'react';
import './Index.css';
import Input from '../../components/Input/Input.js'
import Button from '../../components/Buttons/Button.js';
=======
>>>>>>> 3f1908eb9bfe5f0a7f47601447cb32392abdcce0

import React, { useState } from 'react'
import Input from '../../components/Input.js'
import Button from '../../components/Buttons/Button.js'
import './Index.css'


function Index( {isSignInPage=false} ){

  const[data, setData] = useState({
    ...(isSignInPage && {UserName:''}),
    Email:'',
    Password:''
  })

  // console.log('data :>>', data);

  return (
    <div className='box'>
        <div className='heading'>
          Welcome {isSignInPage && "Back..."}
        </div>
        <div className='text'>{isSignInPage ? 'Sign in to get explored.!' : 'Sign up to get started.!'}</div>

        <form onSubmit={() => console.log("Submited!")}>
          <Input label="User Name" placeholder="Enter your Name" name="name" isrequired="true" length="15" value={data.UserName} onChange={(e) => setData({...data, UserName: e.target.value}) } />
          {!isSignInPage && <Input label="E-mail" type="email" name="email" placeholder="Enter your Email Address" isrequired="true" value={data.Email} onChange={(e) => setData({...data, Email: e.target.value}) }/>}
          <Input label="Password" type="password" name="password" placeholder="Enter Password" isrequired="true" value={data.Password} onChange={(e) => setData({...data, Password: e.target.value}) } />
          {isSignInPage && <div className='password-text'>Forgot Password?</div>}
          <Button label= {isSignInPage ? 'Sign in' : 'Sign up'} type="submit"/>
        </form>
        <div className='signin-text'> 
          {isSignInPage ? "Didn't have an account? " : "Already have an account? "} <span className='signin'>{isSignInPage?'Sign up':'Sign in'}</span>
        </div>
    </div>
  )
}

export default Index