import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar component

export default function Users({ setUserRole }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("https://jfsdbackend-production-3b36.up.railway.app/users");
      setUsers(result.data);
      setLoading(false); // Set loading to false after fetching users
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false); // In case of an error, still stop loading
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jfsdbackend-production-3b36.up.railway.app/user/${id}`);
      loadUsers(); // Refresh users after deletion
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleLogout = () => {
    // Clear user role or session data
    setUserRole(null); // Reset user role state in App.js
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div style={styles.container}>
      <Sidebar handleLogout={handleLogout} />
      <main style={styles.mainContent}>
        <div className="py-4">
          <div className="d-flex justify-content-between">
            <h2>Manage Users</h2>
            <div>
              <button
                className="btn btn-success mx-2"
                onClick={() => navigate("/adduser")}
              >
                Add Admin
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/addstudent")}
              >
                Add Student
              </button>
            </div>
          </div>

          {/* Loading indicator */}
          {loading ? (
            <div>Loading users...</div>
          ) : (
            <table className="table border shadow mt-4">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link
                          className="btn btn-primary mx-2"
                          to={`/viewuser/${user.id}`}
                        >
                          View
                        </Link>
                        <Link
                          className="btn btn-outline-primary mx-2"
                          to={`/edituser/${user.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F4F6F9",
  },
  mainContent: {
    flexGrow: 1,
    padding: "20px",
  },
};
