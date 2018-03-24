import React from 'react';

const DrawGeometryComponent = ({ drawing, draw }) => (
  <div className='draw-geometry'>
    <p>Draw Geometry on map</p>
    <div className='content-row'>
      <button
        className={`gt-button-primary ${drawing === 'rectangle' ? 'active' : ''}`}
        onClick={() => draw('rectangle')}
      >
        Rectangle
      </button>
      <button
        className={`gt-button-primary ${drawing === 'polygon' ? 'active' : ''}`}
        onClick={() => draw('polygon')}
      >
        Polygon
      </button>
    </div>
  </div>
);

export default DrawGeometryComponent;
