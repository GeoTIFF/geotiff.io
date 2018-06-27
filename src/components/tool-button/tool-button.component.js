import React from 'react';
import { Link } from 'react-router-dom';

const ToolButtonComponent = ({ name, iconURL, path }) => (
  <Link to={path} className='tool-button'>
    <i style={{ backgroundImage: `url(${iconURL})` }}></i>
    <p>{name}</p>
  </Link>
);

export default ToolButtonComponent;
