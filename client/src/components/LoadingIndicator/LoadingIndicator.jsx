import React, { useEffect } from 'react';
import classes from './styles.module.css';
import { closeBackdropAndRemoveChild } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';

const LoadingIndicator = () => {
    const { dispatch } = useAppContext();
    useEffect(() => {
        setTimeout(() => {
            closeBackdropAndRemoveChild(dispatch);
        }, 2500);
    }, []);

    return (
        <div className={classes.wrapper}>
            <h3>Loading...</h3>
            <div className={classes.indicatorWrapper}>
                <div className={classes.indicator}>
                    <div className={classes.animatedFragment}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
