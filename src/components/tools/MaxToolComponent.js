import React from 'react';
import DrawGeometry from '../../containers/shared/DrawGeometry';
import ImportGeoJSON from '../../containers/shared/ImportGeoJSON';

const MaxToolComponent = ({ 
    results, raster, geometry, execute, close, func
}) => (
    <div id='max-tool' className='tool'>
        <section className='controls'>
            <header>
                <i 
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>
                    Get the Maximum Pixel Value of an Area
                </h3>
            </header>
            <div className='content'>
                <p>
                    Select a geometry type and draw a geometry to get the maximum value of the pixels within that area.
                </p>
                <DrawGeometry />
                <p className="or">
                    <b>OR</b>
                </p>
                <p>
                    Add GeoJSON. You can either import a GeoJSON file or write it out yourself.
                </p>
                <ImportGeoJSON />
                <div className='content-row'>
                    <button 
                        className='gt-button'
                        onClick={() => execute(raster, geometry, func)}
                    >
                        Calculate Maximum
                    </button>
                </div>
            </div>
        </section>
        {
            results
            ? 
                <section className='results'>
                    <h3>Maximum: {results}</h3>
                </section>
            : ''
        }
    </div>
);

export default MaxToolComponent;