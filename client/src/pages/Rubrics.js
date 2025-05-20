import React, { useState } from "react";
import Navbar from "../components/NavBar";
import '../assets/css/Rubrics.css';

const RubricCard = ({ title, description, disabled, onKnowMore, rubric }) => {
    const handleClick = () => {
        if (!disabled) {
            onKnowMore(rubric);
        }
    };

    return (
        <div className="rubric-card">
            <h3 className="rubric-title">{title}</h3>
            <p className="rubric-description">{description}</p>
            <button
                className={`know-more-button ${disabled ? "disabled" : ""}`}
                disabled={disabled}
                onClick={handleClick}
            >
                Know more!
            </button>
        </div>
    );
};

const RubricsCarousel = () => {
    document.title = "Rubrics";
    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedRubric, setSelectedRubric] = useState(null);
    const [showCarousel, setShowCarousel] = useState(true);
    const [mainTitle, setMainTitle] = useState("RUBRICS"); 
    const [pageDescription, setPageDescription] = useState("");

    const rubrics = [
        {
            pageTitle: "Rubric A",
            title: "Rubric A",
            description: "American College Test Writing Scoring Rubric",
            imagePath: `${process.env.PUBLIC_URL}/img/ActRubric.png`,
            pdfPath: `${process.env.PUBLIC_URL}/pdf/ACTWritingScoringRubric.pdf`, 
        },
        {
            pageTitle: "Rubric B",
            title: "Rubric B",
            description: "ReadThinkWrite Reflective Essay Rubric",
            imagePath: `${process.env.PUBLIC_URL}/img/ReadWriteThink.png`,
            pdfPath: `${process.env.PUBLIC_URL}/pdf/ReadWriteThinkRubric.pdf`, 
        },
        {
            pageTitle: "Rubric C",
            title: "Rubric C",
            description: "College Essay Writing Rubric",
            imagePath: `${process.env.PUBLIC_URL}/img/CollegeEssayRubric.png`,
            pdfPath: `${process.env.PUBLIC_URL}/pdf/CollegeLevelWritingRubric.pdf`, 
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? rubrics.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === rubrics.length - 1 ? 0 : prevIndex + 1));
    };

    const handleKnowMore = (rubric) => {
        setSelectedRubric(rubric);
        setShowCarousel(false);
        setMainTitle(rubric.pageTitle); 
        setPageDescription(rubric.description);
    };

    const handleBack = () => {
        setSelectedRubric(null);
        setShowCarousel(true);
        setMainTitle("RUBRICS");
        setPageDescription("");
    };

    const renderRubricDetails = () => {
        if (!selectedRubric) {
            return null;
        }

        return (
            <div className="rubric-details-container">
                <img
                    src={selectedRubric.imagePath}
                    alt={selectedRubric.title}
                    className="rubric-image"
                />
                <div className="rubric-details-buttons">
                    <button className="back-button" onClick={handleBack}>
                        Back to Rubrics
                    </button>
                    {selectedRubric.pdfPath && (
                        <a
                            href={selectedRubric.pdfPath}
                            download
                            className="download-button"
                        >
                            Download Rubric File
                        </a>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="rubrics-title-container">
                <h1 className="rubrics-title">{mainTitle}</h1>
                {pageDescription && (
                    <h3 className="rubrics-description">{pageDescription}</h3>
                )}
            </div>
            {showCarousel ? (
                <div className="carousel-container">
                    <div className="carousel-controls">
                        <button onClick={handlePrev} className="arrow-button left-arrow">
                            <div className="arrow-image-container">
                                <img
                                    src={process.env.PUBLIC_URL + "/img/arrow.png"} 
                                    alt="Previous"
                                    className="arrow-image"
                                    style={{ transform: 'rotate(180deg)' }}
                                />
                            </div>
                        </button>
                        <div className="carousel-cards">
                            {rubrics.map((rubric, index) => (
                                <div
                                    key={index}
                                    className={`rubric-card-wrapper ${index === currentIndex ? "active" : "inactive"
                                        }`}
                                >
                                    <RubricCard
                                        title={rubric.title}
                                        description={rubric.description}
                                        disabled={index !== currentIndex}
                                        onKnowMore={handleKnowMore}
                                        rubric={rubric}
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={handleNext} className="arrow-button right-arrow">
                            <div className="arrow-image-container">
                                <img   src={process.env.PUBLIC_URL + "/img/arrow.png"} 
                                 alt="Next" className="arrow-image" />
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                renderRubricDetails()
            )}
        </div>
    );
};

export default RubricsCarousel;