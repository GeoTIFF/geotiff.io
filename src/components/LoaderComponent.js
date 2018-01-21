import React from 'react';

const LoaderComponent = ({ loading }) => {
    if (loading) {
        return (
            <div className="loader-container">
                <div className='loader'>
                    <h3>{loading}</h3>
                    <div className='spinner'></div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default LoaderComponent;
