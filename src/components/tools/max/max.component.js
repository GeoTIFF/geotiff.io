import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const MaxComponent = ({ results, raster, geometry, execute, func }) => (
  <div id='max-tool' className='tool'>
    <ToolHeader
      logoURL="/images/maximum.svg"
      title="Get the maximum pixel value of an area"
    />
    <ToolContent>
      <DrawGeometry />
      <ImportGeometry />
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={() => execute(raster, geometry, func)}
        >
          Calculate Maximum
        </button>
      </div>
      { results && <ToolResults results={results} /> }
    </ToolContent>
    <ToolFooter />
  </div>
);

export default MaxComponent;
