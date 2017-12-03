import React from 'react';
import ToolButtonComponent from './ToolButtonComponent';

const MenuComponent = ({ active_tool, tool_list, select_tool, search_tools }) => (
    <div id='menu'>
        <header id='menu-header'>
            <h3>GeoTIFF.io</h3>
        </header>
        <section id='search'>
            <form action={select_tool}>
                <input 
                    id='search-input'
                    className='gt-input'
                    type='text'
                    placeholder='Search Tools'
                    onChange={search_tools}
                />
            </form>
        </section>
        <section id='content'>
            { 
                active_tool
                ? React.createElement(active_tool)
                : <div id='tool-button-container'>
                    { 
                        tool_list.map(tool => {
                            return <ToolButtonComponent 
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
)

export default MenuComponent;