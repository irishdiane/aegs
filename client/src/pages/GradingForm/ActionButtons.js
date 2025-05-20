// src/components/GradingForm/ActionButtons.js
import React from 'react';

const ActionButtons = ({ 
  isGrading, 
  gradingComplete, 
  settingsApplied, 
  handleSubmitGrading, 
  viewResults 
}) => {
  return (
    <div className="action-buttons">
      <button 
        className="button primary show-results" 
        onClick={handleSubmitGrading} 
        disabled={isGrading || !settingsApplied}
      >
        {isGrading ? 'Grading...' : 'Start Grading'}
      </button>
      
      <button 
        className={`button secondary ${!gradingComplete ? 'disabled' : ''}`} 
        onClick={viewResults} 
        disabled={!gradingComplete}
      >
        View Results
      </button>
    </div>
  );
};

export default ActionButtons;