import React from 'react';
import { Link } from 'react-router-dom';

const ToolButtonComponent = ({ name, icon_url, path }) => (
  <Link to={path} className='tool-button'>
    <i style={{ backgroundImage: `url(${icon_url})` }}></i>
    <p>{name}</p>
  </Link>
);

export default ToolButtonComponent;
