import React, { useState } from 'react'
import './Login.css'
import Input from '../../components/Input'
import Button from '../../components/Buttons/Button'

const Login = () => {

    const[data1, setData] = useState({
        Email:'',
        A:'',
        B:'',
        C:'',
        D:'',
        OTP:''
      })

      console.log('data :>>', data1);

  return (
    <div className='box1'>
        <form onSubmit={(e) => setData({OTP: data1.A+data1.B+data1.C+data1.D})}>
            <div className='email'>
                <Input label="E-mail" type="email" name="email" placeholder="Email Address" isrequired="true" value={data1.Email} onChange={(e) => setData({...data1, Email: e.target.value}) }/>
                <Button label='Generate OTP' />
                
            </div>
            <div className='otp'>
                <Input type='text' isrequired='true' length='1' value={data1.A} onChange={(e) => setData({...data1, A: e.target.value}) }/>
                <Input type='text' isrequired='true' length='1' value={data1.B} onChange={(e) => setData({...data1, B: e.target.value}) }/>
                <Input type='text' isrequired='true' length='1' value={data1.C} onChange={(e) => setData({...data1, C: e.target.value}) } />
                <Input type='text' isrequired='true' length='1' value={data1.D} onChange={(e) => setData({...data1, D: e.target.value}) }/>
                <Button label='Submit' type='submit' />
            </div>
        </form>
    </div>
  )
}

export default Login