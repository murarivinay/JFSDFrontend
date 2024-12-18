import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const result = await axios.get("https://jfsdbackend-production-3b36.up.railway.app/students");
      setStudents(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students", error);
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      const response = await axios.delete(`https://jfsdbackend-production-3b36.up.railway.app/student/${id}`);
      if (response.status === 200) {
        alert(`Student with ID ${id} has been successfully deleted.`);
        loadStudents(); // Reload the students list
      }
    } catch (error) {
      console.error("Error deleting student:", error.response || error.message);
      alert(`Failed to delete student: ${error.response?.data || error.message}`);
    }
  };

  const handleSendMessage = (id) => {
    setSelectedStudentId(id);
    setShowModal(true);
  };

  const handleSubmitMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      const response = await axios.post(
        `https://jfsdbackend-production-3b36.up.railway.app/messages/send?studentId=${selectedStudentId}`,
        { content: message },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Message sent successfully!");
      setMessage("");
      setShowModal(false);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar /> {/* Add the Sidebar component */}
      <main style={styles.mainContent}>
        <h2>View Students</h2>
        {loading ? (
          <div>Loading students...</div>
        ) : (
          <table className="table border shadow mt-4">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewstudent/${student.id}`}>
                        View
                      </Link>
                      <Link className="btn btn-outline-primary mx-2" to={`/editstudent/${student.id}`}>
                        Edit
                      </Link>
                      <button className="btn btn-danger mx-2" onClick={() => deleteStudent(student.id)}>
                        Delete
                      </button>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => handleSendMessage(student.id)}
                      >
                        Send Message
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {showModal && (
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Send Message</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowModal(false)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
