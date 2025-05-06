// src/components/GradingResults.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/GradingResults.css';
import Navbar from '../components/NavBar';

function GradingResults() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [scoreScale, setScoreScale] = useState('100');
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    // Retrieve results from localStorage
    const storedResults = localStorage.getItem('gradingResults');
    
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
        console.log('Loaded results:', parsedResults);
      } catch (error) {
        console.error('Error parsing results:', error);
        alert('Error loading results. See console for details.');
      }
    } else {
      alert('No grading results found. Please grade an essay first.');
      navigate('/grading-form');
    }
  }, [navigate]);
  
  const scaleScore = (score) => {
    if (typeof score !== 'number' || isNaN(score)) return 'N/A';
  
    const normalizedScore = Math.max(0, Math.min(score, 1));
  
    switch (scoreScale) {
      case '1':
        return `${(1 + normalizedScore * 4).toFixed(1)}/5`;
      case '2':
        return `${(1 + normalizedScore * 19).toFixed(1)}/20`;
      case '3':
        if (normalizedScore >= 0.9) return 'A';
        if (normalizedScore >= 0.75) return 'B';
        if (normalizedScore >= 0.6) return 'C';
        if (normalizedScore >= 0.4) return 'D';
        return 'E';
      case '4':
        if (normalizedScore >= 0.97) return 'A+';
        if (normalizedScore >= 0.93) return 'A';
        if (normalizedScore >= 0.9) return 'A-';
        if (normalizedScore >= 0.87) return 'B+';
        if (normalizedScore >= 0.83) return 'B';
        if (normalizedScore >= 0.8) return 'B-';
        if (normalizedScore >= 0.77) return 'C+';
        if (normalizedScore >= 0.73) return 'C';
        if (normalizedScore >= 0.7) return 'C-';
        if (normalizedScore >= 0.67) return 'D+';
        if (normalizedScore >= 0.63) return 'D';
        if (normalizedScore >= 0.6) return 'D-';
        return 'F';
      case '5':
        return `${(normalizedScore * 100).toFixed(1)}/100`;
      case '6':
        return `${(normalizedScore * 50).toFixed(1)}/50`;
      default:
        return `${(normalizedScore * 100).toFixed(1)}/100`;
    }
  };
  

  // Handle score scale change
  const handleScaleChange = (e) => {
    setScoreScale(e.target.value);
  };

  // Handle going back to grading form
  const handleBackToGrading = () => {
    navigate('/grading-form');
  };
  
  if (!results) {
    return <div className="loading">Loading results...</div>;
  }
  
  // Check if this is a CSV summary result
  const isCsvResult = results && results.type === 'csv';
  
  // Check if we have a valid single essay result structure
  const isValidSingleResult = results && 
    (typeof results === 'object') && 
    ('overall_score' in results);
  
  // Render CSV summary results
const renderCsvSummary = () => {
  return (
    <div className="csv-summary">
      <h1>Batch Grading Results</h1>
      
      <div className="score-card">
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-value">{results.essays_evaluated || 0}</div>
            <div className="stat-label">Number of Essays</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{results.essays_evaluated || 0}</div>
            <div className="stat-label">Number of Graded Essays</div>
          </div>
        </div>
      </div>
    </div>
  );
};
 // Function to handle showing the enlarged image
  const handleImageClick = (criterion) => {
    setEnlargedImage(`/api/fuzzy-graph/${criterion}`);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setEnlargedImage(null);
  };
  
const renderSingleResult = () => {
  const overallScore = results && typeof results.overall_score === 'number' ? results.overall_score : 0;

  return (
    <div className="single-result">
      <h1>Essay Grading Results</h1>
      
      <div className="score-summary">
        <h3>Final Score: {scaleScore(overallScore)}</h3>
      </div>

      {/* Add condition to show criteria scores */}
      {results.criteria_scores && typeof results.criteria_scores === 'object' && (
        <div className="criteria-scores">
          <h3>Criteria Scores:</h3>
          <table>
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Score</th>
                <th>Fuzzy Graphs</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results.criteria_scores).map(([criterion, score]) => (
                <tr key={criterion}>
                  <td>{criterion.replace(/_/g, ' ').toUpperCase()}</td>
                  <td>{scaleScore(score)}</td>
                  <td>
                    <img
                      src={`/api/fuzzy-graph/${criterion}`}
                      alt={`${criterion} fuzzy graph`}
                      className="fuzzy-graph-thumbnail"
                      onClick={() => handleImageClick(criterion)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <div className="fuzzy-graph-modal" onClick={closeModal}>
          <img 
            src={enlargedImage}
            alt="Enlarged fuzzy graph"
            className="fuzzy-graph-enlarged"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grading-results-container">
      {!isCsvResult && (
        <div className="score-scale-selector">
          <label htmlFor="score-scale">Score Scale:</label>
            <select id="score-scale" value={scoreScale} onChange={handleScaleChange}>
            <option value="1">5-point scale</option>
            <option value="2">20-point scale</option>
            <option value="3">Letter grades (A-E)</option>
            <option value="4">Letter grades with +/-</option>
            <option value="5">100-point scale</option>
            <option value="6">50-point scale</option>
          </select>
          
        </div>
      )}
      
      {isCsvResult ? renderCsvSummary() : isValidSingleResult ? renderSingleResult() : (
        <div className="results-error" style={{ padding: '20px', backgroundColor: '#ffeeee', borderRadius: '4px' }}>
          <p>The result format is not recognized. Please try grading again.</p>
        </div>
      )}
      
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