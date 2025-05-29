// src/components/GradingResults/SingleEssayResult.js
import React, { useState } from 'react';
import ScaleSelector from './ScaleSelector';
import CriteriaScoreTable from './CriteriaScoreTable';
import FuzzyGraphModal from './FuzzyGraphModal';
import { calculateOverallScore, scaleScore } from '../../utils/scoreUtils';

const SingleEssayResult = ({ results, scoreScale, onScaleChange }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const overallScore = calculateOverallScore(results);

  const handleImageClick = (criterion) => {
    setEnlargedImage(`/api/fuzzy-graph/${criterion}`);
  };
  
  const closeModal = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="single-result">
      <h1>Essay Grading Results</h1>
      
      <div className="score-options">
        <ScaleSelector value={scoreScale} onChange={onScaleChange} />
      </div>
      
      <div className="score-summary">
        <h3>Score: {scaleScore(overallScore, scoreScale)}</h3>
      </div>

      {results.criteria_scores && typeof results.criteria_scores === 'object' && (
        <CriteriaScoreTable 
          criteriaScores={results.criteria_scores}
          weights={results.weights}
          scoreScale={scoreScale}
          onImageClick={handleImageClick}
        />
      )}
      
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <FuzzyGraphModal 
          imageUrl={enlargedImage} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default SingleEssayResult;