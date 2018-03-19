import React from 'react';

const list_results = (results) => {
  return results.map((result, index) => (
    <p>{`Band ${index + 1}: ${result}`}</p>
  ));
}

const ToolResultsComponent = ({ results }) => (
  <div className='tool-result'>
    <h3>Result: </h3>
    <p>
      {
        typeof results === 'object'
          ? list_results(results)
          : results
      }
    </p>
  </div>
);

export default ToolResultsComponent;
