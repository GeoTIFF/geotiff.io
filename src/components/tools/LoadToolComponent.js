import React from 'react';

const LoadToolComponent = ({
    url_input, file_input, close, update_url_input, update_file_input, load_raster
}) => (
    <div id='load-tool' className='tool'>
        <section className='controls'>
            <header>
                <i
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>Load a GeoTIFF</h3>
            </header>
            <div className='content'>
                <p className='tool-desc'>
                    You have two ways to add a GeoTIFF to the map. Add a url or upload a file
                </p>
                <br />
                <label htmlFor="basic-url">
                    URL to Your GeoTIFF
                </label>
                <div className="input-group">
                    <input
                        type="text"
                        className="gt-input"
                        onChange={update_url_input}
                    />
                </div>
                <br />
                <p className="or"><b>OR</b></p>
                <label htmlFor="basic-url">
                    Load File
                </label>
                <div className="gt-input">
                    <input
                        type="file"
                        onChange={update_file_input}
                    />
                </div>
                <br />
                <button
                    className='gt-button to-right'
                    onClick={load_raster}
                >
                    Load
                </button>
            </div>
        </section>
    </div>
);

export default LoadToolComponent;
