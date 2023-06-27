import React from 'react'
import { useSelector } from 'react-redux'
import CartCourses from './CartCourses';
import TotalAmount from './TotalAmount'
export default function CartItems() {
    const {totalItem,totalPrice} = useSelector(state=>state.cart);

  return (
    <div>
        <p className='text-2xl font-semibold text-richblack-5'>Cart Items</p>
        <p className='text-richblack-300 font-semibold text-[20px]'> {totalItem}</p>
        {
            totalPrice > 0 ? <div>
                <CartCourses></CartCourses>
            </div> : <p className='text-richblack-300'>Your cart is empty</p>
        }
    </div>
  )
}
