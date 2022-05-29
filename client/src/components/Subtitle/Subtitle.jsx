import React from 'react';
import classes from './styles.module.css';

const Subtitle = ({ text, wrapperStyle, textStyle }) => {
    return (
        <div style={wrapperStyle} className={classes.subtitleWrapper}>
            <h3 style={textStyle} className={classes.subtitle}>
                {text}
            </h3>
        </div>
    );
};

export default Subtitle;
