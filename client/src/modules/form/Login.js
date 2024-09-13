import React, { useState, useEffect } from 'react';
import './Login.css';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Buttons/Button';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  // const [socket, setSocket] = useState(null);
  const navigate = useNavigate()

    const[otp, setOtp] = useState(new Array(4).fill(""));

    //store email id and OTP
    const[email, setEmail] = useState('');
    const[otpsave, setOtpsave] = useState('');

    //comparing user email and sending OTP
    const findUser = async(e,email) => {
      e.preventDefault();//prevent page reload
      try{
      const res = await fetch(`http://localhost:8000/api/findUser/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        } 
      });
      const resData = await res.json();
      console.log(resData);
      if(resData === 1){  
      const OTP=Math.floor(1000 + Math.random() * 9000);
        console.log(OTP);
        setOtpsave(OTP);
        //send OTP to user email
        const response = await fetch(`http://localhost:8000/api/send_recovery_email/${email}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({OTP})
        });
        console.log(OTP);
        
        console.log('response:', response);
        if (response.status === 500) {
          throw new Error('Failed to send recovery email');
        }
          const resedata = await response.json();
          localStorage.setItem('user:email', resedata)
          console.log('resedata:',resedata);
      }
      else{
        alert('User not found');
      }
    }
    catch(error){
      console.log('Failed to find user');
    }
  };

  //compare OTP
  const checkOtp = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        console.log('Your entered OTP is:', otpCode);
        console.log('Your Saved OTP is:', otpsave);
        if(otpCode == otpsave)
        {
          navigate('/user/Password_Setting');
        }
        else {
          alert('Invalid OTP!');
        }
    };

  const handleSubmit = async(e, i) => {
    e.preventDefault();
    if(isNaN(e.target.value)) return false;
    setOtp([...otp.map((data, indx)=>(indx === i? e.target.value:data))]);

    if(e.target.value && e.target.nextSibling)
    {
      e.target.nextSibling.focus()
    }
  }

  return (

    <div className='box1'>

        <form onSubmit={(e) => findUser(e,email)}>

            <div className='email'>

                {/* //take email */}
                <Input label="E-mail" type="email" name="email" placeholder="Email Address" isrequired="true" value={email} onChange={(e) => setEmail(e.target.value) }/>

                {/* send otp btn */}
                <Button label='Generate OTP' type='submit'/>    

            </div>

        </form>
        <form onSubmit={(e) => checkOtp(e)}>

            <div className='otp-container'>

              <div className='otp-box'>
                {
                    otp.map((data, i) => {
                        return <input type="text" value={data} maxLength={1} onChange={(e) => handleSubmit(e,i)} />
                    })
                
                }

              </div>
              <Button label='Submit' type='submit'/>

            </div>

        </form>

    </div>
  )
}

export default Login



//onSubmit={(e) => {
//   e.preventDefault();
//   setData({OTP: data1.A+data1.B+data1.C+data1.D})
//   navigate('/user/Password_Setting')
// }}