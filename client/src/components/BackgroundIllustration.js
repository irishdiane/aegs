// src/components/BackgroundIllustration.jsx
import React from "react";

const BackgroundIllustration = ({ src, alt = "Background illustration", className = "illus" }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
    />
  );
};

export default BackgroundIllustration;