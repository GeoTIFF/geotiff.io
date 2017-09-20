let React = require('react');

let ToolButton = require('./ToolButton');

let Map = require('./Map');

let Fuse = require("fuse.js");

let _ = require("underscore");

let components = {};

let tool_info = fetch('data/tools.txt').then(response => {
    return new Promise(resolve => {
        response.text().then(str => {
            let tools = str.split('\n')
                .filter(Boolean) // filter out blank lines
                .map(tool => tool.split('|'));

            tools.forEach(tool => components[tool[2]] = require(`./tools/${tool[2]}`));

            resolve(tools);
        });
    });
});

let build_search_engine = tool_info.then(tools => {

    var options = {
        includeScore: true,
        shouldSort: true,
        tokenize: true,
        threshold: 0.0001,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            {
                name: "0",
                weight: 0.5,
            },
            {
                name: "2",
                weight: 0.2,
            }
        ]
    };

    return new Fuse(tools, options);
});

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            tools: [],
            visible_tools: [],
            active_component: null,
            auto_start_tool: false
        };
        
        this.search = this.search.bind(this);
        this.select_tool = this.select_tool.bind(this);
        this.set_visible_tools = this.set_visible_tools.bind(this);
        this.on_select = this.on_select.bind(this);
        this.on_remove = this.on_remove.bind(this);
        this.on_search_focus = this.on_search_focus.bind(this);
        this.listen = this.listen.bind(this);
        this.lose_focus = this.lose_focus.bind(this);

        Map.subscribe(this);
    }

    componentDidMount() {
        tool_info.then(tools => {
            this.setState({ tools });
            this.set_visible_tools();

            //load a tool if passed one in a search parameter
            var starting_tool = this.props.params.get("tool");
            var names_of_tools = _.pluck(tools, "2");
            this.setState({ names_of_tools });

            if (starting_tool) {
                this.on_select(starting_tool, { auto_start_tool: true });
            }

        });
    }

    search(event) {

        let value = event.target.value.trim();
        /*
            build_search_engine only runs after the tool info is loaded,
            so we don't need the tool_info_promise
        */
        if (value === "") {
            this.setState({
                visible_tools: this.state.tools
            });
        } else {
            build_search_engine.then(fuse => {
                this.setState({
                    visible_tools: _.pluck(fuse.search(value), "item")
                });
            });
        }
    } 

    select_tool(tool) {
        console.log('selecting tool...');
    }

    on_select(component_name, options) {
        console.log("starting on_select with", component_name);
        let auto_start_tool = options ? options.auto_start_tool || false : false;
        if (this.state.names_of_tools.includes(component_name)) {
            this.setState({ active_component: components[component_name], auto_start_tool: auto_start_tool });
        } else {
            alert("You tried to load " + component_name + ", which is not technical name of the tool");
        }
    }

    on_search_focus() {
        this.setState({ focused: true });
    }

    listen(event_type, message) {
        this.setState({ focused: false });
    }

    lose_focus() {
        this.setState({ focused: false });
    }

    set_visible_tools(visible_tools) {
        if (!visible_tools) visible_tools = this.state.tools;
        this.setState({ visible_tools });
    }

    on_remove() {
        this.setState({ active_component: null });
    }

    render() {
        return (
            <div id='menu'>
                <header id='menu-header'>
                    <h3>GeoTIFF.io</h3>
                </header>
                <section id='search'>
                    <form action={this.select_tool}>
                        <input 
                            id='search-input'
                            className='gt-input'
                            type='text'
                            placeholder='Search Tools'
                            onChange={this.search}
                            onFocus={this.on_search_focus}
                        />
                    </form>
                </section>
                <section id='content' className={this.state.focused ? 'focus' : ''}>
                    { 
                        this.state.active_component 
                        ? (
                            React.createElement(
                                this.state.active_component,
                                { on_remove: this.on_remove, lose_focus: this.lose_focus, auto_start: this.state.auto_start_tool }
                            )
                        )
                        : <div id='tool-button-container'>
                            { 
                                this.state.visible_tools.map(tool => {
                                    return <ToolButton 
                                        key={tool[0]}
                                        name={tool[0]} 
                                        icon={tool[1]}
                                        component={tool[2]}
                                        on_select={this.on_select}
                                        params={this.props.params}
                                    />
                                })
                            }
                        </div>
                    }

                </section>
            </div>
        )
    }
}

module.exports = Menu;
