import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Spin } from 'antd';

type PaypalButtonsProps = {} & PayPalButtonsComponentProps;

export const PaypalButtons: React.FC<PaypalButtonsProps> = (props) =>
{
    const [{ isPending }] = usePayPalScriptReducer();

    console.log(isPending);

    return (
        <Spin
            tip="Loading"
            size="small"
            spinning={isPending}
            style={{ width: '100%' }}
            wrapperClassName='w-full'
        >
            <PayPalButtons
                {...props}
                style={{ layout: 'vertical' }}
                disabled={undefined}
                forceReRender={[{ layout: 'vertical' }]}
                fundingSource={undefined}
            />
        </Spin>
    );
};
