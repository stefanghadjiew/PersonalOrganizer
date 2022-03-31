import React from 'react';
import classes from './styles.module.css';

const Button = ({
    text,
    onClick,
    style,
    companion = false,
    disabled = false,
}) => {
    return (
        <button
            style={style}
            className={
                companion
                    ? `${classes.button} ${classes.companion}`
                    : disabled
                    ? `${classes.button} ${classes.disabled}`
                    : classes.button
            }
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
