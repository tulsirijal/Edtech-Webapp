import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
    totalItem:localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0,
    cartItem:localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
    totalPrice:localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,actions)=>{
            const course = actions.payload;
            const index = state.cartItem.findIndex((item)=>item._id===course._id);
            if(index>=0){
                // item already exists in the cart
                toast.error("Item already exists in the cart");
                return
            }
            state.totalItem++;
            state.totalPrice+=course.price
            state.cartItem.push(course);
            localStorage.setItem('cartItem',JSON.stringify(state.cartItem));
            localStorage.setItem('totalItem',JSON.stringify(state.totalItem));
            localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice));
            toast.success("Successfully added to the cart")
        },
        removeFromCart:(state,actions)=>{
            const course = actions.payload;
            const indexOfCourse = state.cartItem.findIndex((item)=>item._id===course._id);
            state.totalPrice-=state.cartItem[indexOfCourse].price;
            state.totalItem--;
            state.cartItem.splice(indexOfCourse,1);
            localStorage.setItem('cartItem',JSON.stringify(state.cartItem));
            localStorage.setItem('totalItem',JSON.stringify(state.totalItem));
            localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice));
            toast.success("Course removed from cart")
    
        },
        resetCart:(state,actions)=>{
            state.totalItem = 0;
            state.cartItem = [];
            state.totalPrice = 0;
        }
    },
})
export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer