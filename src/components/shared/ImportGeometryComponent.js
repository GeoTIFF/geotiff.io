import React from 'react';

const ImportGeometryComponent = ({ geometry, import_geometry }) => (
    <div className='import-geojson'>
        <div className='content-row'>
            <label 
                className='gt-button'
                htmlFor="import-geojson-input"
            >
                Import GeoJSON
            </label>
            <input 
                id='import-geojson-input'
                type='file'
                className='gt-input'
                onChange={import_geometry}
            />
        </div>
    </div>
);

export default ImportGeometryComponent;
