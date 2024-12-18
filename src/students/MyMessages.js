import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyMessages() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentId = localStorage.getItem("studentId"); // Get studentId from localStorage

  useEffect(() => {
    if (studentId) {
      loadMessages(studentId); // If studentId is available, fetch messages
    } else {
      setError("Student ID is missing.");
      setLoading(false);
    }
  }, [studentId]);

  const loadMessages = async (studentId) => {
    try {
      // Fetch received messages for the student
      const receivedResult = await axios.get(`https://jfsdbackend-production-3b36.up.railway.app/messages/student/${studentId}`);
      setReceivedMessages(receivedResult.data);

      // Optionally, fetch sent messages if the endpoint exists
      const sentResult = await axios.get(`https://jfsdbackend-production-3b36.up.railway.app/messages/sent/student/${studentId}`);
      setSentMessages(sentResult.data);

      setLoading(false);
    } catch (error) {
      setError("Error fetching messages. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>My Messages</h2>
      {loading ? (
        <div>Loading messages...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div>
          <h3>Received Messages</h3>
          {receivedMessages.length === 0 ? (
            <p>No received messages.</p>
          ) : (
            <ul className="list-group">
              {receivedMessages.map((message, index) => (
                <li key={index} className="list-group-item">
                  <strong>From: {message.student?.name || "Admin"}</strong>
                  <p>{message.content}</p>
                  <p><small>Sent at: {new Date(message.createdAt).toLocaleString()}</small></p>
                </li>
              ))}
            </ul>
          )}

          <h3>Sent Messages</h3>
          {sentMessages.length === 0 ? (
            <p>No sent messages.</p>
          ) : (
            <ul className="list-group">
              {sentMessages.map((message, index) => (
                <li key={index} className="list-group-item">
                  <strong>To: {message.student?.name || "Admin"}</strong>
                  <p>{message.content}</p>
                  <p><small>Sent at: {new Date(message.createdAt).toLocaleString()}</small></p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
