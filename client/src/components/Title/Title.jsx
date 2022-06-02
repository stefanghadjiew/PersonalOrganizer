import React from 'react';
import classes from './styles.module.css';

const Title = ({ type = 'h1', text, style, textStyle }) => {
    return (
        <div style={style} className={classes.titleWrapper}>
            {type === 'h1' ? (
                <h1
                    style={textStyle}
                    className={`${classes.title} ${classes.h1}`}
                >
                    {text}
                </h1>
            ) : (
                <h2 className={`${classes.title} ${classes.h2}`}>
                    {text}
                </h2>
            )}
        </div>
    );
};

export default Title;
