import React, { Fragment } from 'react';
import { Form, Button } from '../../components';
import { Page } from '../../containers';
import { useInput } from '../../customHooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { loginUser, registerUser } from '../../context/actions';
import { Title, Subtitle, Divider } from '../../components';
import { BsFillFilePersonFill } from 'react-icons/bs';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';

const Login = () => {
    const navigate = useNavigate();
    const userFirstName = useInput('');
    const userLastName = useInput('');
    const userEmail = useInput('');
    const userPassword = useInput('');
    const userConfirmedPassword = useInput('');
    const location = useLocation();
    const { pathname } = location;
    const isRegister = pathname.includes('signup');
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
    const { dispatch } = useAppContext();

    const handleLogin = async e => {
        e.preventDefault();
        loginUser(dispatch, userLoginInfo, navigate);
    };

    const handleRegister = async e => {
        e.preventDefault();
        registerUser(dispatch, userRegisterInfo, navigate);
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
                containerStyle={{ paddingRight: '70px' }}
                title={!isRegister ? 'Log Into Your Account' : 'Sign Up'}
                icon={
                    isRegister ? null : (
                        <BsFillFilePersonFill
                            style={{ marginLeft: '-10px' }}
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
                ) : (
                    <Signin
                        userEmail={userEmail}
                        userPassword={userPassword}
                    />
                )}
                {!isRegister && (
                    <Link to="/new-password" style={{ color: '#81a4c2' }}>
                        Forgot your password?
                    </Link>
                )}

                <Button
                    style={{ width: '50%' }}
                    text="Submit"
                    onClick={isRegister ? handleRegister : handleLogin}
                    disabled={
                        isRegister
                            ? enableSubmitButton(userRegisterInfo)
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
