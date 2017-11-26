import React from 'react';
import DrawGeometry from '../../containers/shared/DrawGeometry';
// import ImportGeoJSON from '../../containers/shared/ImportGeoJSON';

const MinToolComponent = ({ 
    results, raster, geometry, execute, close, func
}) => (
    <div id='min-tool' className='tool'>
        <section className='controls'>
            <header>
                <i 
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>
                    Get the Minimum Pixel Value of an Area
                </h3>
            </header>
            <div className='content'>
                <p>
                    Select a geometry type and draw a geometry to get the minimum value of the pixels within that area.
                </p>
                <DrawGeometry />
                <div className='content-row'>
                    <button 
                        className='gt-button'
                        onClick={() => execute(raster, geometry, func)}
                    >
                        Calculate Minimum
                    </button>
                </div>
            </div>

        </section>
        {
            results
            ? 
                <section className='results'>
                    <h3>Minimum: {results}</h3>
                </section>
            : ''
        }
    </div>
);

export default MinToolComponent;


                // <p className="or">
                //     <b>OR</b>
                // </p>
                // <p>
                //     Add GeoJSON. You can either import a GeoJSON file or write it out yourself.
                // </p>
                // <ImportGeoJSON add_geojson={this.add_geojson} />