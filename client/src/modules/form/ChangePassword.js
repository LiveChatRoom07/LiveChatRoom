import React, { useState } from 'react'
import './ChangePass.css'
import Input from '../../components/Input/Input.js'
import Button from '../../components/Buttons/Button.js'

const ChangePassword = () => {

  //Store new password
    const[data2, setData] = useState({
        NewPassword:'',
        Confirm:'',
        Password:''
      })


  return (
    <div className='box2'>

        <form>

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