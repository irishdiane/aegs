import React from "react";

const RubricSelector = ({ 
  activeRubric, 
  onRubricClick, 
  rubricCriteria,
  isApplyDisabled,
  isLoading,
  onApplySettings
}) => {
  return (
    <div className="rubric">
      <div className="rubric-selection">
        <button 
          className={`rubric-button ${activeRubric === 'Rubric A' ? 'active' : ''}`} 
          onClick={() => onRubricClick('Rubric A')}>
          Rubric A
        </button>
        <button 
          className={`rubric-button ${activeRubric === 'Rubric B' ? 'active' : ''}`} 
          onClick={() => onRubricClick('Rubric B')}>
          Rubric B
        </button>
        <button 
          className={`rubric-button ${activeRubric === 'Rubric C' ? 'active' : ''}`} 
          onClick={() => onRubricClick('Rubric C')}>
          Rubric C
        </button>
      </div>

      <div className="criteria-weights">
        <table>
          <thead>
            <tr>
              <th>CRITERIA</th>
              <th>WEIGHTS</th>
            </tr>
          </thead>
          <tbody>
            {rubricCriteria[activeRubric].map((item, index) => (
              <tr key={index}>
                <td>{item.criterion}</td>
                <td>
                  <input className="bold-text" type="number" defaultValue={item.weight} /> <b>%</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="apply-settings-container">
          <button 
            className="apply-settings" 
            onClick={onApplySettings} 
            disabled={isApplyDisabled || isLoading}
          >
            {isLoading ? 'Processing...' : 'Apply Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RubricSelector;