// src/components/GradingForm/FileUpload.js
import React from 'react';
import { Link } from 'react-router-dom';

const FileUpload = ({ uploadedFileName, handleFileChange, handleClearUploadedFile, settingsApplied }) => {
  return (
    <>
      <div className="upload-area">
        <div className="upload-option">
          <label className={`upload-button ${settingsApplied ? 'disabled' : ''}`}>
            <img src="/img/64.png" alt="Upload" />
            {!uploadedFileName && <b>Upload File</b>}
            <input 
              type="file"
              accept=".csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              onChange={handleFileChange} 
              style={{ display: "none" }}
              disabled={settingsApplied}
            />
          </label>
          {uploadedFileName && (
            <>
              <span className="file-name">{uploadedFileName}</span>
              <button 
                className="clear-upload" 
                onClick={handleClearUploadedFile}
                disabled={settingsApplied}
              >
                X
              </button>
            </>
          )}
        </div>
        <div className="file-help">
          <p>CSV file should contain essay_id, prompt, and essay_text columns</p>
          <p>Accepts .csv, .pdf, and .docx file</p>
          <p>File size limit: 16MB</p>              
        </div>
      </div>
      <div className="csv-link" style={{ marginTop: '10px' }}>
        <Link to="/user-guide#how-to-create-csv" className="csv-help">
          Click here to learn how to create a csv file
        </Link>
      </div>
    </>
  );
};

export default FileUpload;