import React from 'react';
import classes from './styles.module.css';

const Subtitle = ({ text }) => {
    return (
        <div className={classes.subtitleWrapper}>
            <h3 className={classes.subtitle}>{text}</h3>
        </div>
    );
};

export default Subtitle;
