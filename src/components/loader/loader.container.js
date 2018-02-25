import LoaderComponent from './loader.component';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ loading: state.loading });

const LoaderContainer = connect(mapStateToProps)(LoaderComponent);

export default LoaderContainer;
