import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../apis";

export const getCatalogData = async(categoryId)=>{
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST",courseEndPoints.GET_CATALOG_DETAILS,{categoryId:categoryId});
        console.log(response.data.data);
        result = response.data.data
    } catch (error) {
        console.log(error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}