// src/components/GradingResults/CriteriaScoreTable.js
import React from 'react';
import { scaleScore } from '../../utils/scoreUtils';

const CriteriaScoreTable = ({ criteriaScores, weights, scoreScale, onImageClick }) => {
  return (
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
          {Object.entries(criteriaScores)
            // Filter out criteria with zero weights for custom rubric
            .filter(([criterion, score]) => {
              // If we have weights, use them to filter
              if (weights && typeof weights === 'object') {
                return weights[criterion] > 0;
              }
              // Otherwise show all criteria (for backward compatibility)
              return true;
            })
            .map(([criterion, score]) => (
              <tr key={criterion}>
                <td>{criterion.replace(/_/g, ' ').toUpperCase()}</td>
                <td>{scaleScore(score, scoreScale)}</td>
                <td>
                  <img
                    src={`/api/fuzzy-graph/${criterion}`}
                    alt={`${criterion} fuzzy graph`}
                    className="fuzzy-graph-thumbnail"
                    onClick={() => onImageClick(criterion)}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default CriteriaScoreTable;