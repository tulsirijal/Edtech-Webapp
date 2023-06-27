import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import CartItems from "./components/core/Dashboard/cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/settings/Settings";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import { userDetails } from "./services/apis";
import { apiConnector } from "./services/apiConnector";
import { setUser } from "./slices/profileSlice";
import AddCourse from "./components/core/Dashboard/Add course/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/Edit Course/EditCourse";
function App() {
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile);
  const dispatch = useDispatch();
  async function getUserDetails(){
  try {
    const response = await apiConnector('GET',userDetails.GET_USER_DETAILS,null,{
      Authorization: `Bearer ${token}`
    })
    // console.log(response.data.userDetails)
    dispatch(setUser(response.data.userDetails))
    localStorage.setItem('user',JSON.stringify(response.data.userDetails))
  } catch (error) {
    console.log(error)
  }
}
// console.log(user)
  useEffect(()=>{
    getUserDetails()
  },[user?.image])
  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/forgotPassword" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path="verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="/dashboard/purchase-history" element={<CartItems/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          <Route path="/dashboard/add-course" element={<AddCourse/>}/>
          <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
