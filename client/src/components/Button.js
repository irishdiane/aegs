// src/components/Button.jsx
import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, className = "", children, onClick, type = "button" }) => {
  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;