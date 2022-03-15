import React from 'react'
import classes from './styles.module.css'
import { AiOutlineClose } from 'react-icons/ai'

const CLoseButton = ({onClick}) => {
    return (
        <button onClick={onClick} className={classes.button}>
            <AiOutlineClose style={{fontSize: '1rem'}}/>
        </button>
    )
}

export default CLoseButton
