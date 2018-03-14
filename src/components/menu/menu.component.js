import React from 'react';
import ToolButton from '../tool-button';

const MenuComponent = ({
  active_tool, tool_list, menu_focus, select_tool, search_tools, on_submit, focus
}) => (
  <div id='menu'>
    <header id='menu-header'>
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
      {
        active_tool
        ? React.createElement(active_tool)
        : <div id='tool-button-container'>
          {
            tool_list.map(tool => {
              return <ToolButton
                key={tool[0]}
                name={tool[0]}
                icon={tool[1]}
                component={tool[3]}
                select={select_tool}
              />
            })
          }
        </div>
      }
    </section>
  </div>
);

export default MenuComponent;
