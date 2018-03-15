import React from 'react';
import { Link } from 'react-router-dom';

const DownloadComponent = ({ raster, download }) => (
  <div id='download-tool' className='tool'>
    <section className='controls'>
      <header>
        <Link to="/">
          <i className='gt-remove'></i>
          <span>Back</span>
        </Link>
        <h3 className='tool-title'>Download the GeoTIFF</h3>
      </header>
      <div className='content'>
        <p>Download the GeoTIFF displayed on the map</p>
        <button
          className='gt-button-accent full'
          onClick={() => download(raster)}
        >
          Download GeoTIFF
        </button>
      </div>
    </section>
   </div>
);

export default DownloadComponent;
