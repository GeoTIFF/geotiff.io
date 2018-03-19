import React from 'react';
import ToolButton from '../tool-button';

const MenuComponent = ({
  tool_list, menu_focus, search_tools, on_submit, focus
}) => (
  <div id='menu'>
    <header id='menu-header'>
      <span className='menu-header-icon'></span>
      <h3>GeoTIFF</h3>
    </header>
    <section
      id='search'
      onClick={focus}
    >
      <form onSubmit={on_submit}>
        <input
          id='search-input'
          className='gt-input'
          type='text'
          placeholder='Search Tools...'
          onChange={search_tools}
        />
      </form>
    </section>
    <section
      id='content'
      className={menu_focus ? 'focus' : ''}
    >
      <div id='tool-button-container'>
        {
          tool_list.map(tool => {
            return <ToolButton
              key={tool[0]}
              name={tool[0]}
              icon_url={tool[1]}
              path={tool[2]}
            />
          })
        }
      </div>
    </section>
  </div>
);

export default MenuComponent;
