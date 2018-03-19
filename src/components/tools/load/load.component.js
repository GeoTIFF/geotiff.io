import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolFooter from '../../shared/tool-footer';

const LoadComponent = ({
  url_input, file_input, update_url_input, update_file_input, load_raster
}) => (
  <div id='load-tool' className='tool'>
    <ToolHeader
      logo_url="/images/load.svg"
      title="Load a GeoTIFF"
    />
    <section className='content'>
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
      <div className="content-row submit-row">
        <button
          className='gt-button-accent full'
          onClick={load_raster}
        >
          Load
        </button>
      </div>
    </section>
    <ToolFooter />
  </div>
);

export default LoadComponent;
