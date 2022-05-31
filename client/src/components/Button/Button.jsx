import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const Button = ({
    text,
    onClick,
    style,
    companion = false,
    disabled = false,
}) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    const setClassName = () => {
        if (theme.light) {
            if (companion) {
                return `${classes.button} ${classes.companion} ${classes['button-light-theme']}`;
            }
            if (disabled) {
                return `${classes.button} ${classes.disabled} ${classes['button-light-theme']}`;
            }
            return `${classes.button} ${classes['button-light-theme']}`;
        }
        if (theme.dark) {
            if (companion) {
                return `${classes.button} ${classes.companion} ${classes['button-dark-theme']}`;
            }
            if (disabled) {
                return `${classes.button} ${classes.disabled} ${classes['button-dark-theme']}`;
            }
            return `${classes.button} ${classes['button-dark-theme']}`;
        }
    };

    return (
        <button
            style={style}
            className={setClassName()}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
