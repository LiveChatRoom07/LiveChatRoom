import React, { useState, useEffect } from 'react'
import './Login.css'
import Input from '../../components/Input/Input.js'
import Button from '../../components/Buttons/Button'
import { Navigate, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client';

const Login = () => {

  const [socket, setSocket] = useState(null);
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

    //   console.log('data :>>', data1); 

    
    //set socket
    // useEffect(() => {
    //   setSocket(io('http://localhost:8080'))
    // },[])


    //generate random OTP
    const genOTP = () => {
      let otp = ""
      let str = "0123456789"

      for(let i = 0; i < 4; i++){
        const c = Math.floor(Math.random()*str.length)
        otp += str.charAt(c)
      }
      return otp;
    }

    //comparing user email
    const findUser = async(e,email) => {
      e.preventDefault();//prevent page reload
      const res = await fetch(`http://localhost:8000/api/findUser/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        } 
      });
      const resData = await res.json();
      console.log(resData);
      if(resData === 0)
      {
        alert('User not found!')
      }
      else{
        const otp = genOTP();
        console.log(otp);
      }
    }

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