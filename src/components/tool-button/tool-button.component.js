import React from 'react';

const ToolButtonComponent = ({ name, icon, component, select }) => (
  <button className='tool-button' onClick={() => select(component)}>
    <i className='material-icons'>{icon}</i>
    <h3>{name}</h3>
  </button>
);

export default ToolButtonComponent;
