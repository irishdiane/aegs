// src/utils/scoreUtils.js

/**
 * Scale a normalized score (0-1) to different grading scales
 * @param {number} score - Normalized score between 0 and 1
 * @param {string} scaleType - Type of scale to convert to
 * @returns {string} Formatted score in the selected scale
 */
export const scaleScore = (score, scaleType) => {
  if (typeof score !== 'number' || isNaN(score)) return 'N/A';

  const normalizedScore = Math.max(0, Math.min(score, 1));

  switch (scaleType) {
    case '1':
      return `${(1 + normalizedScore * 4).toFixed(1)}/5`;
    case '2':
      return `${(1 + normalizedScore * 19).toFixed(1)}/20`;
    case '3':
      if (normalizedScore >= 0.9) return 'A';
      if (normalizedScore >= 0.75) return 'B';
      if (normalizedScore >= 0.6) return 'C';
      if (normalizedScore >= 0.4) return 'D';
      return 'E';
    case '4':
      if (normalizedScore >= 0.97) return 'A+';
      if (normalizedScore >= 0.93) return 'A';
      if (normalizedScore >= 0.9) return 'A-';
      if (normalizedScore >= 0.87) return 'B+';
      if (normalizedScore >= 0.83) return 'B';
      if (normalizedScore >= 0.8) return 'B-';
      if (normalizedScore >= 0.77) return 'C+';
      if (normalizedScore >= 0.73) return 'C';
      if (normalizedScore >= 0.7) return 'C-';
      if (normalizedScore >= 0.67) return 'D+';
      if (normalizedScore >= 0.63) return 'D';
      if (normalizedScore >= 0.6) return 'D-';
      return 'F';
    case '5':
      return `${(normalizedScore * 100).toFixed(1)}/100`;
    case '6':
      return `${(normalizedScore * 50).toFixed(1)}/50`;
    default:
      return `${(normalizedScore * 100).toFixed(1)}/100`;
  }
};

/**
 * Calculate overall score based on criteria scores and weights
 * @param {Object} results - Grading results object
 * @returns {number} Overall score between 0 and 1
 */
export const calculateOverallScore = (results) => {
  // If we have criteria scores and weights
  if (results && 
      results.criteria_scores && 
      typeof results.criteria_scores === 'object' &&
      results.weights && 
      typeof results.weights === 'object') {
    
    let totalScore = 0;
    let totalWeight = 0;
    
    // Calculate weighted score
    Object.entries(results.criteria_scores).forEach(([criterion, score]) => {
      const weight = parseFloat(results.weights[criterion]);
      
      // Only include criteria with weights > 0
      if (!isNaN(weight) && weight > 0) {
        totalScore += score * weight;
        totalWeight += weight;
      }
    });
    
    // Return weighted average
    if (totalWeight > 0) {
      return totalScore / totalWeight;
    }
  }
  
  // If overall_score is valid, use it as a fallback
  if (results && typeof results.overall_score === 'number' && results.overall_score > 0) {
    return results.overall_score;
  }
  
  // Otherwise calculate simple average from criteria_scores if available
  if (results && results.criteria_scores && typeof results.criteria_scores === 'object') {
    const scores = Object.values(results.criteria_scores).filter(score => 
      typeof score === 'number' && !isNaN(score)
    );
    
    if (scores.length > 0) {
      return scores.reduce((sum, score) => sum + score, 0) / scores.length;
    }
  }
  
  return 0;
};