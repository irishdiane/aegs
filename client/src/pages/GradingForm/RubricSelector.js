// src/components/GradingForm/RubricSelector.js
import React from 'react';

const RubricSelector = ({ selectedRubric, handleRubricChange, settingsApplied }) => {
  return (
    <div className="rubric-selection">
      <button 
        className={`rubric-button ${selectedRubric === 1 ? 'active' : ''}`} 
        onClick={() => handleRubricChange(1)}
        disabled={settingsApplied}
      >
        Rubric A
      </button>
      <button 
        className={`rubric-button ${selectedRubric === 2 ? 'active' : ''}`} 
        onClick={() => handleRubricChange(2)}
        disabled={settingsApplied}
      >
        Rubric B
      </button>
      <button 
        className={`rubric-button ${selectedRubric === 3 ? 'active' : ''}`} 
        onClick={() => handleRubricChange(3)}
        disabled={settingsApplied}
      >
        Rubric C
      </button>
      <button 
        className={`rubric-button ${selectedRubric === 4 ? 'active' : ''}`} 
        onClick={() => handleRubricChange(4)}
        disabled={settingsApplied}
      >
        Custom Rubric
      </button>
    </div>
  );
};

export default RubricSelector;