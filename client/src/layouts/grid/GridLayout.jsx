import React from 'react';
import classes from './styles.module.css';

const GridLayout = ({ children }) => {
    return (
        <div className={classes.gridContainer}>
            <div className={classes.gridLayout}>{children}</div>
        </div>
    );
};

export default GridLayout;
