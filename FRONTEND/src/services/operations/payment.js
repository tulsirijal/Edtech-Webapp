import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { paymentApiUrl } from "../apis"

export default async function stripePayment(courses,token){
    try {
        const response = await apiConnector('POST',paymentApiUrl.STRIPE_PAYMENT,{courses:courses},{
            Authorization:`Bearer ${token}`
        });
        // console.log(response.data.session.url)
        window.location.href = response?.data?.session.url
        
    } catch (error) {
        // console.log(error)
        toast.error(error.response.data.message)
    }
}