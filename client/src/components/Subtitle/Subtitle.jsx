import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const Subtitle = ({ type = 'h3', text, wrapperStyle, textStyle }) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    return (
        <div style={wrapperStyle} className={classes.subtitleWrapper}>
            {type === 'h3' ? (
                <h3 style={textStyle} className={classes.subtitle}>
                    {text}
                </h3>
            ) : type === 'h4' ? (
                <h4 style={textStyle} className={classes.subtitle}>
                    {text}
                </h4>
            ) : (
                <h5 style={textStyle} className={classes.subtitle}>
                    {text}
                </h5>
            )}
        </div>
    );
};

export default Subtitle;
