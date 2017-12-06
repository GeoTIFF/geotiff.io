import LoaderComponent from '../components/LoaderComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ loading: state.loading });

const Loader = connect(mapStateToProps)(LoaderComponent);

export default Loader;