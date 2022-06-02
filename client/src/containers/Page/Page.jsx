import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const Page = ({ orientation = 'vertical', children }) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    const applyClassName = () => {
        if (orientation === 'vertical') {
            return theme.light
                ? `${classes['page-wrapper']} ${classes.vertical}`
                : `${classes['page-wrapper']} ${classes.vertical} ${classes.darkTheme}`;
        }
        if (orientation === 'horizontal') {
            return theme.light
                ? `${classes['page-wrapper']} `
                : `${classes['page-wrapper']} ${classes.darkTheme}`;
        }
    };

    return <div className={applyClassName()}>{children}</div>;
};

export default Page;
