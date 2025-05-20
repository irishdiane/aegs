// src/components/GradingResults/CsvSummaryResult.js
import React from 'react';

const CsvSummaryResult = ({ results }) => {
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

export default CsvSummaryResult;