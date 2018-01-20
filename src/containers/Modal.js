import ModalComponent from '../components/ModalComponent';
import { load_state } from './tools/LoadTool';
import { compose, withState, withHandlers } from 'recompose';

const Modal = compose(
    load_state,
    withState('is_open', 'set_is_open', true),
    withHandlers({
        close: ({ is_open, set_is_open }) => () => set_is_open(false),
        load_raster_and_close_modal: ({ is_open, set_is_open, load_raster }) =>() => {
            load_raster().then(() => set_is_open(false));
        }
    })
)(ModalComponent);

export default Modal;
