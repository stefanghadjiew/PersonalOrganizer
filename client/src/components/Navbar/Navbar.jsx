import React from 'react'
import classes from './styles.module.css'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiFillGithub } from 'react-icons/ai'
import { Button,IconButton } from '..'

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <Button text="Sign Up"/>
            <IconButton
                tooltip={'github repo'} 
                icon={ <AiFillGithub className={classes['navbar-icon']}/>}
            />
            <IconButton 
                tooltip={'logout'}
                icon={<AiOutlineLogout className={classes['navbar-icon']}/>}
            />
            <IconButton 
                tooltip={'settings'}
                icon={<IoSettingsOutline className={classes['navbar-icon']}/>}
            />
        </div>
    )
}

export default Navbar
