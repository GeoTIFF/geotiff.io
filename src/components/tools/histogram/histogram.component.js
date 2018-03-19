import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const HistogramComponent = ({
  results, drawing, raster, geometry, execute, scale_type,
  update_scale_type, num_classes, update_num_classes,
  class_type, update_class_type
}) => (
  <div id='sum-tool' className='tool'>
    <ToolHeader
      logo_url="/images/histogram.svg"
      title="Get the histogram distribution of an area"
    />
    <section className='content'>
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
    </section>
    <ToolFooter />
  </div>
);

export default HistogramComponent;
