import React from 'react';
// import Spinner from 'react-spinkit';
// <Spinner name='circle' color="#00897B" />

const LoaderComponent = ({ loading }) => {
    if (loading) {
        return (
            <div className="loader-container">
                <div className='loader'>
                    <h3>{loading}</h3>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default LoaderComponent;
