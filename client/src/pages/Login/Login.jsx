import React from 'react';
import { Form, Input, Button } from '../../components';
import { Page } from '../../containers';
import { useInput } from '../../customHooks';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { loginUser } from '../../context/actions';
import { Title } from '../../components';
import { BsFillFilePersonFill } from 'react-icons/bs';

const Login = () => {
    const navigate = useNavigate();
    const email = useInput('');
    const password = useInput('');
    const userInfo = { email: email.value, password: password.value };
    const { dispatch } = useAppContext();

    const handleClick = async e => {
        e.preventDefault();
        loginUser(dispatch, userInfo, navigate);
    };

    return (
        <Page>
            <Title
                style={{ justifyContent: 'center' }}
                text="Personal Organizer"
            />
            <Form
                title="Log Into Your Account"
                icon={<BsFillFilePersonFill />}
            >
                <Input
                    type="email"
                    label="email"
                    value={email.value}
                    onChange={email.onChange}
                    error={email.error}
                />
                <Input
                    type="password"
                    label="password"
                    value={password.value}
                    onChange={password.onChange}
                    error={password.error}
                />
                <Button text="Submit" onClick={handleClick} />
            </Form>
        </Page>
    );
};

export default Login;
