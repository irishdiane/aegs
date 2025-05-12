// src/services/api.js
import API_URL from '../config';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error details from the response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || `HTTP error ${response.status}`;
    } catch (e) {
      errorMessage = `HTTP error ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  
  // Check if response is JSON or a file
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response;
};

// Function to check if API is reachable
export const checkApiStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/api/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('API Status Check Error:', error);
    throw error;
  }
};

// Function to evaluate essay text
export const evaluateEssay = async (essayData) => {
  try {
    console.log(`Sending essay evaluation request to: ${API_URL}/api/evaluate/text`);
    console.log('Request data:', essayData);
    
    const response = await fetch(`${API_URL}/api/evaluate/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(essayData),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Essay Evaluation Error:', error);
    throw error;
  }
};

// Function to upload and process CSV file
export const uploadCsvFile = async (file, weights, rubricChoice, scaleChoice = '5') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('weights', JSON.stringify(weights));
    formData.append('rubric_choice', rubricChoice);
    formData.append('scale_choice', scaleChoice);
    
    console.log(`Sending file upload request to: ${API_URL}/api/upload`);
    
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('File Upload Error:', error);
    throw error;
  }
};

export default {
  checkApiStatus,
  evaluateEssay,
  uploadCsvFile
};
