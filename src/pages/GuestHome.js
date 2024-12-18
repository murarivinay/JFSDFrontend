import React, { useState, useEffect } from "react";

export default function Lessons() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  // Fetch lessons from backend
  const fetchLessons = async () => {
    try {
      const response = await fetch("http://localhost:8080/lessons");
      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setError("Failed to fetch lessons. Please try again later.");
    }
  };

  // Handle form submission to create a new lesson
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Please provide both title and content.");
      return;
    }

    // Prepare lesson data
    const lessonData = { title, content };

    try {
      const response = await fetch("http://localhost:8080/lessons/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      });

      const data = await response.json();

      if (response.ok) {
        setLessons((prevLessons) => [...prevLessons, data]); // Add the new lesson to the list
        setTitle(""); // Reset title field
        setContent(""); // Reset content field
        setSuccessMessage("Lesson uploaded successfully.");
      } else {
        setError(data.message || "Failed to upload lesson.");
      }
    } catch (error) {
      console.error("Error uploading lesson:", error);
      setError("An error occurred while uploading the lesson.");
    }
  };

  // Handle lesson deletion
  const handleDeleteLesson = async (lessonId) => {
    try {
      const response = await fetch(`http://localhost:8080/lessons/${lessonId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
      } else {
        setError("Failed to delete lesson. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setError("An error occurred while deleting the lesson.");
    }
  };

  return (
    <div style={styles.lessonsContainer}>
      <h1 style={styles.pageTitle}>Manage Lessons</h1>

      <form onSubmit={handleSubmit} style={styles.lessonForm}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.inputField}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.textareaField}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Upload Lesson
        </button>
        {error && <p style={styles.errorMessage}>{error}</p>}
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      </form>

      <hr style={styles.divider} />

      <h2 style={styles.lessonsTitle}>Uploaded Lessons</h2>
      {lessons.length > 0 ? (
        <div style={styles.lessonsList}>
          {lessons.map((lesson) => (
            <div key={lesson.id} style={styles.lessonCard}>
              <h3 style={styles.lessonTitle}>{lesson.title}</h3>
              <p style={styles.lessonContent}>{lesson.content}</p>
              <button
                onClick={() => handleDeleteLesson(lesson.id)}
                style={styles.deleteButton}
              >
                Delete Lesson
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No lessons uploaded yet.</p>
      )}
    </div>
  );
}

const styles = {
  lessonsContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  pageTitle: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  lessonForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    width: "100%",
  },
  textareaField: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    width: "100%",
    height: "150px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#45A049",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginTop: "10px",
  },
  divider: {
    margin: "20px 0",
    border: "0",
    borderTop: "1px solid #ddd",
  },
  lessonsTitle: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  lessonsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  lessonCard: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  lessonTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  lessonContent: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
