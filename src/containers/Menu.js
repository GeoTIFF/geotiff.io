import MenuComponent from '../components/MenuComponent';
import Map from '../components/Map';
import _ from 'underscore';
import { mount_tool } from '../actions/active-tool-actions';
import { search_tools } from '../actions/tool-list-actions';
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
    return {
        params: props.params,
        active_tool: state.active_tool,
        tool_list: state.tool_list
    }
};

const mapDispatchToProps = dispatch => {
    return {
        select_tool: tool => dispatch(mount_tool(tool)),
        search_tools: event => dispatch(search_tools(event.target.value.trim()))
    }
};

const Menu = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);

export default Menu;

// class Menu extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             focused: false,
//             tools: [],
//             visible_tools: [],
//             active_component: null,
//             auto_start_tool: false
//         };
        
//         this.search = this.search.bind(this);
//         this.select_tool = this.select_tool.bind(this);
//         this.set_visible_tools = this.set_visible_tools.bind(this);
//         this.on_select = this.on_select.bind(this);
//         this.on_remove = this.on_remove.bind(this);
//         this.on_search_focus = this.on_search_focus.bind(this);
//         this.listen = this.listen.bind(this);
//         this.lose_focus = this.lose_focus.bind(this);

//         Map.subscribe(this);
//     }

//     componentDidMount() {
//         tool_info.then(tools => {
//             this.setState({ tools });
//             this.set_visible_tools();

//             //load a tool if passed one in a search parameter
//             var starting_tool = this.props.params.get("tool");
//             var names_of_tools = _.pluck(tools, "2");
//             this.setState({ names_of_tools });

//             if (starting_tool) {
//                 this.on_select(starting_tool, { auto_start_tool: true });
//             }

//         });
//     }

//     search(event) {

//         let value = event.target.value.trim();
        
//             build_search_engine only runs after the tool info is loaded,
//             so we don't need the tool_info_promise
        
//         if (value === "") {
//             this.setState({
//                 visible_tools: this.state.tools
//             });
//         } else {
//             build_search_engine.then(fuse => {
//                 this.setState({
//                     visible_tools: _.pluck(fuse.search(value), "item")
//                 });
//             });
//         }
//     } 

//     select_tool(tool) {
//         console.log('selecting tool...');
//     }

//     on_select(component_name, options) {
//         let auto_start_tool = options ? options.auto_start_tool || false : false;
//         if (this.state.names_of_tools.includes(component_name)) {
//             this.setState({ 
//                 active_component: components[component_name],
//                 auto_start_tool: auto_start_tool
//             });
//         } else {
//             alert("You tried to load " + component_name + ", which is not technical name of the tool");
//         }
//     }

//     on_search_focus() {
//         this.setState({ focused: true });
//     }

//     listen(event_type, message) {
//         this.setState({ focused: false });
//     }

//     lose_focus() {
//         this.setState({ focused: false });
//     }

//     set_visible_tools(visible_tools) {
//         if (!visible_tools) visible_tools = this.state.tools;
//         this.setState({ visible_tools });
//     }

//     on_remove() {
//         this.setState({ active_component: null });
//     }
// }