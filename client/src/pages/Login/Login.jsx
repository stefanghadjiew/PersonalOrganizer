import React, { Fragment } from 'react';
import { Form, Button } from '../../components';
import { Page } from '../../containers';
import { useInput } from '../../customHooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import {
    loginUser,
    registerUser,
    changePassword,
} from '../../context/actions';
import { Title, Subtitle, Divider } from '../../components';
import { BsFillFilePersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import NewPassword from './NewPassword/NewPassword';

const Login = () => {
    const navigate = useNavigate();
    const userFirstName = useInput('');
    const userLastName = useInput('');
    const userEmail = useInput('');
    const userPassword = useInput('');
    const userConfirmedPassword = useInput('');
    const userNewPassword = useInput('');
    const location = useLocation();
    const { pathname } = location;
    const isRegister = pathname.includes('signup');
    const isChangePassword = pathname.includes('new-password');
    const { dispatch } = useAppContext();
    const userLoginInfo = {
        email: userEmail.value,
        password: userPassword.value,
    };
    const userRegisterInfo = {
        userFirstName: userFirstName.value,
        userLastName: userLastName.value,
        email: userEmail.value,
        password: userPassword.value,
        confirmedPassword: userConfirmedPassword.value,
    };
    const userChangePasswordInfo = {
        email: userEmail.value,
        userNewPassword: userNewPassword.value,
        userConfirmedPassword: userConfirmedPassword.value,
    };

    const handleLogin = async e => {
        e.preventDefault();
        loginUser(dispatch, userLoginInfo, navigate);
    };

    const handleRegister = async e => {
        e.preventDefault();
        registerUser(dispatch, userRegisterInfo, navigate);
    };

    const handleChangePassword = e => {
        e.preventDefault();
        changePassword(dispatch, userChangePasswordInfo, navigate);
    };

    const enableSubmitButton = userInfo => {
        const emailRegexp =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (isRegister) {
            return !(
                userInfo.userFirstName.length !== 0 &&
                userInfo.userLastName.length !== 0 &&
                emailRegexp.test(userInfo.email) &&
                userInfo.password.length > 5 &&
                userInfo.confirmedPassword.length > 5 &&
                userInfo.password === userInfo.confirmedPassword
            );
        }
        if (isChangePassword) {
            return !(
                emailRegexp.test(userInfo.email) &&
                userInfo.userNewPassword.length > 5 &&
                userInfo.userConfirmedPassword.length > 5 &&
                userInfo.userNewPassword === userInfo.userConfirmedPassword
            );
        }
        return !(
            emailRegexp.test(userInfo.email) &&
            userInfo.password.length > 5
        );
    };

    return (
        <Page>
            <Title
                style={{ justifyContent: 'center' }}
                text="Personal Organizer"
            />
            <Form
                title={
                    !isRegister
                        ? isChangePassword
                            ? 'Change password'
                            : 'Log Into Your Account'
                        : 'Sign Up'
                }
                icon={
                    isRegister ? null : isChangePassword ? (
                        <RiLockPasswordFill
                            style={{
                                marginLeft: '-10px',
                                fontSize: '5rem',
                            }}
                        />
                    ) : (
                        <BsFillFilePersonFill
                            style={{
                                marginLeft: '-10px',
                                fontSize: '5rem',
                            }}
                        />
                    )
                }
            >
                {isRegister && (
                    <Fragment>
                        <Subtitle
                            textStyle={{
                                fontSize: '14px',
                            }}
                            wrapperStyle={{
                                paddingBottom: '0px',
                                marginTop: '-5px',
                            }}
                            text="Please fill in this form to create an account"
                        />
                        <Divider />
                    </Fragment>
                )}
                {isRegister ? (
                    <Signup
                        userFirstName={userFirstName}
                        userLastName={userLastName}
                        userEmail={userEmail}
                        userPassword={userPassword}
                        userConfirmedPassword={userConfirmedPassword}
                    />
                ) : isChangePassword ? (
                    <NewPassword
                        userEmail={userEmail}
                        userNewPassword={userNewPassword}
                        userConfirmedPassword={userConfirmedPassword}
                    />
                ) : (
                    <Signin
                        userEmail={userEmail}
                        userPassword={userPassword}
                    />
                )}
                {!isRegister && !isChangePassword && (
                    <Link to="/new-password" style={{ color: '#81a4c2' }}>
                        Forgot your password?
                    </Link>
                )}

                <Button
                    style={{ width: '50%' }}
                    text="Submit"
                    onClick={
                        isRegister
                            ? handleRegister
                            : isChangePassword
                            ? handleChangePassword
                            : handleLogin
                    }
                    disabled={
                        isRegister
                            ? enableSubmitButton(userRegisterInfo)
                            : isChangePassword
                            ? enableSubmitButton(userChangePasswordInfo)
                            : enableSubmitButton(userLoginInfo)
                    }
                />
                <Link
                    to={isRegister ? '/login' : '/signup'}
                    style={{ color: '#81a4c2' }}
                >
                    {isRegister
                        ? 'Already have an account?'
                        : 'Don`t have an account?'}
                </Link>
            </Form>
        </Page>
    );
};

export default Login;
