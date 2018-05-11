import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolFooter from '../../shared/tool-footer';

const RasterCalculator = ({ band_arithmetic, update_band_arithmetic, execute }) => (
  <div id='band-arithmetic-tool' className='tool'>
    <ToolHeader
      logo_url="/images/band-arithmetic.svg"
      title="Run Band Arithmetic on the raster"
    />
    <ToolContent>
      <p>Description of how band arithmetic works goes here.</p>
      <br/>
      <p>Enter your band arithmetic operation.</p>
      <input
        type='string'
        className='gt-input'
        onChange={update_band_arithmetic}
        value={band_arithmetic}
      />
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={execute}
        >
          Compute Band Arithmetic
        </button>
      </div>
    </ToolContent>
    <ToolFooter />
  </div>
);

export default RasterCalculator
