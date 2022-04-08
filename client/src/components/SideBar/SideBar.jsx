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
        >
            <div
                className={
                    theme.light
                        ? isMobile
                            ? `${classes.sideBar} ${classes.maxWidth}`
                            : classes.sideBar
                        : isMobile
                        ? `${classes.sideBar} ${classes.darkTheme} ${classes.maxWidth}`
                        : `${classes.sideBar} ${classes.darkTheme}`
                }
            >
                {renderSideBarLinks}
            </div>
        </FramerMotionAnimations>
    );
};

export default SideBar;
