import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';
import Title from '../Title/Title';

const Form = ({ children, title, icon, style, containerStyle }) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    return (
        <div className={classes['form-container']} style={containerStyle}>
            <form
                style={style}
                className={
                    theme.dark
                        ? `${classes.form} ${classes['form-dark-theme']}`
                        : classes.form
                }
                autoComplete="off"
            >
                <h2 className={classes['form-header']}>{title}</h2>
                {icon}
                {children}
            </form>
        </div>
    );
};

export default Form;
