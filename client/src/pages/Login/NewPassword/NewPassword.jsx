import React, { Fragment } from 'react';
import { Input } from '../../../components';

const NewPassword = ({
    userEmail,
    userNewPassword,
    userConfirmedPassword,
}) => {
    return (
        <Fragment>
            <Input
                type="email"
                label="Email"
                value={userEmail?.value}
                onChange={userEmail?.onChange}
                error={userEmail?.error}
            />
            <Input
                type="password"
                label="New password"
                value={userNewPassword?.value}
                onChange={userNewPassword?.onChange}
                error={userNewPassword?.error}
            />
            <Input
                type="password"
                label="Repeat password"
                value={userConfirmedPassword?.value}
                onChange={userConfirmedPassword?.onChange}
                error={
                    userNewPassword.value !== userConfirmedPassword.value
                        ? 'Passwords don`t match'
                        : userConfirmedPassword?.error
                }
            />
        </Fragment>
    );
};

export default NewPassword;
