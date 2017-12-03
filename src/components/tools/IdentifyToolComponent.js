import React from 'react';

const IdentifyToolComponent = ({ 
    identifying, results, close, change_mode
}) => (
    <div id='identify-tool' className='tool'>
        <section className='controls'>
            <header>
                <i 
                    className='material-icons gt-remove'
                    onClick={close}
                >
                    clear
                </i>
                <h3 className='tool-title'>
                    Identify a Pixel Value
                </h3>
            </header>
            <div className='content'>
                <p>Click a point on the map to identify the pixel value</p>
                <button 
                    className='gt-button'
                    onClick={change_mode}
                >
                    { identifying ? 'Stop Identifying' : 'Identify'  }
                </button>
            </div>
        </section>
        {
            identifying
            ? 
                <section className='results'>
                    <h3>Pixel Value: { results }</h3>
                </section>
            : ''
        }
    </div>
);

export default IdentifyToolComponent;
