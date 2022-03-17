import React from 'react';
import classes from './styles.module.css';

const Title = ({ text }) => {
    return (
        <div className={classes.titleWrapper}>
            <h1 className={classes.title}>{text}</h1>
        </div>
    );
};

export default Title;
