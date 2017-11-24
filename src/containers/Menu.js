import MenuComponent from '../components/MenuComponent';
import { mount_tool } from '../actions/active-tool-actions';
import { search_tools } from '../actions/tool-list-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
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