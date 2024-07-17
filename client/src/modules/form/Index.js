import React from 'react'
import './Index.css'

function Index() {
  return (
    <div className='box'>
        <h2>Welcome</h2>
        <div className='name'>
            <Input label="name" placeholder="xyz@00" name="name"/>
            <Input label="email" type="email" name="email"/>
            <Input label="password" type="password" name="password"/>
            <Button/>
        </div>
    </div>
  )
}

export default Index