import React, { forwardRef } from 'react';
import classes from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';

const Input = forwardRef(
    (
        {
            type,
            value,
            label,
            id = uuidv4(),
            placeholder = 'some placeholder',
            onChange,
            error = false,
            style,
            wrapperStyle,
            onClick,
        },
        ref
    ) => {
        return (
            <div
                style={wrapperStyle}
                className={`${classes['input-wrapper']}`}
                ref={ref}
            >
                <input
                    /* ref={ref} */
                    name="input"
                    className={classes.input}
                    id={id}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={style}
                    autoComplete="off"
                    onClick={onClick}
                />
                <label
                    htmlFor={id}
                    className={`${classes['floating-label']}`}
                >
                    {label}
                </label>
                {error && (
                    <p className={classes['error-message']}>{error}</p>
                )}
            </div>
        );
    }
);

export default Input;
