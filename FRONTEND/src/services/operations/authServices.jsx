import { apiConnector } from "../apiConnector";
import {
  authEndPoints,
  resetPasswordLink,
  resetPasswordToken,
  sendOtpApi,
} from "../apis";
import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice"

export function sendOTP(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const result = await apiConnector("POST", sendOtpApi.SEND_OTP_API, {
        email,
      });
      console.log(result);
      toast.success("successfully sent the otp");
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
export function signup(
  firstName,lastName,email,password,confirmPassword,accountType,otp,navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", authEndPoints.SIGNUP, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log( error)
      toast.error(error.response.data.message)
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authEndPoints.LOGIN, {
        email,
        password,
      });
      console.log(response);
      if (!response.data.success) {
        toast.error("Unable to login");
      }
      toast.success("Successfully logged in");
      const image = response.data?.user?.image;
      const user = response.data.user
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setUser(user));
      dispatch(setToken(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
export function logout(navigate) {
  return (dispatch) => {
    toast.success("Logged out");
    dispatch(setToken(null));
    localStorage.clear();
    navigate('/')
  };
}
export function getResetPassswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        resetPasswordToken.RESET_TOKEN,
        { email }
      );
      console.log(response);
      if (!response.data.success) {
        throw new Error("Unable to send the token");
      }
      toast.success("Successfully sent the email");
      setEmailSent(true);
    } catch (error) {
      setEmailSent(false);
      console.log(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const result = await apiConnector(
        "POST",
        resetPasswordLink.RESET_PASSWORD,
        { password, confirmPassword, token }
      );
      console.log(result);
      if (!result.data.message) {
        toast.error("Unablt to reset the password");
      }
      toast.success("Successfully reset the password");
      navigate("/login");
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
