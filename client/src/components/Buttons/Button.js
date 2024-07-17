import React from 'react'
import './Button.css'

const Button = ({label='button', type='button',disabled=false}) => {
  return (
    <div>
        <button type={type} className='signin-button' disabled={disabled} >
           {label}
        </button>
    </div>
  )
}

export default Button