import React from 'react'
import { useSelector } from 'react-redux'

export default function TotalAmount() {
  const {totalPrice} = useSelector(state=>state.cart)
  return (
    <div>
        <p className='text-richblack-300'>Total:</p>
        <p> £ {totalPrice}</p>
        <button className='bg-yellow-50 text-richblack-700 '>
          Buy now
        </button>
    </div>
  )
}
