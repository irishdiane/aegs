// src/hooks/useGradingResults.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to load and process grading results
 */
const useGradingResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resultType, setResultType] = useState('error');

  useEffect(() => {
    // Retrieve results from localStorage
    const storedResults = localStorage.getItem('gradingResults');
    
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
        
        // Determine the type of results
        if (parsedResults?.type === 'csv') {
          setResultType('csv');
        } else if (
          (parsedResults && typeof parsedResults === 'object' && 
           (parsedResults.overall_score !== undefined || parsedResults.criteria_scores)) ||
          ['pdf', 'docx', 'txt'].includes(parsedResults?.type)
        ) {
          setResultType('essay');
        } else {
          setResultType('error');
        }
        
        console.log('Loaded results:', parsedResults);
        console.log('Detected results type:', resultType);
      } catch (error) {
        console.error('Error parsing results:', error);
        setResultType('error');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('No grading results found. Please grade an essay first.');
      navigate('/grading-form');
    }
  }, [navigate]);

  return {
    results,
    isLoading,
    resultType
  };
};

export default useGradingResults;