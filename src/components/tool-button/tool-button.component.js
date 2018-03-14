import React from 'react';

const ToolButtonComponent = ({ name, icon, component, select }) => (
  <button className='tool-button' onClick={() => select(component)}>
    <i className='material-icons'>{icon}</i>
    <p>{name}</p>
  </button>
);

export default ToolButtonComponent;
