import React, { useState } from 'react'
import Input from '../../components/Input/Input.js'
import Button from '../../components/Buttons/Button.js'
import './Index.css'
import { useNavigate } from 'react-router-dom';

// isSignInPage = true for LogIn page
function Index( {isSignInPage=false} ){

  //store input values
  const[data, setData] = useState({
    ...(isSignInPage && {username:''}),
    email:'',
    password:''
  })

  const Navigate = useNavigate();

  const handleSubmit = async(e) => {
    console.log('data :>>', data); //print data
    e.preventDefault();//prevent page reload
    const res = await fetch(`http://localhost:8000/api${isSignInPage ? '/login' : '/register'}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(res.status === 400) {
        alert('Invalid credentials')
    }
    else{
        const resData = await res.json()
        if(resData.token) {
            localStorage.setItem('user:token', resData.token)
            localStorage.setItem('user:detail', JSON.stringify(resData.user));
            
            Navigate('/')
        }
    }

  }

  return (
    <div className='box'>

        <div className='heading'>
          Welcome {isSignInPage && "Back..."}
        </div>

        <div className='text'>
          {isSignInPage ? 'Sign in to get explored.!' : 'Sign up to get started.!'}
        </div>

        <form method='POST' onSubmit={(e) => handleSubmit(e) }>

          {/* //input name */}
          <Input label="User Name" placeholder="Enter your Name" name="name" isrequired="true" length="15" value={data.username} onChange={(e) => setData({...data, username: e.target.value}) } />

          {/* input email */}
          {!isSignInPage && <Input label="E-mail" type="email" name="email" placeholder="Enter your Email Address" isrequired="true" value={data.email} onChange={(e) => setData({...data, email: e.target.value}) }/>}

          {/* input password */}
          <Input label="Password" type="password" name="password" placeholder="Enter Password" isrequired="true" value={data.password} onChange={(e) => setData({...data, password: e.target.value}) } />

          {/* forgot password option */}
          {isSignInPage && <div className='password-text'>Forgot Password?</div>}

          {/* LogIn/SignIn button */}
          <Button label= {isSignInPage ? 'Sign in' : 'Sign up'} type="submit"/>

        </form>

        {/* alternative page check */}
        <div className='signin-text'> 
          {isSignInPage ? "Didn't have an account? " : "Already have an account? "} 
          <span className='signin' onClick={() => Navigate(`/user/${isSignInPage ? 'sign_up' : 'sign_in'}`)} >{isSignInPage?'Sign up':'Sign in'}</span>
        </div>

    </div>
)
}
export default Index