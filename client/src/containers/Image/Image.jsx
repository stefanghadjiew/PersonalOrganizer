import React from 'react'
import classes from './styles.module.css'

const Image = ({src,alt,style}) => {
    return (
        <div style={style} className={classes.imageContainer}>
            <img src={src} alt={alt}/>
        </div>
    )
}

export default Image
