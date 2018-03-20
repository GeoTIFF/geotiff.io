import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolFooter from '../../shared/tool-footer';

const DownloadComponent = ({ raster, download }) => (
  <div id='download-tool' className='tool'>
    <ToolHeader
      logo_url="/images/download.svg"
      title="Download the GeoTIFF"
    />
    <ToolContent>
      <p>Download the GeoTIFF displayed on the map</p>
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={() => download(raster)}
        >
          Download GeoTIFF
        </button>
      </div>
    </ToolContent>
    <ToolFooter />
   </div>
);

export default DownloadComponent;
