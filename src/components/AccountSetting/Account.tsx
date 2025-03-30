import { FAIcon } from '@repo/vicon';
import { Flex, Avatar, Typography, Form, Input, Button, Card } from 'antd';
import { useUserIdentity } from '../../contexts/UserIdentity';
import { useEffect } from 'react';

const layout = {
    labelCol: { span: 8 },
    labelAlign: 'left' as any,
    wrapperCol: { span: 16 },
};

export const Account = () =>
{
    const { userProfile } = useUserIdentity();
    const [form] = Form.useForm();

    useEffect(() =>
    {
        form.setFieldsValue({
            email: userProfile.email,
        });
    }, []);

    return (
        <Flex
            gap={'middle'}
            style={{ width: '100%', maxWidth: 600 }}
            vertical
        >
            <Flex
                align='center'
                gap={'small'}
            >
                <Avatar
                    src={userProfile.picture}
                    size={'small'}
                />
                <Typography.Text strong>{`${userProfile.given_name} ${userProfile.family_name}`}</Typography.Text>
            </Flex>

            <Typography.Title level={5}>Account Details</Typography.Title>

            <Form
                form={form}
                {...layout}
                colon={false}

            >
                {/* <Form.Item
                name={'username'}
                label="Username"
            >
                <Input disabled />
            </Form.Item> */}
                {/* <Form.Item
                name={'name'}
                label="User name"
            >
                <Input />
            </Form.Item> */}
                <Flex align='center'>
                    <Form.Item
                        name={'email'}
                        label="Email"
                        style={{ margin: 0 }}
                    >
                        <Input
                            variant='borderless'
                            readOnly
                        />
                    </Form.Item>
                    <FAIcon
                        icon='check'
                        size='1rem'
                    />
                </Flex>

                <Form.Item label={' '}>
                    <Button
                        color='default'
                        variant='text'
                        icon={(
                            <FAIcon
                                icon='lock'
                                size='1rem'
                            />
                        )}
                    >Change password
                    </Button>
                </Form.Item>

            </Form>


            <Typography.Title level={5}>Auth providers</Typography.Title>

            <Flex
                gap={'4rem'}
                style={{ marginBottom: '2rem', marginTop: '2rem' }}
                vertical
            >
                <Card
                    title="Google connected"
                    extra={(
                        <Button icon={(
                            <FAIcon
                                icon='plus'
                                size='1rem'
                            />
                        )}
                        >Add another account
                        </Button>
                    )}
                >
                    <Flex
                        gap={'small'}
                        vertical
                    >
                        <Flex justify='space-between'>
                            <Typography.Text>congly1311@gmail.com</Typography.Text>
                            <Button
                                variant='text'
                                color='default'
                                icon={(
                                    <FAIcon
                                        icon='minus'
                                        size='1rem'
                                    />
                                )}
                            >Remove
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
            <Flex vertical>
                <Button
                    color='default'
                    variant='text'
                    style={{ justifyContent: 'flex-start' }}
                    icon={(
                        <FAIcon
                            icon='microsoft'
                            type='brands'
                            size='1rem'
                        />
                    )}
                >Connect microsoft
                </Button>

                <Button
                    color='default'
                    variant='text'
                    style={{ justifyContent: 'flex-start' }}
                    icon={(
                        <FAIcon
                            icon='apple'
                            type='brands'
                            size='1rem'
                        />
                    )}
                >Connect apple
                </Button>
            </Flex>

        </Flex>
    );
};
