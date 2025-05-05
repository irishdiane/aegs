import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import '../assets/css/AboutUs.css';

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us";
  },);

  return (
    <div className="about-us-container">
      <Navbar />
      <div className="about-us-content">
        <h1 className="about-us-heading">ABOUT US.</h1>
        <p className="about-us-paragraph">
          The Automated Essay Grading System (AEGS) employs technologies such as{" "}
          <strong className="about-us-bold">Word2Vec</strong>,{" "}
          <strong className="about-us-bold">Natural Language Toolkit (NLTK)</strong>,
          and fuzzy logic to facilitate a more objective, consistent, and
          expedient grading process in education. AEGS endeavors to improve the
          equity and inclusivity of assessments by addressing the subjective
          nature of traditional grading, which can result in biases and
          inconsistencies. This aligns with Sustainable Development Goal 4 (SDG
          4), which calls for equitable quality education. Ultimately, this
          system cultivates a supportive learning environment that promotes
          academic integrity and accommodates diverse writing styles, while
          simultaneously enabling educators to concentrate on personalized
          instruction and provide students with timely feedback and
          opportunities for self-assessment.
        </p>
      </div>
    </div>
  );
}