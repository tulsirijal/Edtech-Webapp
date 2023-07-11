import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { userDetails } from "../apis";
import toast from "react-hot-toast";
export function updateDisplayPicture(formData, token, setLoading) {
  return async (dispatch) => {
    try {
      setLoading(true);
     const response =  await apiConnector("PUT", userDetails.UPDATE_PROFILE_PICTURE, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      toast.success("Successfully updated");
      setLoading(false);
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to update")
    }
  };
}
