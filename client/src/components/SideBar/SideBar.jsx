import React from 'react';
import classes from './styles.module.css';
import { useSidebarLinks } from './sidebarLinks';
import { useAppContext } from '../../context/AppContext';
import FramerMotionAnimations from '../FramerMotionAnimations/FramerMotionAnimations';

import { useMediaQueries } from '../../responsive/useMediaQueries.js';

const SideBar = () => {
    const { renderSideBarLinks } = useSidebarLinks();
    const { applicationState } = useAppContext();
    const { theme } = applicationState;
    const { isMobile } = useMediaQueries();

    return (
        <FramerMotionAnimations
            animationType="left-to-right-1"
            motionKey="sidebar"
            motionDivStyle={{ zIndex: 4 }}
        >
            <div
                className={
                    theme.light
                        ? isMobile
                            ? `${classes.sideBar} ${classes['sideBar--width--inBackdrop']}` // when in Backdrop portal
                            : `${classes.sideBar} ${classes['sideBar--width']} ${classes['sideBar--span']}`
                        : isMobile
                        ? `${classes.sideBar} ${classes.darkTheme} ${classes['sideBar--width--inBackdrop']}` // when in Backdrop portal
                        : `${classes.sideBar} ${classes.darkTheme} ${classes['sideBar--width']} ${classes['sideBar--span']}`
                }
            >
                {renderSideBarLinks}
            </div>
        </FramerMotionAnimations>
    );
};

export default SideBar;
