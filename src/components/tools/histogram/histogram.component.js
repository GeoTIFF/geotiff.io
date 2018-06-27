import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const HistogramComponent = ({
  results, raster, geometry, execute, scaleType,
  updateScaleType, numClasses, updateNumClasses,
  classType, updateClassType
}) => (
  <div id='sum-tool' className='tool'>
    <ToolHeader
      logoURL="/images/histogram.svg"
      title="Get the histogram distribution of an area"
    />
    <ToolContent>
      <p>1. Select a Measurement Scale</p>
      <select
        className='gt-dropdown'
        onChange={updateScaleType}
        value={scaleType}
      >
        <option value='ratio'>Ratio</option>
        <option value='nominal'>Nominal</option>
      </select>
      <br />
      <p>2. Select how many classes to distribute the values across</p>
      <input
        type='number'
        className='gt-input'
        onChange={updateNumClasses}
        value={numClasses}
        min='0'
        step='1'
        disabled={scaleType === 'nominal'}
      />
      <br />
      <p>3. Select how the data should be classified</p>
      <select
        className='gt-dropdown'
        onChange={updateClassType}
        value={classType}
        disabled={scaleType === 'nominal'}
      >
        <option value='equal-interval'>Equal-Interval</option>
        <option value='quantile'>Quantile</option>
      </select>
      <br />
      <p>4. Select a geometry.</p>
      <DrawGeometry />
      <ImportGeometry />
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={execute}
        >
          Get Histogram
        </button>
      </div>
      { results && <ToolResults results={results} /> }
    </ToolContent>
    <ToolFooter />
  </div>
);

export default HistogramComponent;
