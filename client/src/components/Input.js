import React from 'react'
import './Input.css'

const Input = ({label = '',type='text',placeholder='', name=''}) => {
  return (
    <div className='sub-box'>
      <label htmlFor={name}>{label}</label>
      <input type={type} placeholder={placeholder} required className='input' />
      
    </div>
  )
}

export default Input