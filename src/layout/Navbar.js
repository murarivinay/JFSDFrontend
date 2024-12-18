import React from "react";
import { Link } from "react-router-dom";


export default function Navbar({ userRole, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {userRole} Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {userRole === "Admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/adminhome">
                    Admin Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Manage Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/lessons">
                    Manage Lessons
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewstudents">
                    View Students
                  </Link>
                </li>
              </>
            )}
            {userRole === "Student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/studenthome">
                    Student Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mylessons">
                    My Lessons
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mymessages">
                    My Messages
                  </Link>
                </li>
              </>
            )}
            {/* Add more roles as needed */}
            <li className="nav-item">
              <button className="btn btn-danger" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
