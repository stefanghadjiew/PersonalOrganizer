import React from 'react';
import classes from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';

const Input = ({
    type,
    value,
    label,
    id = uuidv4(),
    placeholder = 'some placeholder',
    onChange,
    error = false,
    style,
}) => {
    return (
        <div className={`${classes['input-wrapper']}`}>
            <input
                name="input"
                className={classes.input}
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                style={style}
                autoComplete="off"
            />
            <label htmlFor={id} className={`${classes['floating-label']}`}>
                {label}
            </label>
            {error && <p className={classes['error-message']}>{error}</p>}
        </div>
    );
};

export default Input;
