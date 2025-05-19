// src/components/GradingForm/TextInput.js
import React from 'react';

const TextInput = ({ prompt, setPrompt, essayText, setEssayText, settingsApplied }) => {
  return (
    <div className="input-area">
      <div className="input-field">
        <input
          type="text"
          id="prompt"
          maxLength={200} 
          placeholder="Type or paste essay topic/theme here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={settingsApplied}
          autoComplete="off"
        />
      </div>
      <div className="input-field">
        <textarea
          id="essayText"
          maxLength={10000} 
          placeholder="Type or paste essay here..."
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          disabled={settingsApplied}
        />
      </div>
    </div>
  );
};

export default TextInput;