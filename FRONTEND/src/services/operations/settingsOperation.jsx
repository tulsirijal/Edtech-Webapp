import { apiConnector } from "../apiConnector";
import { userDetails } from "../apis";
import toast from "react-hot-toast";
export function updateDisplayPicture(formData, token, setLoading) {
  return async (dispatch) => {
    try {
      setLoading(true);
      await apiConnector("PUT", userDetails.UPDATE_PROFILE_PICTURE, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      toast.success("Successfully updated");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to update")
    }
  };
}
