import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolFooter from '../../shared/tool-footer';

const DownloadComponent = ({ raster, download }) => (
  <div id='download-tool' className='tool'>
    <ToolHeader
      logo_url="/images/download.svg"
      title="Download the GeoTIFF"
    />
    <section className='content'>
      <p>Download the GeoTIFF displayed on the map</p>
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={() => download(raster)}
        >
          Download GeoTIFF
        </button>
      </div>
    </section>
    <ToolFooter />
   </div>
);

export default DownloadComponent;
