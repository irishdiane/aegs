// src/components/GradingForm/CriteriaWeights.js
import React from 'react';

const CriteriaWeights = ({ 
  rubrics, 
  selectedRubric, 
  weights, 
  handleWeightChange, 
  resetWeights, 
  calculateTotalWeight, 
  handleApplySettings, 
  settingsApplied,
  weightMin
}) => {
  const totalWeight = calculateTotalWeight();
  
  return (
    <div className="criteria-weights">
      <table>
        <thead>
          <tr>
            <th>CRITERIA</th>
            <th>WEIGHTS</th>
          </tr>
        </thead>
        <tbody>
          {rubrics[selectedRubric].map(criterion => (
            <tr key={criterion.id}>
              <td>{criterion.name}</td>
              <td>
                <input 
                  className="bold-text"
                  type="number" 
                  min={weightMin}
                  max={100}
                  value={weights[criterion.id] ?? weightMin}
                  onChange={(e) => handleWeightChange(criterion.id, e.target.value)}
                  disabled={settingsApplied}
                /> <b>%</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="scale">
        <label htmlFor="scale_choice" style={{ color: 'white', fontWeight: 'bold' }}>Select Scoring Scale:</label>
        <select id="scale_choice" name="scale_choice" required>
          <option value="1">5-point scale</option>
          <option value="2">20-point scale</option>
          <option value="3">Letter grades (A-E)</option>
          <option value="4">Letter grades with +/-</option>
          <option value="5" selected>100-point scale</option>
          <option value="6">50-point scale</option>
        </select>
      </div>

      <div className="weight-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          className="reset-weights" 
          onClick={resetWeights}
          disabled={settingsApplied}
        >
          Reset Weights
        </button>
        <span className="total-weight"><b>Total: {totalWeight}/100%</b></span>
      </div>    
      
      <div className="apply-settings-container">
        <button 
          className="apply-settings" 
          onClick={handleApplySettings}
          disabled={settingsApplied || totalWeight !== 100}
        >
          Apply Settings
        </button>
      </div>
    </div>
  );
};

export default CriteriaWeights;