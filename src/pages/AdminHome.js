import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminHome({ setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2>Admin Dashboard</h2>
        </div>
        <ul style={styles.sidebarLinks}>
          <li style={styles.sidebarItem}>
            <Link to="/users" style={styles.link}>
              Manage Users
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/lessons" style={styles.link}>
              Manage Lessons
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <Link to="/viewstudents" style={styles.link}>
              View Students
            </Link>
          </li>
          <li style={styles.sidebarItem}>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Welcome, Admin</h1>
          <p>Manage your users, lessons, and student details from the dashboard.</p>
        </header>

        <section style={styles.cardGrid}>
          {/* Dashboard cards */}
          <div style={styles.card}>
            <h3>Users</h3>
            <p>Manage and edit user details.</p>
            <Link to="/users" style={styles.cardButton}>
              Manage Users
            </Link>
          </div>
          <div style={styles.card}>
            <h3>Lessons</h3>
            <p>Upload, edit, and manage lessons.</p>
            <Link to="/lessons" style={styles.cardButton}>
              Manage Lessons
            </Link>
          </div>
          <div style={styles.card}>
            <h3>Students</h3>
            <p>View and manage student data.</p>
            <Link to="/viewstudents" style={styles.cardButton}>
              View Students
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F4F6F9",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#34495E",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  sidebarHeader: {
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  sidebarLinks: {
    listStyle: "none",
    padding: 0,
  },
  sidebarItem: {
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    display: "block",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  linkHover: {
    backgroundColor: "#2C3E50",
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    border: "none",
    color: "white",
    fontSize: "16px",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  logoutButtonHover: {
    backgroundColor: "#C0392B",
  },
  mainContent: {
    flexGrow: 1,
    padding: "20px",
  },
  header: {
    marginBottom: "30px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  cardButton: {
    textDecoration: "none",
    marginTop: "10px",
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#3498DB",
    color: "white",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  cardButtonHover: {
    backgroundColor: "#2980B9",
  },
};
