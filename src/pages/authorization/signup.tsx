import React from 'react';
import { Button, Input, Typography, Form, App, Flex, Layout, Card } from 'antd';
import axios, { AxiosResponse } from 'axios';

type SignUpPageProps = {
    authUrl?: string
    homeUrl?: string
    onSuccess?: (response: AxiosResponse) => void
}

export const SignUpPage: React.FC<SignUpPageProps> = (props) =>
{
    const { authUrl = '/api/auth', homeUrl, onSuccess } = props;

    const { message } = App.useApp();
    const [form] = Form.useForm();

    const handleGoogleSignIn = () =>
    {
        axios.get(`${authUrl}/google`);
    };

    const handleSignUp = () =>
    {
        form.validateFields().then((values) =>
        {
            delete values.repeatPassword;

            axios.post(`${authUrl}/sign-up`, values)
                .then(onSuccess)
                .catch((error) =>
                {
                    console.log(error);
                    message.error(`${error.message} ${error.response?.data.message ? ': ' + error.response.data.message : ''}`);
                });
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
                <Card style={{ marginBottom: '6rem' }}>
                    <Flex
                        vertical
                    >
                        <Typography.Title
                            level={2}
                            style={{ textAlign: 'center' }}
                        >
                    Sign Up
                        </Typography.Title>
                        <Form
                            layout="vertical"
                            form={form}
                        >
                            <Flex gap={'small'}>
                                <Form.Item
                                    label="First Name"
                                    name={'firstName'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Last Name"
                                    name={'lastName'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Flex>
                            <Form.Item
                                label="Username"
                                name={'username'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name={'email'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please input a valid email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name={'password'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    type='password'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Repeat Password"
                                name={'repeatPassword'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value)
                                        {
                                            if (!value || getFieldValue('password') === value)
                                            {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    type='password'
                                />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    block
                                    onClick={handleSignUp}
                                >
                            Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                        <Flex
                            gap={'small'}
                            justify='center'
                        >
                            <Typography.Text style={{ display: 'block', textAlign: 'center', margin: '16px 0' }}>or</Typography.Text>
                        </Flex>
                        <Button
                            type="default"
                            block
                            onClick={handleGoogleSignIn}
                        >
                        Login with Google
                        </Button>
                    </Flex>
                </Card>
                {homeUrl && <a href={homeUrl}>Back to home</a>}
            </Flex>
        </Layout>
    );
};
