import { useState, useEffect } from 'react';
import {
    PayPalScriptProvider,
    PayPalHostedFieldsProvider,
    PayPalHostedField,
} from '@paypal/react-paypal-js';
import { SubmitPayment } from './SubmitPayment';


// import './Payment.css';
import { Badge, Divider, Flex, List, Radio, Tabs, Tag, Typography } from 'antd';
import { CardInfo } from './methods/CardInfo';
import { FAIcon } from '@repo/vicon';
import { Paypal } from './methods/Paypal';

const subscriptionTypes = {
    monthly: {
        price: 5,
        discount: 0,
    },
    yearly: {
        price: 60,
        discount: 0.15,
    },
};


export const Payment: React.FC<{}> = () =>
{
    const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
    return (
        <Flex style={{ width: '1000px' }}>
            <Flex
                style={{ width: '50%' }}
                vertical
            >
                <Radio.Group
                    options={[
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'yearly', label: 'Yearly' },
                    ]}
                    defaultValue={plan}
                    optionType="button"
                    buttonStyle="solid"
                    block
                    onChange={(e) => setPlan(e.target.value)}
                />
                <Flex vertical>
                    <Typography.Title level={4}>Pro plan</Typography.Title>
                    <List>
                        <List.Item>
                            <List.Item.Meta title="Price" />
                            <div>{new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(subscriptionTypes[plan].price)}
                            </div>
                        </List.Item>
                        {subscriptionTypes[plan].discount > 0 && (
                            <List.Item>
                                <List.Item.Meta title={(
                                    <Flex gap={'small'}>
                                        <Typography.Text>Discount</Typography.Text>
                                        <Tag color='magenta'>
                                            {subscriptionTypes[plan].discount * 100}%
                                        </Tag>
                                    </Flex>
                                )}
                                />
                                <div>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(subscriptionTypes[plan].price * subscriptionTypes[plan].discount)}
                                </div>
                            </List.Item>
                        )}
                        <Divider
                            style={{ margin: '0.5rem' }}
                            dashed
                        />

                        <List.Item>
                            <List.Item.Meta title="Subtotal" />
                            <div>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(subscriptionTypes[plan].price * (1 - subscriptionTypes[plan].discount))}
                            </div>
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta title="Tax" />
                            <div>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(0)}
                            </div>
                        </List.Item>
                        <Divider
                            style={{ margin: '0.5rem' }}
                            dashed
                        />
                        <List.Item>
                            <List.Item.Meta title="Total" />
                            <div>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(subscriptionTypes[plan].price * (1 - subscriptionTypes[plan].discount))}
                            </div>
                        </List.Item>
                    </List>
                </Flex>
            </Flex>
            {/* <Flex style={{ width: '50%' }}>
                <Paypal />
            </Flex> */}
        </Flex>
    );
};
