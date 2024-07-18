import React from 'react'
import './Input.css'

const Input = ({label = '',type='text',placeholder='', name='',isrequired='true', length='40',value='',onChange = () => {},}) => {
  return (
    <div className='inputfeild'>
      <label className='sub-box'>
        {label}
        <input type={type} id={name} className='input' placeholder={placeholder} required maxLength={length} value={value} onChange={onChange} />
      </label>
      
      
    </div>
  )
}

export default Input;