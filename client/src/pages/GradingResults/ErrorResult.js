// src/components/GradingResults/ErrorResult.js
import React from 'react';

const ErrorResult = () => {
  return (
    <div className="results-error" style={{ padding: '20px', backgroundColor: '#ffeeee', borderRadius: '4px' }}>
      <p>The result format is not recognized. Please try grading again.</p>
    </div>
  );
};

export default ErrorResult;