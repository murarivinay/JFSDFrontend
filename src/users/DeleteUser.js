import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  // Delete user
  const deleteUser = async () => {
    try {
      await axios.delete(`https://jfsdbackend-production-3b36.up.railway.app/user/${id}`);
      alert("User deleted successfully.");
      navigate("/users"); // Navigate back to the Users page
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Error deleting user.");
      navigate("/"); // Navigate back if there's an error
    }
  };

  useEffect(() => {
    deleteUser();
  }, [id]);

  return (
    <div className="container">
      <div className="py-4">
        <h2>Deleting User...</h2>
      </div>
    </div>
  );
}
