import { usePortal } from '../customHooks';
import { useAppContext } from '../context/AppContext';
import classes from './styles.module.css';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { FramerMotionAnimations } from '../components';
import { ClickAwayListener } from '../components';

const BackdropPortal = () => {
    const {
        applicationState: {
            backdrop: { open, child },
        },
    } = useAppContext();
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
                              <ClickAwayListener>
                                  {child.component}
                              </ClickAwayListener>
                          </div>
                      </FramerMotionAnimations>
                  )}
              </AnimatePresence>,

              document.getElementById(portalId)
          )
        : null;
};

export default BackdropPortal;
