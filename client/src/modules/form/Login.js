import React, { useState } from 'react';
import './Login.css';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Buttons/Button';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()

    //store email id and OTP
    const[data1, setData] = useState({
        email:'',
        A:'',
        B:'',
        C:'',
        D:'',
        OTP:''
      })
    const finduser = async (email) => {
      const res = await fetch(`http://localhost:8000/api/finduser`,{
        method: 'GET',
        headers:{
          'content-Type': 'application.json',
        }
      });
      const isExist = await res.json();
      if(isExist){
        //send otp
        const OTP= Math.floor(1000 + Math.random() * 9000);
        console.log(OTP);
      }
      else{
        alert('User not found');
      }
    }
  return (

    <div className='box1'>

        <form onSubmit={(e) => {
          setData({OTP: data1.A+data1.B+data1.C+data1.D})
          e.preventDefault();
          console.log('Right!');
          navigate('/user/Password_Setting')
        }}>

            <div className='email'>

                {/* //take email */}
                <Input label="E-mail" type="email" name="email" placeholder="Email Address" isrequired="true" value={data1.email} onChange={(e) => setData({...data1, email: e.target.value}) }/>

                {/* send otp btn */}
                <Button label='Generate OTP' type='submit' onSubmit={()=>finduser(data1.email)}/>    

            </div>

            <div className='otp'>

                {/* take 4 numbers of otp as input */}
                <Input type='text' isrequired='true' length='1' value={data1.A} onChange={(e) => setData({...data1, A: e.target.value}) }/>
                <Input type='text' isrequired='true' length='1' value={data1.B} onChange={(e) => setData({...data1, B: e.target.value}) }/>
                <Input type='text' isrequired='true' length='1' value={data1.C} onChange={(e) => setData({...data1, C: e.target.value}) } />
                <Input type='text' isrequired='true' length='1' value={data1.D} onChange={(e) => setData({...data1, D: e.target.value}) }/>

                {/* submit btn */}
                <Button label='Submit' type='submit'/>

            </div>

        </form>

    </div>
  )
}

export default Login