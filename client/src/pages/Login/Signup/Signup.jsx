import React, { Fragment } from 'react';
import { Input } from '../../../components';
import classes from './styles.module.css';

const Signup = ({
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
    userConfirmedPassword,
}) => {
    return (
        <Fragment>
            <div className={classes['user-names-wrapper']}>
                <Input
                    type="text"
                    label="First Name"
                    value={userFirstName?.value}
                    onChange={userFirstName?.onChange}
                    /* error={userFirstName.error} */
                />
                <Input
                    type="text"
                    label="Last Name"
                    value={userLastName?.value}
                    onChange={userLastName?.onChange}
                    /* error={userFirstName.error} */
                />
            </div>
            <Input
                type="email"
                label="Email"
                value={userEmail?.value}
                onChange={userEmail?.onChange}
                error={userEmail?.error}
            />
            <Input
                type="password"
                label="Password"
                value={userPassword?.value}
                onChange={userPassword?.onChange}
                error={userPassword?.error}
            />
            <Input
                type="password"
                label="Confirm password"
                value={userConfirmedPassword?.value}
                onChange={userConfirmedPassword?.onChange}
                error={
                    userPassword.value !== userConfirmedPassword.value
                        ? 'Passwords don`t match'
                        : userConfirmedPassword?.error
                }
            />
        </Fragment>
    );
};

export default Signup;
