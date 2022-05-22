import React from 'react';
import classes from './styles.module.css';
import Tooltip from '../Tooltip/Tooltip.jsx';

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

            <Tooltip tooltip={tooltip} show={true} />
        </div>
    );
};

export default IconButton;
