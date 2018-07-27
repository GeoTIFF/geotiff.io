import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const MinComponent = ({ results, raster, geometry, execute, func }) => (
  <div id='min-tool' className='tool'>
    <ToolHeader
      logoURL="/images/minimum.svg"
      title="Get the minimum pixel value of an area"
    />
    <ToolContent>
      <DrawGeometry />
      <ImportGeometry />
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={() => execute(raster, geometry, func)}
        >
          Calculate Minimum
        </button>
      </div>
      { results && <ToolResults results={results} /> }
    </ToolContent>
    <ToolFooter />
  </div>
);

export default MinComponent;
