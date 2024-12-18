// src/pages/About.js
import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <h1>About Us</h1>
      <p>
        Sustainable Living Education is a platform dedicated to educating and promoting eco-friendly living practices for a better tomorrow.
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
};
