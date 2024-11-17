import React from 'react';
import { Button, Input, Typography, Form, App, Flex, Layout } from 'antd';

import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

type SignInPageProps = {
    authUrl?: string
    homeUrl?: string
    onSuccess?: (response: AxiosResponse) => void
}

export const SignInPage: React.FC<SignInPageProps> = (props) =>
{
    const { authUrl = '/api/auth', homeUrl, onSuccess } = props;

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { message } = App.useApp();

    const handleGoogleSignIn = () =>
    {
        axios.get(`${authUrl}/google`);
    };

    const handleBasicLogin = () =>
    {
        axios.post(`${authUrl}/login`, {
            username,
            password,
        })
            .then(onSuccess)
            .catch((error) =>
            {
                message.error(`${error.message}: ${error.response.data.message}`);
            });
    };

    return (
        <Layout>
            <Flex
                justify='center'
                align='center'
                style={{ minHeight: '100vh' }}
                vertical
            >
                <Flex
                    style={{ width: '300px', marginBottom: '6rem' }}
                    vertical
                >
                    <Typography.Title
                        level={2}
                        style={{ textAlign: 'center' }}
                    >
                    Sign In
                    </Typography.Title>
                    <Form layout="vertical">
                        <Form.Item label="Username">
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input.Password
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                onClick={handleBasicLogin}
                            >
                            Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                    <Typography.Text style={{ display: 'block', textAlign: 'center', margin: '16px 0' }}>or</Typography.Text>
                    <Button
                        type="default"
                        block
                        onClick={handleGoogleSignIn}
                    >
                        Login with Google
                    </Button>
                </Flex>
                {homeUrl && <Link to={homeUrl}>Back to home</Link>}
            </Flex>
        </Layout>
    );
};
