// src/components/GradingResults/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/GradingResults.css';
import Navbar from '../../components/NavBar';
import SingleEssayResult from './SingleEssayResult';
import CsvSummaryResult from './CsvSummaryResult';
import ErrorResult from './ErrorResult';
import useGradingResults from '../../hooks/useGradingResults';

function GradingResults() {
  const navigate = useNavigate();
  const [scoreScale, setScoreScale] = useState('5'); // Default to 100-point scale
  const { results, isLoading, resultType } = useGradingResults();

  // Handle score scale change
  const handleScaleChange = (e) => {
    setScoreScale(e.target.value);
  };

  // Handle going back to grading form
  const handleBackToGrading = () => {
    navigate('/grading-form');
  };
  
  if (isLoading) {
    return <div className="loading">Loading results...</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grading-results-container">
        {/* Render appropriate component based on result type */}
        {resultType === 'csv' && <CsvSummaryResult results={results} />}
        {['essay', 'pdf', 'docx'].includes(resultType) && (
          <SingleEssayResult 
            results={results} 
            scoreScale={scoreScale} 
            onScaleChange={handleScaleChange} 
          />
        )}
        {resultType === 'error' && <ErrorResult />}
        
        <div className="action-buttons">
          <button className="button primary" onClick={handleBackToGrading}>
            Back to Grading
          </button>
        </div>
      </div>
    </div>
  );
}

export default GradingResults;