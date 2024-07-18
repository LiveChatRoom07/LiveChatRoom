
import React, { useState } from 'react'
import Input from '../../components/Input/Input.js'
import Button from '../../components/Buttons/Button.js'
import './Index.css'
import { useNavigate } from 'react-router-dom';

// isSignInPage = true for LogIn page
function Index( {isSignInPage=false} ){

  const navigate = useNavigate()

  //store input values
  const[data, setData] = useState({
    ...(isSignInPage && {UserName:''}),
    Email:'',
    Password:''
  })

  // console.log('data :>>', data); //print data

  return (
    <div className='box'>

        <div className='heading'>
          Welcome {isSignInPage && "Back..."}
        </div>

        <div className='text'>
          {isSignInPage ? 'Sign in to get explored.!' : 'Sign up to get started.!'}
        </div>

        <form onSubmit={() => console.log("Submited!")}>

          {/* //input name */}
          <Input label="User Name" placeholder="Enter your Name" name="name" isrequired="true" length="15" value={data.UserName} onChange={(e) => setData({...data, UserName: e.target.value}) } />

          {/* input email */}
          {!isSignInPage && <Input label="E-mail" type="email" name="email" placeholder="Enter your Email Address" isrequired="true" value={data.Email} onChange={(e) => setData({...data, Email: e.target.value}) }/>}

          {/* input password */}
          <Input label="Password" type="password" name="password" placeholder="Enter Password" isrequired="true" value={data.Password} onChange={(e) => setData({...data, Password: e.target.value}) } />

          {/* forgot password option */}
          {isSignInPage && <div className='password-text'>Forgot Password?</div>}

          {/* LogIn/SignIn button */}
          <Button label= {isSignInPage ? 'Sign in' : 'Sign up'} type="submit"/>

        </form>

        {/* alternative page check */}
        <div className='signin-text'> 
          {isSignInPage ? "Didn't have an account? " : "Already have an account? "} 
          <span className='signin' onClick={() => navigate(`/user/${isSignInPage ? 'sign_up' : 'sign_in'}`)} >{isSignInPage?'Sign up':'Sign in'}</span>
        </div>

    </div>
  )
}

export default Index