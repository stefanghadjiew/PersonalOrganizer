import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../context/AppContext';

const Title = ({ type = 'h1', text, style }) => {
    const {
        applicationState: { theme },
    } = useAppContext();

    return (
        <div style={style} className={classes.titleWrapper}>
            {type === 'h1' ? (
                <h1 className={classes.title}>{text}</h1>
            ) : (
                <h2 className={classes.title}>{text}</h2>
            )}
        </div>
    );
};

export default Title;
