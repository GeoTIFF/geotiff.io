import React from 'react';

const DownloadComponent = ({ raster, close, download }) => (
    <div id='download-tool' className='tool'>
        <section className='controls'>
            <header>
                <i
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>Download the GeoTIFF</h3>
            </header>
            <div className='content'>
                <p>Download the GeoTIFF displayed on the map</p>
                <button
                    className='gt-button'
                    onClick={() => download(raster)}
                >
                    Download GeoTIFF
                </button>
            </div>
        </section>
   </div>
);

export default DownloadComponent;
