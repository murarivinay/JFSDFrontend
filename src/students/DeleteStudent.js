import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function DeleteStudent() {
  let navigate = useNavigate();
  const { id } = useParams();

  // Delete student
  const deleteStudent = async () => {
    try {
      await axios.delete(`https://jfsdbackend-production-3b36.up.railway.app/student/${id}`);
      alert("Student deleted successfully.");
      navigate("/viewstudents"); // Navigate back to the Students list page
    } catch (error) {
      console.error("Error deleting student", error);
      alert("Error deleting student.");
      navigate("/"); // Navigate back if there's an error
    }
  };

  useEffect(() => {
    deleteStudent();
  }, [id]);

  return (
    <div className="container">
      <div className="py-4">
        <h2>Deleting Student...</h2>
      </div>
    </div>
  );
}
