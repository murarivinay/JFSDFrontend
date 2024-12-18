import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ handleLogout }) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h2>Admin Dashboard</h2>
      </div>
      <ul style={styles.sidebarLinks}>
        <li style={styles.sidebarItem}>
          <Link to="/users" style={styles.link}>Manage Users</Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link to="/lessons" style={styles.link}>Manage Lessons</Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link to="/viewstudents" style={styles.link}>View Students</Link>
        </li>
        <li style={styles.sidebarItem}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

const styles = {
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
};
