import React from 'react';
import './styles.css';

const Button = ({ text, onClick, style, companion = false }) => {
    return (
        <button
            style={style}
            className={companion ? 'button companion' : 'button'}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
