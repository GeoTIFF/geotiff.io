import React from 'react';
import { Link } from 'react-router-dom';

const ToolButtonComponent = ({ name, icon, path }) => (
  <Link to={path} className='tool-button'>
    <i className='material-icons'>{icon}</i>
    <p>{name}</p>
  </Link>
);

export default ToolButtonComponent;
