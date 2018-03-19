import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const SumComponent = ({ results, raster, geometry, execute, func }) => (
  <div id='mean-tool' className='tool'>
    <ToolHeader
      logo_url="/images/sum.svg"
      title="Get the sum pixel value of an area"
    />
    <section className='content'>
      <DrawGeometry />
      <ImportGeometry />
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={() => execute(raster, geometry, func)}
        >
          Calculate Sum
        </button>
      </div>
      { results && <ToolResults results={results} /> }
    </section>
    <ToolFooter />
  </div>
);

export default SumComponent;
