import React from 'react';
import ToolHeader from '../../shared/tool-header';
import ToolContent from '../../shared/tool-content';
import ToolResults from '../../shared/tool-results';
import ToolFooter from '../../shared/tool-footer';

const IdentifyComponent = ({ identifying, results, change_mode }) => (
  <div id='identify-tool' className='tool'>
    <ToolHeader
      logo_url="/images/identify.svg"
      title="Identify a pixel value"
    />
    <ToolContent>
      <p>Click a point on the map to identify the pixel value</p>
      <div className='content-row submit-row'>
        <button
          className='gt-button-accent full'
          onClick={change_mode}
        >
          { identifying ? 'Stop Identifying' : 'Identify'  }
        </button>
      </div>
      { identifying && <ToolResults results={results} />}
    </ToolContent>
    <ToolFooter />
  </div>
);

export default IdentifyComponent;
