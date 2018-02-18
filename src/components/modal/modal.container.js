import ModalComponent from './modal.component';
import { load_state } from '../tools/load/load.container';
import { compose, withState, withHandlers } from 'recompose';

const search_params = new URLSearchParams(window.location.search);
const preload_url = search_params.get("url");

const ModalContainer = compose(
  load_state,
  withState('is_open', 'set_is_open', !preload_url),
  withHandlers({
    close: ({ is_open, set_is_open }) => () => set_is_open(false),
    load_raster_and_close_modal: ({ is_open, set_is_open, load_raster }) =>() => {
      load_raster().then(() => set_is_open(false));
    }
  })
)(ModalComponent);

export default ModalContainer;
