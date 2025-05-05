// userguide.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import '../assets/css/UserGuide.css';

export default function UserGuide() {
    useEffect(() => {
        document.title = "User Guide";
    },);

    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the Automated Essay Grading System (AEGS)?",
            answer: "The AEGS is a software tool designed to evaluate and score essays automatically, using algorithms to analyze writing quality."
        },
        {
            question: "Who can use this system?",
            answer: "This system is accessible to students, educators, and researchers looking for efficient essay evaluation."
        },
        {
            question: "What types of essays can be graded?",
            answer: "The system can grade a range of essay types, including argumentative, persuasive, and descriptive essays, depending on its configuration."
        },
        {
            question: "How does the grading process work?",
            answer: "Users submit their essays, and the system analyzes various factors such as grammar, vocabulary, and structure to provide an immediate one-time grade. Essays are not stored in any database."
        },
        {
            question: "Is my data secure?",
            answer: "Yes. Since this is a one-time grading system, your essays are not stored after grading and are immediately discarded once results are displayed."
        },
        {
            question: "How to create a batch file for grading using Excel or Sheets?",
            answer: "To create a batch file, open Excel or Google Sheets, enter your essays in the first column, and save the file as a CSV. Ensure that each essay is in a separate row."
        },
        {   question: "What does the 'Membership Functions for Ideas' graph mean?",
            answer: ["This graph helps explain how the system decides if the ideas in an essay are poor, fair, good, very good, or excellent.",
            "The bottom line (Score) shows how strong the ideas are, from 0 (very bad) to 1 (very strong).",
            "The side line (Membership Degree) shows how much the system thinks a score fits into one of the categories.",
            "Each colored line is a different label, like poor or excellent.",
            "If a line is high at a point, that means the system is more confident the score fits that label.",
            "Sometimes, a score can belong a little to two labels at once — like part good and part very good — just like how a teacher might say “this is almost excellent.",
            "It’s a smart way to grade that feels more human and less strict."
        ]},
        {
            question: "Can I use this system for multiple essays?",
            answer: "Yes, you can grade multiple essays by uploading them in a batch file format."
        },
        {
            question: "What should I do if I encounter issues?",
            answer: "The best solution would be to reload the page."
        }

    ];

    return (
    <div className="user-guide-page">
        <Navbar />
        <div className="user-guide-container">    
            <div className="align-left w-full">
            </div>
            <div className="user-guide-content">
                <h1 className="user-guide-title">how to use eAssay</h1>
                <p className="user-guide-subtitle">A COMPLETE GUIDE ON HOW TO NAVIGATE OUR APP</p>

                <div className="main-content">
                    <div className="video-section">
                        <div className="video-placeholder">
                            {/* Replace with your video embed or component */}
                            <img src="path/to/placeholder-image.png" alt="Video Placeholder" className="video-image" />
                            <div className="play-button">▶</div>
                        </div>
                        <p className="video-caption">play the video to learn how to use eAssay</p>
                    </div>

                    <div className="faq-section">
                        <h2 className="faq-title">frequently asked questions (FAQs)</h2>

                        {faqs.map((faq, index) => (
                            <div className={`faq-item ${activeFAQ === index ? 'active' : ''}`} key={index}>
                                <button className="faq-question" onClick={() => toggleFAQ(index)}>
                                    {faq.question}
                                    <span className="expand-icon">{activeFAQ === index ? '-' : '+'}</span>
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}