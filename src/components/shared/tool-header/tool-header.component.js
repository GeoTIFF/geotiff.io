import React from 'react';
import { Link } from 'react-router-dom';

const ToolHeaderComponent = ({ logo_url, title, close, focus}) => (
  <header onClick={focus}>
    <div className="header-top-row">
      <Link to="/" onClick={close}>
        <i className="material-icons">arrow_back</i>
        <span>Back</span>
      </Link>
      <i className="geotiff-logo"></i>
    </div>
    <div className="header-title-row">
      <span className="tool-icon" style={{backgroundImage: `url(${logo_url}`}}></span>
      <p>{title}</p>
    </div>
  </header>
);

export default ToolHeaderComponent;
