import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/User/Login';
import UserHome from './pages/User/Home';
import AdminLogin from './pages/Admin/Login';
import Home from './pages/Public/Home';
import Unauthorized from './pages/Public/Unauthorized';
import Dashboard from './pages/Admin/Dashboard';
import AllBatches from './pages/Admin/AllBatches';
import AllLeaveRequests from './pages/Admin/AllLeaveRequests';
import AllLeaveRequestsUser from './pages/User/AllLeaveRequests';
import AllAdmins from './pages/Admin/AllAdmins';
import AllCourses from './pages/Admin/AllCourses';
import { useSelector } from 'react-redux';
import Register from './pages/User/Register';
import { isAdminRoute, isAuthRoute } from './utils/routeFunctions';
import Courses from './pages/Public/Courses';
import EnrollCourse from './pages/Public/EnrollCourse';
function AppRoutes() {
  const { user, currentUserData, loading } = useSelector(state => state.user);
  const userState = { user, currentUserData, loading };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enroll/:courseId" element={<EnrollCourse />} />
        <Route path="/user/login" element={isAuthRoute({ ...userState, component: Login, redirectUrl: "/user/home" })} />
        <Route path="/user/register" element={isAuthRoute({ ...userState, component: Register, redirectUrl: "/user/home" })} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/leavingRequests" element={<AllLeaveRequestsUser />} />
        <Route path="/admin/login" element={isAuthRoute({ ...userState, component: AdminLogin, redirectUrl: "/admin/dashboard" })} />
        <Route path="/admin/dashboard" element={isAdminRoute({ ...userState, component: Dashboard, redirectUrl: "/admin/login" })} />
        <Route path="/admin/allCourses" element={isAdminRoute({ ...userState, component: AllCourses, redirectUrl: "/admin/login" })} />
        <Route path="/admin/allAdmins" element={isAdminRoute({ ...userState, component: AllAdmins, redirectUrl: "/admin/login" })} />
        <Route path="/admin/allLeaveRequests" element={isAdminRoute({ ...userState, component: AllLeaveRequests, redirectUrl: "/admin/login" })} />
        <Route path="/admin/allBatches" element={isAdminRoute({ ...userState, component: AllBatches, redirectUrl: "/admin/login" })} />
      </Routes>
    </Router>
  )
}

export default AppRoutes