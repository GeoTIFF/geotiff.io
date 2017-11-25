import React from 'react';

const DrawGeometryComponent = ({ draw }) => (
    <div className='draw-geometry content-row'>
        <button 
            className='gt-button'
            onClick={() => draw('rectangle')}
        >
            Draw Rectangle
        </button>
        <button
            className='gt-button'
            onClick={() => draw('polygon')}
        >
            Draw Polygon
        </button>
    </div>
);

export default DrawGeometryComponent;