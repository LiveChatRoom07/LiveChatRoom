import React from 'react'

const Button = ({label='button', type='button'}) => {
  return (
    <div>
        <button className='button'>
           {label}
        </button>
    </div>
  )
}

export default Button