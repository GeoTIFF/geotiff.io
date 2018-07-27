import React from 'react';
import { Link } from 'react-router-dom';

const ToolButtonComponent = ({ name, iconUrl, path }) => (
  <Link to={path} className='tool-button'>
    <i style={{ backgroundImage: `url(${iconUrl})` }}></i>
    <p>{name}</p>
  </Link>
);

export default ToolButtonComponent;
