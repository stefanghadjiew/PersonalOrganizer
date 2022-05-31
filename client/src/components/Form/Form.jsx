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
                <Title
                    type="h2"
                    text={title}
                    style={{ paddingBottom: 0 }}
                />

                {icon}
                {children}
            </form>
        </div>
    );
};

export default Form;
