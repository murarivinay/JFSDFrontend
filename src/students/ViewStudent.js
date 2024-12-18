import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewStudent() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const result = await axios.get(`https://jfsdbackend-production-3b36.up.railway.app/student/${id}`);
      setStudent(result.data);
    } catch (error) {
      console.error("Error fetching student details", error);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    // Assuming you have an API for sending messages
    try {
      await axios.post(`https://jfsdbackend-production-3b36.up.railway.app/student/${id}/message`, {
        message,
      });
      alert("Message sent successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Student Details</h2>

          <div className="card">
            <div className="card-header">
              <h5>Details of Student ID: {id}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name:</b> {student.name}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {student.email}
              </li>
            </ul>
          </div>

          <div className="my-3">
            <button
              className="btn btn-warning"
              onClick={() => setIsModalOpen(true)}
            >
              Send Message
            </button>
          </div>

          {isModalOpen && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Send Message</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setIsModalOpen(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Type your message"
                      value={message}
                      onChange={handleMessageChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={sendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
