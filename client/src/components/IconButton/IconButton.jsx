import React from 'react';
import classes from './styles.module.css';

const IconButton = ({ icon, tooltip, style, onClick, wrapperStyle }) => {
    return (
        <div style={wrapperStyle} className={classes.iconButtonWrapper}>
            <button
                onClick={onClick}
                style={style}
                className={classes.iconButton}
            >
                {icon}
            </button>
            <p className={classes.tooltip}>{tooltip}</p>
        </div>
    );
};

export default IconButton;
