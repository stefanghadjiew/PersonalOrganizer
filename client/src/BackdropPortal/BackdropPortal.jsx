import { usePortal } from '../customHooks';
import { useAppContext } from '../context/AppContext';
import classes from './styles.module.css';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { FramerMotionAnimations } from '../components';

const BackdropPortal = () => {
    const { applicationState } = useAppContext();
    const { backdrop } = applicationState;
    const { open, child } = backdrop;
    const { loaded, portalId } = usePortal();

    return loaded
        ? ReactDOM.createPortal(
              <AnimatePresence exitBeforeEnter>
                  {open && (
                      <FramerMotionAnimations animationType="backdrop-portal">
                          <div
                              className={classes.backdropContainer}
                              key="some-key"
                          >
                              {child.component}
                          </div>
                      </FramerMotionAnimations>
                  )}
              </AnimatePresence>,

              document.getElementById(portalId)
          )
        : null;
};

export default BackdropPortal;
