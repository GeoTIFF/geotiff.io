import ModalComponent from './modal.component';
import { loadState } from '../tools/load/load.container';
import { compose, withState, withHandlers } from 'recompose';

const searchParams = new URLSearchParams(window.location.search);
const preloadURL = searchParams.get("url");

const ModalContainer = compose(
  loadState,
  withState('isOpen', 'setIsOpen', !preloadURL),
  withHandlers({
    close: ({ isOpen, setIsOpen }) => () => setIsOpen(false),
    loadRasterAndCloseModal: ({ isOpen, setIsOpen, loadRaster }) =>() => {
      loadRaster().then(() => setIsOpen(false));
    }
  })
)(ModalComponent);

export default ModalContainer;
