// src/components/GradingForm/InputSelector.js
import React from 'react';

const InputSelector = ({ inputMethod, handleInputMethodChange, settingsApplied }) => {
  return (
    <div className="input-method-selector">
      <button 
        className={`rubric-button ${inputMethod === 'text' ? 'active' : ''}`}
        onClick={() => handleInputMethodChange('text')}
        disabled={settingsApplied}
      >
        Text Input
      </button>
      <button 
        className={`rubric-button ${inputMethod === 'file' ? 'active' : ''}`}
        onClick={() => handleInputMethodChange('file')}
        disabled={settingsApplied}
      >
        File Upload
      </button>
    </div>
  );
};

export default InputSelector;