import React from 'react'
import classes from './styles.module.css'

const PageLayout = ({children}) => {
    return (
        <div className={classes.pageLayout}>
            {children}
        </div>
    )
}

export default PageLayout
