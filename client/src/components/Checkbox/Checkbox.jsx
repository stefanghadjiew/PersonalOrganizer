import React from 'react';
import classes from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCheck } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

const Checkbox = ({ checked, onChange, style, id = uuidv4() }) => {
    return (
        <div className={classes.checkboxWrapper}>
            <input
                className={classes.checkbox}
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                style={style}
            />
            <label htmlFor={id} className={classes.checkboxLabel}>
                {checked ? (
                    <GrFormClose className={classes.checkboxIcon} />
                ) : (
                    <AiOutlineCheck className={classes.checkboxIcon} />
                )}
            </label>
        </div>
    );
};

export default Checkbox;
