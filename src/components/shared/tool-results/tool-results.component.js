import React from 'react';

const list_results = (results) => {
  results.forEach(result => console.error(result))
  return results.map((result, index) => (
    <p>{`Band ${index + 1}: ${result}`}</p>
  ));
}

const ToolResultsComponent = ({ results }) => (
  <div className='tool-results'>
    <h3>Result: </h3>
    <p>
      {
        typeof results === 'object' && results.length > 1
          ? list_results(results)
          : results
      }
    </p>
  </div>
);

export default ToolResultsComponent;
