import React from 'react';

const DrawGeometryComponent = ({ drawing, draw }) => (
    <div className='draw-geometry content-row'>
        <button 
            className={`gt-button ${drawing === 'rectangle' ? 'active' : ''}`}
            onClick={() => draw('rectangle')}
        >
            Draw Rectangle
        </button>
        <button
            className={`gt-button ${drawing === 'polygon' ? 'active' : ''}`}
            onClick={() => draw('polygon')}
        >
            Draw Polygon
        </button>
    </div>
);

export default DrawGeometryComponent;