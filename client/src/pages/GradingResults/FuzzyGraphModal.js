// src/components/GradingResults/FuzzyGraphModal.js
import React from 'react';

const FuzzyGraphModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fuzzy-graph-modal" onClick={onClose}>
      <img 
        src={imageUrl}
        alt="Enlarged fuzzy graph"
        className="fuzzy-graph-enlarged"
        onClick={(e) => e.stopPropagation()} 
      />
    </div>
  );
};

export default FuzzyGraphModal;