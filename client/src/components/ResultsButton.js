import React from "react";

const ResultsButton = ({ onClick, disabled }) => {
  return (
    <div className="show-results-container">
      <button 
        className="show-results" 
        onClick={onClick} 
        disabled={disabled}
      >
        Show Results
      </button>
    </div>
  );
};

export default ResultsButton;