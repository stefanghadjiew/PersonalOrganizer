import React from 'react'
import classes from './styles.module.css'

const IconButton = ({icon,tooltip}) => {
    return (
        <div className={classes.iconButtonWrapper}>
            <button className={classes.iconButton}>
                {icon}
            </button>
            <p className={classes.tooltip}>{tooltip}</p>
        </div>
        
    )
}

export default IconButton
