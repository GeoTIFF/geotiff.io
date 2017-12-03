import React from 'react';

const ImportGeoJSONComponent = ({ 
    geojson, on_change, import_geojson, add_geojson
}) => (
    <div className='import-geojson'>
        <textarea 
            className='gt-textarea'
            rows='5'
            onChange={on_change}
            value={geojson}
        ></textarea>
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
                onChange={import_geojson}
            />
            <button
                className='gt-button'
                onClick={() => add_geojson(geojson)}
            >
                Add GeoJSON
            </button>
        </div>
    </div>
);

export default ImportGeoJSONComponent;
