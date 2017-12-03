import React from 'react';
import DrawGeometry from '../../containers/shared/DrawGeometry';
import ImportGeometry from '../../containers/shared/ImportGeometry';

const HistogramToolComponent = ({
    results, drawing, raster, geometry, close, execute, 
    scale_type, update_scale_type, num_classes, update_num_classes, 
    class_type, update_class_type
}) => (
    <div id='sum-tool' className='tool'>
        <section className='controls'>
            <header>
                <i 
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>Get the Histogram Distribution of an Area</h3>
            </header>
            <div className='content'>

                <p>1. Select a Measurement Scale</p>
                <select 
                    className='gt-dropdown'
                    onChange={update_scale_type}
                    value={scale_type}
                >
                    <option value='ratio'>Ratio</option>
                    <option value='nominal'>Nominal</option>
                </select>
                <br />
                <p>2. Select how many classes to distribute the values across</p>
                <input 
                    type='number'
                    className='gt-input'
                    onChange={update_num_classes}
                    value={num_classes}
                    min='0'
                    step='1'
                    disabled={scale_type === 'nominal'}
                />
                <br />
                <p>3. Select how the data should be classified</p>
                <select 
                    className='gt-dropdown'
                    onChange={update_class_type}
                    value={class_type}
                    disabled={scale_type === 'nominal'}
                >
                    <option value='equal-interval'>Equal-Interval</option>
                    <option value='quantile'>Quantile</option>
                </select>
                <br />
                <p>4. Select a geometry. Either draw a geometry using the buttons below</p>
                <DrawGeometry />
                <p className="or"><b>OR</b></p>
                <p>Add GeoJSON. You can either import a GeoJSON file or write it out yourself.</p>
                <ImportGeometry />
                <button
                    className='gt-button'
                    onClick={execute}
                >
                    Get Histogram
                </button>
            </div>
        </section>
        {
            results !== null
            ? 
                <section className='results'>
                    <h3>Histogram</h3>
                    { 
                        results.map(band => {
                            return band.map(bin => {
                                return <p><b>{ bin[0] }:</b> { bin[1] }</p>
                            });
                        }) 
                    }
                </section>
            : ''
        }
    </div>
);

export default HistogramToolComponent;