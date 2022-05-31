import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const Divider = ({ style }) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    return (
        <div
            style={style}
            className={
                theme.light
                    ? `${classes.divider} ${classes['divider-light-theme']}`
                    : `${classes.divider} ${classes['divider-dark-theme']}`
            }
        ></div>
    );
};

export default Divider;
