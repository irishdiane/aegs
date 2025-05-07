// src/components/GradingForm.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupContainer from '../components/PopUpContainer';
import '../assets/css/GradingForm.css';
import NavBar from '../components/NavBar';


const RUBRICS = {
  1: [
    { id: 'ideas', name: 'Ideas and Analysis' },   
    { id: 'evidence', name: 'Development and Support' }, 
    { id: 'organization', name: 'Organization' },
    { id: 'language_tone', name: 'Language Use' },
  ],
  2: [
    { id: 'ideas', name: 'Depth of Reflection' },
    { id: 'evidence', name: 'Use of Textual Evidence and Historical Context' },
    { id: 'language_tone', name: 'Language Use' },
    { id: 'grammar', name: 'Conventions' },
  ],
  3: [
    { id: 'ideas', name: 'Focus, Purpose, Thesis (Controlling)' },
    { id: 'evidence', name: 'Ideas, Support & Development (Evidence)' },
    { id: 'organization', name: 'Structure, Organization' },
    { id: 'language_tone', name: 'Audience, Tone, and Point of View' },
    { id: 'grammar', name: 'Sentence Structure (Grammar)' },
    { id: 'mechanics', name: 'Mechanics and Presentation' },
    { id: 'vocabulary', name: 'Vocabulary and Word Usage' },
  ]
};

