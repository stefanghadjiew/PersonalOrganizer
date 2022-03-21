import { usePortal } from '../customHooks';
import { useAppContext } from '../context/AppContext';
import classes from './styles.module.css';
import ReactDOM from 'react-dom';

const BackdropPortal = () => {
    const { applicationState } = useAppContext();
    const { backdrop } = applicationState;
    const { open, child } = backdrop;
    const { loaded, portalId } = usePortal();

    return loaded
        ? open
            ? ReactDOM.createPortal(
                  <div className={classes.backdropContainer}>{child}</div>,
                  document.getElementById(portalId)
              )
            : null
        : null;
};

export default BackdropPortal;
