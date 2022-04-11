import React from 'react';
import { closeBackdropAndRemoveChild } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import classes from './styles.module.css';

const ClickAwayListener = ({ children }) => {
    const { dispatch } = useAppContext();

    const handleClickAway = e => {
        closeBackdropAndRemoveChild(dispatch);
    };

    return (
        <div
            className={classes.clickAwayListener}
            onClick={handleClickAway}
        >
            {children}
        </div>
    );
};

export default ClickAwayListener;
