import {
    PayPalScriptProvider,
} from '@paypal/react-paypal-js';
import { Flex, Spin } from 'antd';
import { PaypalButtons } from './PaypalButtons';

type PaypalProps = {
    onSubscription: (subscriptionId: string) => void;
    onApprove: (data: any) => void;
}

function createOrder()
{
    // replace this url with your server
    return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
            cart: [
                {
                    sku: '1blwyeo8',
                    quantity: 2,
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then((order) =>
        {
            // Your code here after create the order
            return order.id;
        });
}

function onApprove(data)
{
    // replace this url with your server
    return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderID: data.orderID,
        }),
    })
        .then((response) => response.json())
        .then((orderData) =>
        {
            // Your code here after capture the order
        });
}

export const Paypal: React.FC<PaypalProps> = (props) =>
{
    return (
        <Flex style={{ width: '100%' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <PaypalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </Flex>
    );
};
