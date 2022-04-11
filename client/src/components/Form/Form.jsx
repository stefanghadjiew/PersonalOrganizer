import React from 'react';
import './styles.css';

const Form = ({ children, title, icon, style, containerStyle }) => {
    return (
        <div className="form-container" style={containerStyle}>
            <form style={style} className="form" autoComplete="off">
                <h2 className="form-header">{title}</h2>
                {icon}
                {children}
            </form>
        </div>
    );
};

export default Form;
