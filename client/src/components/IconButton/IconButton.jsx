import React from 'react';
import classes from './styles.module.css';

const IconButton = ({
    icon,
    tooltip,
    style,
    onClick,
    wrapperStyle,
    disabled = false,
}) => {
    return (
        <div style={wrapperStyle} className={classes.iconButtonWrapper}>
            <button
                onClick={onClick}
                style={style}
                className={
                    disabled
                        ? `${classes.iconButton} ${classes.disabled}`
                        : classes.iconButton
                }
            >
                {icon}
            </button>
            <p className={classes.tooltip}>{tooltip}</p>
        </div>
    );
};

export default IconButton;
