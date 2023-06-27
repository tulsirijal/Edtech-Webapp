import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'
export default function CartCourses() {
    const {cart} = useSelector(state=>state.cart);
    const dispatch = useDispatch() 
    function handleRemoveFromCart(course){
        dispatch(removeFromCart(course))
    }
  return (
    <div>
        {
            cart.map((course,index)=>{
                return <div>
                    <div>
                        <img src={course.thumbnail}/>
                    </div>
                    <div>
                        <div>
                            <p>{course.name}</p>
                            <p>{course.category.name}</p>
                        </div>
                        <div>
                            <span>4.5</span>
                            <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<AiOutlineStar/>}
                                fullIcon={<AiFillStar/>}
                            />
                            <span>{course?.ratingAndReviews?.length}</span>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>handleRemoveFromCart(course)}>
                            <RiDeleteBin6Line/>
                            Remove
                        </button>
                        <p>£ {course?.price}</p>
                    </div>
                </div>
            })
        }
    </div>
  )
}
