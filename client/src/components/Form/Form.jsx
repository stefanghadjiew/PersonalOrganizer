import React from 'react';
import './styles.css';

const Form = ({ children, title, icon, style }) => {
    return (
        <div className="form-container">
            <form style={style} className="form" autoComplete="off">
                <h2 className="form-header">{title}</h2>
                {icon}
                {children}
            </form>
        </div>
    );
};

export default Form;
