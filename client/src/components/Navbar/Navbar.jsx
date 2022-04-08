import React from 'react';
import classes from './styles.module.css';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { Button, IconButton } from '..';
import { useAppContext } from '../../context/AppContext';

import {
    setLightTheme,
    setDarkTheme,
    logoutUser,
} from '../../context/actions';
import { useNavigate } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import SideBar from '../SideBar/SideBar';
import { openBackdropWithChild } from '../../context/actions';
import { useMediaQueries } from '../../responsive/useMediaQueries';

const Navbar = () => {
    const { applicationState, dispatch } = useAppContext();
    const { user, theme } = applicationState;
    const navigate = useNavigate();
    const { isMobile } = useMediaQueries();

    return (
        <div
            className={
                theme.light
                    ? classes.navbar
                    : `${classes.navbar} ${classes.darkTheme}`
            }
        >
            {!user && <Button text="Sign Up" />}
            {isMobile && (
                <IconButton
                    tooltip={'menu'}
                    icon={
                        <HiMenuAlt4
                            className={
                                theme.light
                                    ? classes['navbar-icon']
                                    : `${classes['navbar-icon']} ${classes['navbar-icon-dark-theme']}`
                            }
                        />
                    }
                    onClick={() => {
                        openBackdropWithChild(<SideBar />, dispatch);
                    }}
                />
            )}

            <IconButton
                onClick={() => {
                    setLightTheme(dispatch);
                }}
                wrapperStyle={{
                    display: `${theme.dark ? 'block' : 'none'}`,
                }}
                tooltip={'light-theme'}
                icon={
                    <MdOutlineLightMode
                        className={
                            theme.light
                                ? classes['navbar-icon']
                                : `${classes['navbar-icon']} ${classes['navbar-icon-dark-theme']}`
                        }
                    />
                }
            />

            <IconButton
                onClick={() => {
                    setDarkTheme(dispatch);
                }}
                tooltip={'dark-theme'}
                wrapperStyle={{
                    display: `${theme.light ? 'block' : 'none'}`,
                }}
                icon={
                    <MdOutlineDarkMode
                        className={
                            theme.light
                                ? classes['navbar-icon']
                                : `${classes['navbar-icon']} ${classes['navbar-icon-dark-theme']}`
                        }
                    />
                }
            />
            {user && (
                <IconButton
                    tooltip={'github repo'}
                    icon={
                        <AiFillGithub
                            className={
                                theme.light
                                    ? classes['navbar-icon']
                                    : `${classes['navbar-icon']} ${classes['navbar-icon-dark-theme']}`
                            }
                        />
                    }
                />
            )}

            {user && (
                <IconButton
                    onClick={() => {
                        logoutUser(dispatch);
                        navigate('/login');
                    }}
                    tooltip={'logout'}
                    icon={
                        <AiOutlineLogout
                            className={
                                theme.light
                                    ? classes['navbar-icon']
                                    : `${classes['navbar-icon']} ${classes['navbar-icon-dark-theme']}`
                            }
                        />
                    }
                />
            )}
        </div>
    );
};

export default Navbar;
