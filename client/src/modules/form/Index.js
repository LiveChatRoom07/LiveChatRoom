import React from 'react'
import './Index.css'
import Input from '../../components/Input'
import Button from '../../components/Buttons/Button'

function Index() {
  return (
    <div className='box'>
        <h2>Welcome</h2>
        <div className='name'>
            <Input label="name" placeholder="xyz@00"/>
            <Input label="email" type="email"/>
            <Input label="password" type="password"/>
            <Button/>
            
        </div>
    </div>
  )
}

export default Index