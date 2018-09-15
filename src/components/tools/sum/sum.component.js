import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const SumComponent = ({ results, raster, geometry, execute, func }) => (
  <div id='sum-tool' className='tool'>
    <ToolHeader
      logoURL="/images/sum.svg"
      title="Get the sum pixel value of an area"
    />
    <ToolContent>
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
      {
        results &&
        <ToolResults className="single-value">
          <h3>Results</h3>
          <p>{results}</p>
        </ToolResults>
      }
    </ToolContent>
    <ToolFooter />
  </div>
);

export default SumComponent;
