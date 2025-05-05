import React from "react";

const TextBox = ({ 
  topicValue, 
  topicOnChange, 
  essayValue, 
  essayOnChange,
  uploadedFileName,
  onFileUpload,
  onClearUploadedFile,
  disabled,
  essayDisabled
}) => {
  return (
    <div className="input-area">
      <div className="input-field">
        <input
          type="text"
          id="essayTopic"
          placeholder="Type or paste essay topic/theme here..."
          value={topicValue}
          autoComplete="off"
          onChange={topicOnChange}
          disabled={disabled}
        />
      </div>
      <div className="input-field">
        <textarea
          id="essayText"
          placeholder="Type or paste essay here..."
          value={essayValue}
          onChange={essayOnChange}
          disabled={disabled || essayDisabled}
        />
      </div>
      <div className="upload-option">
        <span>Or</span>
        <label className={`upload-button ${disabled ? 'disabled' : ''}`}>
          <img src="img/64.png" alt="Upload" />
          {!uploadedFileName && <b>Upload File</b>}
          <input 
            type="file"
            accept=".csv" 
            onChange={onFileUpload} 
            style={{ display: "none" }}
            disabled={disabled || essayValue}
          />
        </label>
        {uploadedFileName && (
          <>
            <span className="file-name">{uploadedFileName}</span>
            <button className="clear-upload" onClick={onClearUploadedFile}>X</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TextBox;