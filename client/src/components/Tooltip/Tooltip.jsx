import React from 'react';
import classes from './styles.module.css';

const Tooltip = ({ tooltip, show }) => {
    return (
        <div className={show ? classes.tooltip : null}>
            {show ? tooltip : null}
        </div>
    );
};

export default Tooltip;
