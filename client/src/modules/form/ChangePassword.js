import React, { useState } from 'react'
import './ChangePass.css'
import Input from '../../components/Input/Input.js';
// import {issignInPage} from '../../components/Input/Input.js';
import Button from '../../components/Buttons/Button.js';
import { useNavigate } from 'react-router-dom';
import Login from './Login.js';

const ChangePassword = () => {

  const navigate = useNavigate()
  //Store new password
    const[data2, setData] = useState({
        NewPassword:'',
        Confirm:'',
        email:''
      })

    // console.log(email);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = localStorage.getItem('user:email')
        const data = {
          email: email,
          password: data2.NewPassword
        };
        if(data2.NewPassword === data2.Confirm){
          const res = await fetch(`http://localhost:8000/api/change_password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          if(res.status === 400) {
            alert('Invalid credentials')
          }else{
      
            //store user details in local storage
            const resData = await res.json()
            if(resData.token) {
              localStorage.setItem('user:token', resData.token)
              localStorage.setItem('user:detail', JSON.stringify(resData.user))
              navigate('/')
            }
          }
        }
        else{
          alert('Both Password did not match!')
        }
    }

    // console.log(email);
  return (
    <div className='box2'>

        <form onSubmit={(e) => handleSubmit(e)}>

            {/* take new password */}
            <Input type='password' label='New Password' placeholder='Enter New Password' name='newPass' value={data2.NewPassword} onChange={(e) => setData({...data2, NewPassword: e.target.value}) } />

            {/* confirm password */}
            <Input type='password' label='Confirm Password' placeholder='Confirm Your Password' name='confirmPass' value={data2.Confirm} onChange={(e) => setData({...data2, Confirm: e.target.value}) } />

            {/* submit button */}
            <Button label='Change Password' type='submit' />

        </form>

    </div>
  )
}

export default ChangePassword