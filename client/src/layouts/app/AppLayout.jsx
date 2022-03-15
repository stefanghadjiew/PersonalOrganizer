import React from 'react'
import classes from './styles.module.css'

const AppLayout = ({children}) => {
    return (
        <div className={classes.appLayout}>
            {children}
        </div>
    )
}

export default AppLayout
