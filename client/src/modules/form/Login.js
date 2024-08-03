import React, { useState, useEffect } from 'react';
import './Login.css';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Buttons/Button';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  // const [socket, setSocket] = useState(null);
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
        const otp=Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        //send OTP to user email
        const response = await fetch(`http://localhost:8000/api/send_recovery_email/${email}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({otp})
        });
        
        console.log('response:', response);
        if (!response.ok) {
          throw new Error('Failed to send recovery email');
        }
          const resedata = await response.json();
          console.log(resedata);
      }
      else{
        console.log('User not found');
      }
    }
    catch(error){
      console.log('Failed to find user');
    }
  };

  return (

    <div className='box1'>

        <form onSubmit={(e) => findUser(e,data1.email)}>

            <div className='email'>

                {/* //take email */}
                <Input label="E-mail" type="email" name="email" placeholder="Email Address" isrequired="true" value={data1.email} onChange={(e) => setData({...data1, email: e.target.value}) }/>

                {/* send otp btn */}
                <Button label='Generate OTP' type='submit'/>    

            </div>

        </form>
        <form>

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



//onSubmit={(e) => {
//   e.preventDefault();
//   setData({OTP: data1.A+data1.B+data1.C+data1.D})
//   navigate('/user/Password_Setting')
// }}