import React, { Fragment } from 'react';
import { Input } from '../../../components';

const Signin = ({ userEmail, userPassword }) => {
    return (
        <Fragment>
            <Input
                type="email"
                label="email"
                value={userEmail?.value}
                onChange={userEmail?.onChange}
                error={userEmail?.error}
            />
            <Input
                type="password"
                label="password"
                value={userPassword?.value}
                onChange={userPassword?.onChange}
                error={userPassword?.error}
            />
        </Fragment>
    );
};

export default Signin;
