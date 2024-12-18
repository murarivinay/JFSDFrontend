import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!studentData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (studentData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!studentData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(studentData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!studentData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (studentData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Exit if validations fail
    }

    try {
      const response = await axios.post("https://jfsdbackend-production-3b36.up.railway.app/student", studentData);

      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/studenthome"); // Navigate to student home on success
      } else {
        alert("Signup failed: " + (response.data.message ,"Unknown error"));
      }
    } catch (error) {
      console.error("Error during signup", error);
      if (error.response) {
        alert("Signup failed: " + (error.response.data.message,"An error occurred"));
      } else {
        alert("An error occurred during signup. Please try again.");
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "24px" }}>
          Student Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            {errors.name && <small style={{ color: "red", fontSize: "14px" }}>{errors.name}</small>}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            {errors.email && <small style={{ color: "red", fontSize: "14px" }}>{errors.email}</small>}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              name="password"
              value={studentData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            {errors.password && (
              <small style={{ color: "red", fontSize: "14px" }}>{errors.password}</small>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}