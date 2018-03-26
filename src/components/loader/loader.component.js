import React from 'react';

const LoaderComponent = ({ loading }) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div className='loader'>
          <div className='spinner'></div>
          <h3>{loading}</h3>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default LoaderComponent;
