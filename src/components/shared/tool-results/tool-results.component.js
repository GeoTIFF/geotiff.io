import React from 'react';

const ToolResultsComponent = ({ children, className }) => (
  <div className={`tool-results ${className}`}>
    { children }
  </div>
);

export default ToolResultsComponent;
