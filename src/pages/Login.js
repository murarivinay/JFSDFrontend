import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password, role };

    let loginUrl = role === "Admin"
      ? "https://jfsdbackend-production-3b36.up.railway.app/login"
      : role === "Student"
      ? "https://jfsdbackend-production-3b36.up.railway.app/student/login"
      : "https://jfsdbackend-production-3b36.up.railway.app/guest/login";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (text === "Login Successful") {
          data = { role };
        } else {
          setError("Login failed");
          return;
        }
      }

      if (response.ok) {
        console.log("Login successful:", data);
        setUserRole(data.role);
        localStorage.setItem("userRole", data.role);

        if (data.studentId) localStorage.setItem("studentId", data.studentId);
        if (data.guestId) localStorage.setItem("guestId", data.guestId);

        navigate(data.role === "Admin" ? "/adminhome" : data.role === "Student" ? "/studenthome" : "/guesthome");
      } else {
        setError(data.message ,"Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };
  const handleStudentSignupRedirect = () => {
    navigate("/signup-student");
  };
  

  const handleGuestSignup = async () => {
    const user = { email, password, role: "Guest" };

    try {
      const response = await fetch("https://jfsdbackend-production-3b36.up.railway.app/guest/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        setUserRole(data.role);
        localStorage.setItem("userRole", data.role);
        navigate("/guesthome");
      } else {
        setError(data.message ,"Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleStudentSignup = async () => {
    const user = { email, password, role: "Student" };

    try {
      const response = await fetch("https://jfsdbackend-production-3b36.up.railway.app/student/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        setUserRole(data.role);
        localStorage.setItem("userRole", data.role);
        navigate("/studenthome");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={styles.select}
            >
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </div>
        </form>
        <div style={styles.signupContainer}>
          <button onClick={handleGuestSignup} style={styles.signupButton}>
            Sign up as Guest
          </button>
          <button onClick={handleStudentSignupRedirect} style={styles.signupButton}>
            Sign up as Student
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
    position: "relative",
  },
  title: {
    marginBottom: "20px",
    color: "#333333",
    fontSize: "24px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    color: "#555555",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  buttonGroup: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  signupContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  signupButton: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
};