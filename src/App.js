import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Lessons from "./pages/Lessons";
import StudentHome from "./pages/StudentHome";
import GuestHome from "./pages/GuestHome"; // Import the GuestHome component
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import DeleteUser from "./users/DeleteUser";
import AddStudent from "./students/AddStudent";
import StudentsList from "./students/StudentsList";
import ViewStudent from "./students/ViewStudent"; // Add ViewStudent component
import EditStudent from "./students/EditStudent"; // Add EditStudent component
import DeleteStudent from "./students/DeleteStudent"; // Add DeleteStudent component
import MyMessages from "./students/MyMessages"; // Add MyMessages component
import "bootstrap/dist/css/bootstrap.min.css";
import StudentSignup from "./pages/StudentSignup"; // Import StudentSignup

function App() {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load user role from localStorage on app load
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleSetUserRole = (role) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem("userRole", role); // Store role in localStorage
    } else {
      localStorage.removeItem("userRole");
    }
  };

  const handleLogout = () => {
    handleSetUserRole(null);
    navigate("/login");
  };

  // Display Navbar only if not on login or signup pages
  const excludedRoutes = ["/login", "/signup-student"];
  const shouldShowNavbar = !excludedRoutes.includes(location.pathname);

  // Handle routes based on user role
  const renderAdminRoutes = userRole === "Admin" ? (
    <>
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/users" element={<Users />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/edituser/:id" element={<EditUser />} />
      <Route path="/viewuser/:id" element={<ViewUser />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/deleteuser/:id" element={<DeleteUser />} />

      {/* Add Student Routes */}
      <Route path="/addstudent" element={<AddStudent />} />
      <Route path="/viewstudents" element={<StudentsList />} />
      <Route path="/viewstudent/:id" element={<ViewStudent />} />
      <Route path="/editstudent/:id" element={<EditStudent />} />
      <Route path="/deletestudent/:id" element={<DeleteStudent />} />
    </>
  ) : null;

  const renderStudentRoutes = userRole === "Student" ? (
    <>
      <Route path="/studenthome" element={<StudentHome />} />
      <Route path="/mymessages" element={<MyMessages />} /> {/* Add route for MyMessages */}
    </>
  ) : null;

  const renderGuestRoutes = userRole === "Guest" ? (
    <>
      <Route path="/guesthome" element={<GuestHome />} />
    </>
  ) : null;

  // Default route for unknown paths or if no role is selected
  const redirectToLogin = userRole === null ? (
    <Route path="*" element={<Login setUserRole={handleSetUserRole} />} />
  ) : null;

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar userRole={userRole} onLogout={handleLogout} />}

      <Routes>
        {/* Public Route for Student Signup */}
        <Route path="/signup-student" element={<StudentSignup />} />

        
        {/* Login Route */}
        <Route path="/login" element={<Login setUserRole={handleSetUserRole} />} />

        {/* Render Admin, Student, and Guest routes based on the userRole */}
        {renderAdminRoutes}
        {renderStudentRoutes}
        {renderGuestRoutes}

        {/* Default route when no userRole */}
        {redirectToLogin}
      </Routes>
    </div>
  );
}
export default App;