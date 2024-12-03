import { usePayPalHostedFields } from '@paypal/react-paypal-js';
import { useRef, useState } from 'react';

type SubmitPaymentProps = {
    customStyle: any;
};

export const SubmitPayment: React.FC<SubmitPaymentProps> = (props) =>
{
    const { customStyle } = props;

    const [paying, setPaying] = useState(false);
    const cardHolderName = useRef(null);
    const hostedField = usePayPalHostedFields();

    const handleClick = () =>
    {
        if (!hostedField?.cardFields)
        {
            const childErrorMessage = 'Unable to find any child components in the <PayPalHostedFieldsProvider />';

            action(ERROR)(childErrorMessage);
            throw new Error(childErrorMessage);
        }
        const isFormInvalid =
                Object.values(hostedField.cardFields.getState().fields).some(
                    (field) => !field.isValid,
                ) || !cardHolderName?.current?.value;

        if (isFormInvalid)
        {
            return alert(
                'The payment form is invalid',
            );
        }
        setPaying(true);
        hostedField.cardFields
            .submit({
                cardholderName: cardHolderName?.current?.value,
            })
            .then((data) =>
            {
                // Your logic to capture the transaction
                fetch('url_to_capture_transaction', {
                    method: 'POST',
                })
                    .then((response) => response.json())
                    .then((data) =>
                    {
                        // Here use the captured info
                    })
                    .catch((err) =>
                    {
                        // Here handle error
                    })
                    .finally(() =>
                    {
                        setPaying(false);
                    });
            })
            .catch((err) =>
            {
                // Here handle error
                setPaying(false);
            });
    };

    return (
        <>
            <label title="This represents the full name as shown in the card">
                    Card Holder Name
                <input
                    ref={cardHolderName}
                    id="card-holder"
                    className="card-field"
                    style={{ ...customStyle, outline: 'none' }}
                    type="text"
                    placeholder="Full name"
                />
            </label>
            <button
                className={`btn${paying ? '' : ' btn-primary'}`}
                style={{ float: 'right' }}
                onClick={handleClick}
            >
                {paying ? <div className="spinner tiny" /> : 'Pay'}
            </button>
        </>
    );
};
