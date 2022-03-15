import React from 'react'
import './styles.css'

const Button = ({text,onClick,style}) => {
    return (
        <button 
            style={style} 
            className="button" 
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
