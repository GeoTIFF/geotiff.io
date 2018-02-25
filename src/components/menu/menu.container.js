import MenuComponent from './menu.component';
import { mount_tool } from '../../actions/active-tool-actions';
import { search_tools } from '../../actions/tool-list-actions';
import { focus_menu } from '../../actions/menu-focus-actions';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const mapStateToProps = state => {
  return {
    active_tool: state.active_tool,
    tool_list: state.tool_list,
    menu_focus: state.menu_focus
  }
};

const mapDispatchToProps = dispatch => {
  return {
    select_tool: tool => dispatch(mount_tool(tool)),
    search_tools: event => dispatch(search_tools(event.target.value.trim())),
    focus: () => dispatch(focus_menu())
  }
};

const MenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    on_submit: ({ tool_list, select_tool }) => event => {
      event.preventDefault();
      if (tool_list.length) {
        select_tool(tool_list[0][3])
      }
    }
  })
)(MenuComponent);

export default MenuContainer;
