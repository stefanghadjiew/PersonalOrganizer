import React, { useState } from 'react';
import classes from './styles.module.css';
import { useSidebarLinks } from './sidebarLinks';
import { useAppContext } from '../../context/AppContext';
import FramerMotionAnimations from '../FramerMotionAnimations/FramerMotionAnimations';
import { AnimatePresence } from 'framer-motion';
import { useMediaQueries } from '../../responsive/useMediaQueries.js';

const SideBar = () => {
    const [componentId] = useState('sidebar-id');
    const { renderSideBarLinks } = useSidebarLinks();
    const { applicationState } = useAppContext();
    const { theme, backdrop } = applicationState;
    const { isMobile } = useMediaQueries();

    if (!isMobile) {
        return (
            <div
                className={
                    theme.light
                        ? classes.sideBar
                        : `${classes.sideBar} ${classes.darkTheme}`
                }
            >
                {renderSideBarLinks}
            </div>
        );
    } else {
        if (componentId !== backdrop.child.id) return null;
        return (
            <AnimatePresence exitBeforeEnter>
                {backdrop.child.isOpen && (
                    <FramerMotionAnimations
                        key="sidebar"
                        animationType="left-to-right-1"
                    >
                        <div
                            className={
                                theme.light
                                    ? classes.sideBar
                                    : `${classes.sideBar} ${classes.darkTheme}`
                            }
                        >
                            {renderSideBarLinks}
                        </div>
                    </FramerMotionAnimations>
                )}
            </AnimatePresence>
        );
    }
};

export default SideBar;
