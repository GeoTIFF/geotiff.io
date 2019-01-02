/* global SITE_CONFIG */
import React from 'react';
import ToolButton from '../tool-button';

const MenuComponent = ({ toolList, menuFocus, searchTools, onSubmit, focus }) => (
  <div id='menu'>
    <header id='menu-header'>
      <span className='menu-header-icon'></span>
      <h3>{SITE_CONFIG.title}</h3>
    </header>
    <section
      id='search'
      onClick={focus}
    >
      <form onSubmit={onSubmit}>
        <input
          autoComplete="off"
          className='gt-input'
          id='search-input'
          onChange={searchTools}
          placeholder='Search Tools...'
          type='text'
        />
      </form>
    </section>
    <section
      className={menuFocus ? 'focus' : ''}
      id='content'
    >
      <div id='tool-button-container'>
        {
          toolList.map(({ name, iconUrl, path }) => {
            return <ToolButton
              iconUrl={iconUrl}
              key={name}
              name={name}
              path={path}
            />
          })
        }
      </div>
    </section>
  </div>
);

export default MenuComponent;
