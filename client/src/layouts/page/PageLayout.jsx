import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const PageLayout = ({ children }) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    return (
        <div
            className={
                theme.light
                    ? classes.pageLayout
                    : `${classes.pageLayout} ${classes.darkTheme}`
            }
        >
            {children}
        </div>
    );
};

export default PageLayout;
