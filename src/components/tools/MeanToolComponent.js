import React from 'react';
import DrawGeometry from '../../containers/shared/DrawGeometry';
import ImportGeometry from '../../containers/shared/ImportGeometry';

const MeanToolComponent = ({ 
    results, raster, geometry, execute, close, func
}) => (
    <div id='mean-tool' className='tool'>
        <section className='controls'>
            <header>
                <i 
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>
                    Get the Mean Pixel Value of an Area
                </h3>
            </header>
            <div className='content'>
                <DrawGeometry />
                <p className="or">
                    <b>OR</b>
                </p>
                <ImportGeometry />
                <div className='content-row'>
                    <button 
                        className='gt-button'
                        onClick={() => execute(raster, geometry, func)}
                    >
                        Calculate Mean
                    </button>
                </div>
            </div>
        </section>
        {
            results
            ? 
                <section className='results'>
                    <h3>Mean: {results}</h3>
                </section>
            : ''
        }
    </div>
);

export default MeanToolComponent;