function GradingForm() {
  const navigate = useNavigate();
  // State variables
  const [inputMethod, setInputMethod] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [essayText, setEssayText] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [selectedRubric, setSelectedRubric] = useState(1);
  const [weights, setWeights] = useState({});
  const [isGrading, setIsGrading] = useState(false);
  const [gradingComplete, setGradingComplete] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [settingsApplied, setSettingsApplied] = useState(false);

  // Popup states
  const [fileUploadedMessage, setFileUploadedMessage] = useState(null);
  const [fileUploadedVisible, setFileUploadedVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [GradingVisible, setGradingVisible] = useState(false);
  const [weightWarningVisible, setWeightWarningVisible] = useState(false);

  // Initialize weights whenever rubric changes
  useEffect(() => {
    const initialWeights = {};
    document.title = "Grade Now";
    RUBRICS[selectedRubric].forEach(criterion => {
      initialWeights[criterion.id] = 0;
    });
    setWeights(initialWeights);
  }, [selectedRubric]);
  
  // Handle popup close functions
  const handleFileUploadedClose = () => setFileUploadedVisible(false);
  const handleSuccessClose = () => setSuccessVisible(false);
  const handleErrorClose = () => setErrorVisible(false);
  const handleLoadingClose = () => setLoadingVisible(false);
  const handleGradingClose = () => setGradingVisible(false);
  const handleWeightWarningClose = () => setWeightWarningVisible(false);

  // Handle input method change
  const handleInputMethodChange = (method) => {
    if (settingsApplied) return;
    setInputMethod(method);
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (settingsApplied) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    if (essayText) {
      setErrorMessage(["You cannot upload a file because you've provided the essay content."]);
      setErrorVisible(true);
      e.target.value = null;
      return;
    }
    
    if (
      file.name.endsWith('.csv') ||
      file.name.endsWith('.pdf') ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.docx')
    ) {
      setCsvFile(file);
      setUploadedFileName(file.name);
      setFileUploadedMessage("File uploaded successfully!");
      setFileUploadedVisible(true);
    } else {
      setErrorMessage(['Unsupported File Format.', 'Only accepts CSV, PDF, or DOC/DOCX files.']);
      setErrorVisible(true);
      e.target.value = null;
    }    
  };
  
  // Clear uploaded file
  const handleClearUploadedFile = () => {
    if (settingsApplied) return;
    setUploadedFileName(null);
    setCsvFile(null);
  };
  
  // Handle weight change
  const handleWeightChange = (criterionId, value) => {
    if (settingsApplied) return;
    // Parse input value, default to 0 if not a number
  const newValue = parseInt(value, 10) || 0;

  // Calculate what the new total would be if this change is applied
  const currentTotal = Object.entries(weights).reduce(
    (sum, [id, w]) => sum + (id === criterionId ? 0 : (parseInt(w, 10) || 0)),
    0
  );
  const newTotal = currentTotal + newValue;

  // If new total would be more than 100, block and show warning
  if (newTotal > 100) {
    setWeightWarningVisible(true);
    return; // Block the change
  }
    setWeights(prev => ({
      ...prev,
      [criterionId]: parseInt(value, 10) || 1
    }));
  };
  
  // Handle rubric selection
  const handleRubricChange = (rubricNumber) => {
    if (settingsApplied) return;
    setSelectedRubric(rubricNumber);
  };
  
  // Reset weights to default (all equal)
  const resetWeights = () => {
    if (settingsApplied) return;
    const resetWeights = {};
    RUBRICS[selectedRubric].forEach(criterion => {
      resetWeights[criterion.id] = 0;
    });
    setWeights(resetWeights);
  };

  const totalWeight = Object.values(weights).reduce((sum, w) => sum + (parseInt(w, 10) || 0), 0);
  
  // Validate inputs before submission
  const validateInputs = () => {
    let errors = [];
    
    if (inputMethod === 'text') {
      if (!prompt.trim()) {
        errors.push('Missing writing prompt.');
      }
      
      if (!essayText.trim()) {
        errors.push('Missing essay text.');
      }
    } else {
      if (!csvFile) {
        errors.push('Please upload a file.');
      }
    }
    
    if (errors.length > 0) {
      setErrorMessage(errors);
      setErrorVisible(true);
      return false;
    }
    
    return true;
  };
  
  // Apply settings
  const handleApplySettings = () => {
    if (settingsApplied) return;
    
    // Calculate total weights
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    
    // Check if total is exactly 100
    if (totalWeight !== 100) {
      setWeightWarningVisible(true);
      return;
    }
    
    if (validateInputs()) {
      setLoadingVisible(true);
      
      // Simulate processing time
      setTimeout(() => {
        setLoadingVisible(false);
        setSettingsApplied(true);
        setSuccessMessage('Settings applied successfully!');
        setSuccessVisible(true);
      }, 2000);
    }
  };
  
  
  // Handle grading submission
  const handleSubmitGrading = async () => {
    if (!settingsApplied) {
      setErrorMessage(['Please apply settings first before grading.']);
      setErrorVisible(true);
      return;
    }
    
    setIsGrading(true);
    setGradingVisible(true);
    
    try {
      let response;
      
      if (inputMethod === 'text') {
        // Make sure we're formatting the request exactly as the server expects
        const requestData = {
          prompt: prompt,
          essay_text: essayText,
          weights: weights,
          rubric_choice: selectedRubric
        };
        
        console.log("Sending request:", requestData); // Debug log
        
        response = await fetch('/api/evaluate/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      } else {
        // API call for file upload
        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('weights', JSON.stringify(weights));
        formData.append('rubric_choice', selectedRubric);

        response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
      }
      
      console.log("Response status:", response.status);

      if (!response.ok) {
        // Try to get more detailed error information
        const errorData = await response.json().catch(() => null);
        console.error("Error details:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        
      if (inputMethod === 'text') {
        // For text input, we get JSON response
        const results = await response.json();
        
        // Store results in localStorage to access them on results page
        localStorage.setItem('gradingResults', JSON.stringify(results));
        
        setGradingComplete(true);
        setLoadingVisible(false);
        setSuccessMessage('Grading completed successfully!');
        setSuccessVisible(true);
        
        // Navigate to results page after a short delay
        setTimeout(() => {
          navigate('/grading-results');
        }, 1500);
      } 
      else {
        // For file upload, we get a file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `graded_${csvFile.name}`;
        localStorage.setItem('gradingResults', JSON.stringify({ type: 'csv'}));
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setTimeout(() => {
          navigate('/home');
        }, 6000);

        setGradingComplete(true);
        setLoadingVisible(false);
        setSuccessMessage('CSV processing complete! The scored file has been downloaded.');
        setSuccessVisible(true);
        setTimeout(() => {
          setSuccessMessage('Grading complete! You will now be redirected to Home tab.');
          setSuccessVisible(true);
        }, 5000);
      }
    } catch (error) {
      console.error('Error during grading:', error);
      setLoadingVisible(false);
      setErrorMessage(['Error during grading process:', error.message]);
      setErrorVisible(true);
    }
  };
  
  // View results (enabled only when grading is complete)
  const viewResults = () => {
    if (gradingComplete) {
      navigate('/grading-results');
    } else {
      setErrorMessage(['Complete grading first before viewing results.']);
      setErrorVisible(true);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <PopupContainer 
        fileUploadedMessage={fileUploadedMessage}
        fileUploadedVisible={fileUploadedVisible}
        onFileUploadedClose={handleFileUploadedClose}
        successMessage={successMessage}
        successVisible={successVisible}
        onSuccessClose={handleSuccessClose}
        errorMessage={errorMessage}
        errorVisible={errorVisible}
        onErrorClose={handleErrorClose}
        loadingVisible={loadingVisible}
        onLoadingClose={handleLoadingClose}
        onGradingClose={handleGradingClose}
        GradingVisible={GradingVisible}
        weightWarningVisible={weightWarningVisible}
        onWeightWarningClose={handleWeightWarningClose}
      />
      
      <div className="grade-now-container flex flex-row items-start justify-center">
        <div className="left-content w-1/2 pr-8">
          <h1>RUBRIC-BASED AUTOMATED ESSAY GRADING SYSTEM</h1>
          
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
          
          {inputMethod === 'text' ? (
            <div className="input-area">
              <div className="input-field">
                <input
                  type="text"
                  id="prompt"
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
                  placeholder="Type or paste essay here..."
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  disabled={settingsApplied}
                />
              </div>
            </div>
          ) : (
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
              <p>Accepts pdf and docs file</p>
            </div>
            </div>
          )}
          {inputMethod === 'file' && (
            <div className="csv-link" style={{ marginTop: '10px' }}>
              <Link to="/user-guide#how-to-create-csv" className="csv-help">
                Click here to learn how to create a csv file
              </Link>
            </div>
          )}
        </div>
        
        <div className="right-content w-1/2 pl-8 rubric">
          <div className="rubric-selection">
            <button 
              className={`rubric-button ${selectedRubric === 1 ? 'active' : ''}`} 
              onClick={() => handleRubricChange(1)}
              disabled={settingsApplied}
            >
              Rubric A
            </button>
            <button 
              className={`rubric-button ${selectedRubric === 2 ? 'active' : ''}`} 
              onClick={() => handleRubricChange(2)}
              disabled={settingsApplied}
            >
              Rubric B
            </button>
            <button 
              className={`rubric-button ${selectedRubric === 3 ? 'active' : ''}`} 
              onClick={() => handleRubricChange(3)}
              disabled={settingsApplied}
            >
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
                {RUBRICS[selectedRubric].map(criterion => (
                  <tr key={criterion.id}>
                    <td>{criterion.name}</td>
                    <td>
                      <input 
                        className="bold-text" 
                        type="number" 
                        min="1" 
                        max="100"
                        value={weights[criterion.id] || 0} 
                        onChange={(e) => handleWeightChange(criterion.id, e.target.value)}
                        disabled={settingsApplied}
                      /> <b>%</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
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
        </div>
      </div>
      
      <div className="action-buttons">
        <button 
          className="button primary show-results" 
          onClick={handleSubmitGrading} 
          disabled={isGrading || !settingsApplied}
        >
          {isGrading ? 'Grading...' : 'Start Grading'}
        </button>
        
        {inputMethod === 'text' && (
        <button 
            className={`button secondary ${!gradingComplete ? 'disabled' : ''}`} 
            onClick={viewResults} 
            disabled={!gradingComplete}
          >
            View Results
        </button>
        )}
      </div>
    </div>
  );
}

export default GradingForm;