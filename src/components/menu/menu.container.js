import MenuComponent from './menu.component';
import { searchTools } from '../../actions/tool-list-actions';
import { focusMenu } from '../../actions/menu-focus-actions';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const mapStateToProps = state => {
  return {
    toolList: state.toolList,
    menuFocus: state.menuFocus
  }
};

const mapDispatchToProps = dispatch => {
  return {
    searchTools: event => dispatch(searchTools(event.target.value.trim())),
    focus: () => dispatch(focusMenu())
  }
};

const MenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: ({ toolList, selectTool }) => event => {
      event.preventDefault();
      if (toolList.length) {
        selectTool(toolList[0][3])
      }
    }
  })
)(MenuComponent);

export default MenuContainer;
