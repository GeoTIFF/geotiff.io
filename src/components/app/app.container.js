import AppComponent from './app.component';
import { hideMenu } from 'services/path';
import { withRouter } from 'react-router-dom';
import { setDefaultLayout, setHideMenuLayout } from 'actions/layout-actions';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

const setLayout = () => hideMenu ? setHideMenuLayout() : setDefaultLayout();

const mapStateToProps = ({ layout }) => ({ layout });

const mapDispatchToProps = dispatch => {
  return {
    setLayout: () => dispatch(setLayout())
  }
}

const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.setLayout()
    }
  })
)(AppComponent);

export default withRouter(AppContainer);
