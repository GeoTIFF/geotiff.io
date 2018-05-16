import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolFooter from '../../shared/tool-footer';

const RasterCalculator = ({ raster_calculator, update_raster_calculator, execute }) => (
  <div id='raster-calculator-tool' className='tool'>
    <ToolHeader
      logo_url="/images/raster-calculator.svg"
      title="Run Raster Calculator on the raster"
    />
    <ToolContent>
      <p>Run a JavaScript function on every pixel in your raster.  Just type in the function body below.  The values for each different pixel are already passed in as variables A, B, C, etc.  For example typing in "return A > 200 ? 1 : 0;" binarizes the image using the first band.</p>
      <br/>
      <p>Enter your raster calculator operation.</p>
      <textarea
        type='string'
        className='gt-input'
        onChange={update_raster_calculator}
        value={raster_calculator}
        rows="5"
      />
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={execute}
        >
          Compute Raster Calculator
        </button>
      </div>
    </ToolContent>
    <ToolFooter />
  </div>
);

export default RasterCalculator
