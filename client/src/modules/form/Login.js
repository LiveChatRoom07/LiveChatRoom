import React, { useState, useEffect } from 'react';
import './Login.css';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Buttons/Button';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  // const [socket, setSocket] = useState(null);
  const navigate = useNavigate()

    //store email id and OTP
    const[email, setData] = useState("")

    const [otp, setOtp] = useState(new Array(4).fill(""))

    // let data = 0;
    const handleSubmit = (e, i) => {
        if(isNaN(e.target.value)) return false;

        setOtp([...otp.map((data,ind) => (ind === i? e.target.value:data))]);

        if(e.target.value && e.target.nextSibling){
          e.target.nextSibling.focus()
        }
    }

    const OTP = Math.floor(1000 + Math.random() * 9000);

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
        // setOTP(O);
        console.log(OTP);
        //send OTP to user email
        const response = await fetch(`http://localhost:8000/api/send_recovery_email/${email}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({OTP})
        });
        
        console.log('response:', response);
        if (!response.ok) {
          throw new Error('Failed to send recovery email');
        }
          const resedata = await response.json();
          console.log(resedata);
      }
      else{
        alert('User not found');
      }
    }
    catch(error){
      console.log('Failed to find user');
    }
  };

  console.log(OTP);
  //compare OTP
  const checkOtp = async(e) => {
    e.preventDefault();
    // setData({...data1, otp: data1.A+data1.B+data1.C+data1.D})
    console.log('OTP:', OTP, otp);
    if(OTP === otp)
      navigate('/user/Password_Setting')
    else
      alert('Invalid OTP!')
  }



  return (

    <div className='box1'>

        <form onSubmit={(e) => findUser(e,email)}>

            <div className='email'>

                {/* //take email */}
                <Input label="E-mail" type="email" name="email" placeholder="Email Address" isrequired="true" value={email} onChange={(e) => setData(e.target.value) }/>

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
                {/* take 4 numbers of otp as input
                
                <Input type='text' isrequired='true' length='1' value={data1.A} onChange={(e) => setData({...data1, A: e.target.value}) }/>
                <Input type='text' isrequired='true' length='1' value={data1.B} onChange={(e) => setData({...data1, B: e.target.value}) }/>
                <Input type='text' isrequired='true' length='1' value={data1.C} onChange={(e) => setData({...data1, C: e.target.value}) } />
                <Input type='text' isrequired='true' length='1' value={data1.D} onChange={(e) => setData({...data1, D: e.target.value, otp: data1.A+data1.B+data1.C+e.target.value}) }/>

                {/* submit btn */}
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