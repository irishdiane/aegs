//popup.js
import React, { useEffect } from 'react';

const PopUp = ({ 
  type, 
  message, 
  visible, 
  onClose, 
  autoHideDuration = 3000, 
  autoHide = false 
}) => {
  // Types: 'error', 'success', 'loading'
  
  useEffect(() => {
    let timer;
    if (visible && autoHide) {
      timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoHideDuration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, onClose, autoHide, autoHideDuration]);
  
  if (!visible) return null;

  // For error overlay with modal
  if (type === 'error') {
    return (
      <div className={`overlay`}>
        <div className="modal-container">
          <div className="modal-header">
          <img src="/img/navbar-logo.png" alt="Logo" style={{ height: "50px", width: "70px" }} className="mr-2" />
          <span className="modal-title">Oops!</span>
            <span className="close" onClick={onClose}>X</span>
          </div>
          <div className="modal-body">
            {Array.isArray(message) ? (
              message.map((msg, index) => <p key={index}>{msg}</p>)
            ) : (
              <p>{message}</p>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>Ok</button>
        </div>
      </div>
    );
  }

  // For loading overlay
  if (type === 'loading') {
    return (
      <div className="overlay">
        <div className="modal-container">
          <div className="modal-header">
          <img src="/img/navbar-logo.png" alt="Logo" style={{ height: "50px", width: "70px" }} className="mr-2" />
            <span className="modal-title">Wait...</span>
            <span className="close" onClick={onClose}>X</span>
          </div>
          <div className="modal-body">
            <p>Applying settings...</p>
            <p>Do not exit the site...</p>
          </div>
        </div>
      </div>
    );
  }

  //for grading overlay
  if (type === 'grading') {
    return (
      <div className="overlay">
        <div className="modal-container">
          <div className="modal-header">
          <img src="/img/navbar-logo.png" alt="Logo" style={{ height: "50px", width: "70px" }} className="mr-2" />
            <span className="modal-title">Please wait...</span>
            <span className="close" onClick={onClose}>X</span>
          </div>
          <div className="modal-body">
            <p>Grading your essays.</p>
            <p>Do not exit the site...</p>
            <p>If you are grading a batch file (.csv),
              your results will be automatically downloaded when grading is complete.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // For success notification
  if (type === 'success') {
    return (
      <div className="success-popup fade-in-out">
        {message}
      </div>
    );
  }

  // For file uploaded notification
  if (type === 'file-uploaded') {
    return (
      <div className="file-uploaded-message fade-in-out">
        {message}
      </div>
    );
  }

  //For weight warning notification
  if (type === 'weight-warning') {
    return (
      <div className="overlay">
        <div className="modal-container">
          <div className="modal-header">
          <img src="/img/navbar-logo.png" alt="Logo" style={{ height: "50px", width: "70px" }} className="mr-2" />
            <span className="modal-title">Warning</span>
            <span className="close" onClick={onClose}>X</span>
          </div>
          <div className="modal-body">
            <p>Total weights must equal exactly 100%.</p>
            <p>Please adjust your rubric weights.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PopUp;