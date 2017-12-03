import AppComponent from '../components/AppComponent';
import { set_default_layout, set_hide_menu_layout } from '../actions/layout-actions';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
// import { withLifecycle } from '@hocs/with-lifecycle';

const url_params = new URLSearchParams(window.location.search);

const set_layout = () => {
    const hide_menu = ["", "true", "True", "y", "Y", "yes", "Yes"]
        .indexOf(url_params.get("hide_menu")) > -1 || false;
    if (hide_menu) {
        return set_hide_menu_layout();
    } else {
        return set_default_layout();
    }
}
    
const mapStateToProps = state => ({ layout: state.layout });

const mapDispatchToProps = dispatch => {
    return {
        set_layout: () => dispatch(set_layout())
    }
}

const App = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentWillMount() {
            this.props.set_layout()
        }
    })
)(AppComponent);

export default App;