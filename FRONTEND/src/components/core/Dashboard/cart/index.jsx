import React from 'react'
import { useSelector } from 'react-redux'
import CartCourses from './CartCourses';
import TotalAmount from './TotalAmount'
export default function CartItems() {
    const {totalItem,totalPrice} = useSelector(state=>state.cart);

  return (
    <div className='h-[calc(100vh-3rem)] mt-[90px]'>
        <p className='text-2xl font-semibold text-richblack-5 mb-10'>Cart Items</p>
        <p className='text-richblack-300 font-semibold text-[20px] border-b-[2px] border-richblack-300'> {totalItem} {totalItem > 1 && <span>Courses</span>} course in your cart </p>
        {
            totalPrice > 0 ? <div>
                <CartCourses></CartCourses>
            </div> : <p className='text-richblack-300'>Your cart is empty</p>
        }
    </div>
  )
}
