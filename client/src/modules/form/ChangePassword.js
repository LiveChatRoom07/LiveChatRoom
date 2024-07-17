import React, { useState } from 'react'
import './ChangePass.css'
import Input from '../../components/Input'
import Button from '../../components/Buttons/Button'

const ChangePassword = () => {

    const[data2, setData] = useState({
        NewPassword:'',
        Confirm:'',
        Password:''
      })


  return (
    <div className='box2'>
        <form>
            <Input type='password' label='New Password' placeholder='Enter New Password' name='newPass' value={data2.NewPassword} onChange={(e) => setData({...data2, NewPassword: e.target.value}) } />
            <Input type='password' label='Confirm Password' placeholder='Confirm Your Password' name='confirmPass' value={data2.Confirm} onChange={(e) => setData({...data2, Confirm: e.target.value}) } />
            <Button label='Change Password' type='submit' />
        </form>

    </div>
  )
}

export default ChangePassword