import React from 'react';

const ImportGeometryComponent = ({ geometry, importGeometry }) => (
  <div className='import-geojson'>
    <p>Import Geometry from file</p>
    <div className='content-row'>
      <label
        className='gt-button-secondary'
        htmlFor="import-geojson-input"
      >
        Import GeoJSON
      </label>
      <input
        id='import-geojson-input'
        type='file'
        className='gt-input'
        onChange={importGeometry}
      />
    </div>
  </div>
);

export default ImportGeometryComponent;
