import React from 'react';
import ToolButton from '../tool-button';

const MenuComponent = ({ toolList, menuFocus, searchTools, onSubmit, focus }) => (
  <div id='menu'>
    <header id='menu-header'>
      <span className='menu-header-icon'></span>
      <h3>GeoTIFF</h3>
    </header>
    <section
      id='search'
      onClick={focus}
    >
      <form onSubmit={onSubmit}>
        <input
          id='search-input'
          className='gt-input'
          type='text'
          placeholder='Search Tools...'
          onChange={searchTools}
        />
      </form>
    </section>
    <section
      id='content'
      className={menuFocus ? 'focus' : ''}
    >
      <div id='tool-button-container'>
        {
          toolList.map(({ name, iconUrl, path }) => {
            return <ToolButton
              key={name}
              name={name}
              iconUrl={iconUrl}
              path={path}
            />
          })
        }
      </div>
    </section>
  </div>
);

export default MenuComponent;
