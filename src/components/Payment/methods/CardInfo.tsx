import { Flex, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { InputMask } from '../../InputMask/InputMask';
import { FAIcon } from '@repo/vicon';
import { PayPalHostedField, PayPalHostedFieldsProvider, PayPalScriptProvider } from '@paypal/react-paypal-js';

const CUSTOM_FIELD_STYLE = {
    'box-sizing': 'border-box',
    margin: 0,
    padding: '4px 11px',
    color: 'rgba(0, 0, 0, 0.88)',
    'font-size': '14px',
    'line-height': '1.5715',
    'list-style': 'none',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    'min-width': '0',
    'border-radius': '6px',
    background: '#ffffff',
    'border-width': '1px',
    'border-style': 'solid',
    'border-color': '#d9d9d9',
    height: '32px',
};
const INVALID_COLOR = {
    color: '#dc3545',
};

type CardInfoProps = {
};

const CardMasks = [
    {
        mask: '0000 0000 0000 0000',
        regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
        cardtype: 'cc-mastercard',
    },
    {
        mask: '0000 0000 0000 0000',
        regex: '^4\\d{0,15}',
        cardtype: 'cc-visa',
    },
];

export const CardInfo: React.FC<CardInfoProps> = (props) =>
{
    const [clientToken, setClientToken] = useState(null);

    useEffect(() =>
    {
        (async () =>
        {
            const response = await (
                await fetch(
                    'https://react-paypal-js-storybook.fly.dev/api/paypal/generate-client-token',
                    { method: 'POST' },
                )
            ).json();
            setClientToken(response?.client_token || response?.clientToken);
        })();
    }, []);

    // return (
    //     <>
    //         {clientToken
    //             ? (
    //                 <PayPalScriptProvider
    //                     options={{
    //                         clientId:
    // 						'AduyjUJ0A7urUcWtGCTjanhRBSzOSn9_GKUzxWDnf51YaV1eZNA0ZAFhebIV_Eq-daemeI7dH05KjLWm',
    //                         components: 'buttons,hosted-fields',
    //                         dataClientToken: clientToken,
    //                         intent: 'capture',
    //                         vault: false,
    //                     }}
    //                 >
    //                     <PayPalHostedFieldsProvider
    //                         styles={{ '.valid': { 'color': '#28a745' }, '.invalid': { 'color': '#dc3545' }, 'input': { 'font-family': 'monospace', 'font-size': '16px' } }}
    //                         createOrder={function ()
    //                         {
    //                             return fetch(
    //                                 'your_custom_server_to_create_orders',
    //                                 {
    //                                     method: 'POST',
    //                                     headers: {
    //                                         'Content-Type': 'application/json',
    //                                     },
    //                                     body: JSON.stringify({
    //                                         purchase_units: [
    //                                             {
    //                                                 amount: {
    //                                                     value: '2', // Here change the amount if needed
    //                                                     currency_code: 'USD', // Here change the currency if needed
    //                                                 },
    //                                             },
    //                                         ],
    //                                         intent: 'capture',
    //                                     }),
    //                                 },
    //                             )
    //                                 .then((response) => response.json())
    //                                 .then((order) =>
    //                                 {
    //                                 // Your code here after create the order
    //                                     return order.id;
    //                                 })
    //                                 .catch((err) =>
    //                                 {
    //                                     alert(err);
    //                                 });
    //                         }}
    //                     >
    //                         <label htmlFor="card-number">
    //                         Card Number
    //                             <span style={INVALID_COLOR}>*</span>
    //                         </label>
    //                         <PayPalHostedField
    //                             id="card-number"
    //                             className="card-field"
    //                             style={CUSTOM_FIELD_STYLE}
    //                             hostedFieldType="number"
    //                             options={{
    //                                 selector: '#card-number',
    //                                 placeholder: '4111 1111 1111 1111',
    //                             }}
    //                         />
    //                         <label htmlFor="cvv">
    //                         CVV<span style={INVALID_COLOR}>*</span>
    //                         </label>
    //                         <PayPalHostedField
    //                             id="cvv"
    //                             className="card-field"
    //                             style={CUSTOM_FIELD_STYLE}
    //                             hostedFieldType="cvv"
    //                             options={{
    //                                 selector: '#cvv',
    //                                 placeholder: '123',
    //                                 maskInput: true,
    //                             }}
    //                         />
    //                         <label htmlFor="expiration-date">
    //                         Expiration Date
    //                             <span style={INVALID_COLOR}>*</span>
    //                         </label>
    //                         <PayPalHostedField
    //                             id="expiration-date"
    //                             className="card-field"
    //                             style={CUSTOM_FIELD_STYLE}
    //                             hostedFieldType="expirationDate"
    //                             options={{
    //                                 selector: '#expiration-date',
    //                                 placeholder: 'MM/YYYY',
    //                             }}
    //                         />
    //                         <SubmitPayment customStyle={{ 'border': '1px solid #606060', 'boxShadow': '2px 2px 10px 2px rgba(0,0,0,0.1)' }} />
    //                     </PayPalHostedFieldsProvider>
    //                 </PayPalScriptProvider>
    //             )
    //             : (
    //                 <h1>Loading token...</h1>
    //             )}
    //     </>
    // );

    const [cardType, setCardType] = useState<string | undefined>(undefined);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleCardNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    {
        if (cardRef.current && cardRef.current.querySelector('#svgnumber'))
        {
            cardRef.current.querySelector('#svgnumber')!.innerHTML = e.currentTarget.value;
        }
    };

    const handleCardHolderNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    {
        if (cardRef.current && cardRef.current.querySelector('#svgname'))
        {
            cardRef.current.querySelector('#svgname')!.innerHTML = e.currentTarget.value;
        }
    };

    const handleExpirationDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    {
        if (cardRef.current && cardRef.current.querySelector('#svgexpire'))
        {
            cardRef.current.querySelector('#svgexpire')!.innerHTML = e.currentTarget.value;
        }
    };

    const handleSecurityCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    {
        if (cardRef.current && cardRef.current.querySelector('#svgsecurity'))
        {
            cardRef.current.querySelector('#svgsecurity')!.innerHTML = e.currentTarget.value;
        }
    };

    if (!clientToken) {return <h1>Loading token...</h1>;}

    return (
        <PayPalScriptProvider
            options={{
                clientId: 'AduyjUJ0A7urUcWtGCTjanhRBSzOSn9_GKUzxWDnf51YaV1eZNA0ZAFhebIV_Eq-daemeI7dH05KjLWm',
                components: 'buttons,hosted-fields',
                dataClientToken: clientToken,
                intent: 'capture',
                vault: false,
            }}
        >
            <PayPalHostedFieldsProvider
                styles={{ '.valid': { 'color': '#28a745' }, '.invalid': { 'color': '#dc3545' }, 'input': { 'font-family': 'monospace', 'font-size': '16px' } }}
                createOrder={function ()
                {
                    return fetch(
                        'your_custom_server_to_create_orders',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: '2', // Here change the amount if needed
                                            currency_code: 'USD', // Here change the currency if needed
                                        },
                                    },
                                ],
                                intent: 'capture',
                            }),
                        },
                    )
                        .then((response) => response.json())
                        .then((order) =>
                        {
                            // Your code here after create the order
                            return order.id;
                        })
                        .catch((err) =>
                        {
                            alert(err);
                        });
                }}
            >
                <Flex vertical>
                    <div className="container preload">
                        <div
                            ref={cardRef}
                            className="creditcard"
                        >
                            <div
                                ref={cardRef}
                                className="front"
                            >
                                <div id="ccsingle" />
                                <svg
                                    version="1.1"
                                    id="cardfront"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    xmlSpace='preserve'
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 750 471"
                                >
                                    <g id="Front">
                                        <g id="CardBackground">
                                            <g id="Page-1_1_">
                                                <g id="amex_1_">
                                                    <path
                                                        id="Rectangle-1_1_"
                                                        className="lightcolor grey"
                                                        d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                                    C0,17.9,17.9,0,40,0z"
                                                    />
                                                </g>
                                            </g>
                                            <path
                                                className="darkcolor greydark"
                                                d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
                                            />
                                        </g>
                                        <text
                                            transform="matrix(1 0 0 1 60.106 295.0121)"
                                            id="svgnumber"
                                            className="st2 st3 st4"
                                        >
                                    0123 4567 8910 1112
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 54.1064 428.1723)"
                                            id="svgname"
                                            className="st2 st5 st6"
                                        >JOHN DOE
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 54.1074 389.8793)"
                                            className="st7 st5 st8"
                                        >cardholder name
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 479.7754 388.8793)"
                                            className="st7 st5 st8"
                                        >expiration
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 65.1054 241.5)"
                                            className="st7 st5 st8"
                                        >card number
                                        </text>
                                        <g>
                                            <text
                                                transform="matrix(1 0 0 1 574.4219 433.8095)"
                                                id="svgexpire"
                                                className="st2 st5 st9"
                                            >01/23
                                            </text>
                                            <text
                                                transform="matrix(1 0 0 1 479.3848 417.0097)"
                                                className="st2 st10 st11"
                                            >VALID
                                            </text>
                                            <text
                                                transform="matrix(1 0 0 1 479.3848 435.6762)"
                                                className="st2 st10 st11"
                                            >THRU
                                            </text>
                                            <polygon
                                                className="st2"
                                                points="554.5,421 540.4,414.2 540.4,427.9 		"
                                            />
                                        </g>
                                        <g id="cchip">
                                            <g>
                                                <path
                                                    className="st2"
                                                    d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                                c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
                                                />
                                            </g>
                                            <g>
                                                <g>
                                                    <rect
                                                        x="82"
                                                        y="70"
                                                        className="st12"
                                                        width="1.5"
                                                        height="60"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="167.4"
                                                        y="70"
                                                        className="st12"
                                                        width="1.5"
                                                        height="60"
                                                    />
                                                </g>
                                                <g>
                                                    <path
                                                        className="st12"
                                                        d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                                    c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                                    C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                                    c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                                    c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="82.8"
                                                        y="82.1"
                                                        className="st12"
                                                        width="25.8"
                                                        height="1.5"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="82.8"
                                                        y="117.9"
                                                        className="st12"
                                                        width="26.1"
                                                        height="1.5"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="142.4"
                                                        y="82.1"
                                                        className="st12"
                                                        width="25.8"
                                                        height="1.5"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="142"
                                                        y="117.9"
                                                        className="st12"
                                                        width="26.2"
                                                        height="1.5"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <g id="Back" />
                                </svg>
                            </div>
                            <div className="back">
                                <svg
                                    version="1.1"
                                    id="cardback"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 750 471"
                                    xmlSpace="preserve"
                                >
                                    <g id="Front">
                                        <line
                                            className="st0"
                                            x1="35.3"
                                            y1="10.4"
                                            x2="36.7"
                                            y2="11"
                                        />
                                    </g>
                                    <g id="Back">
                                        <g id="Page-1_2_">
                                            <g id="amex_2_">
                                                <path
                                                    id="Rectangle-1_2_"
                                                    className="darkcolor greydark"
                                                    d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                                C0,17.9,17.9,0,40,0z"
                                                />
                                            </g>
                                        </g>
                                        <rect
                                            y="61.6"
                                            className="st2"
                                            width="750"
                                            height="78"
                                        />
                                        <g>
                                            <path
                                                className="st3"
                                                d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
                            C707.1,246.4,704.4,249.1,701.1,249.1z"
                                            />
                                            <rect
                                                x="42.9"
                                                y="198.6"
                                                className="st4"
                                                width="664.1"
                                                height="10.5"
                                            />
                                            <rect
                                                x="42.9"
                                                y="224.5"
                                                className="st4"
                                                width="664.1"
                                                height="10.5"
                                            />
                                            <path
                                                className="st5"
                                                d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
                                            />
                                        </g>
                                        <text
                                            transform="matrix(1 0 0 1 621.999 227.2734)"
                                            id="svgsecurity"
                                            className="st6 st7"
                                        >985
                                        </text>
                                        <g className="st8">
                                            <text
                                                transform="matrix(1 0 0 1 518.083 280.0879)"
                                                className="st9 st6 st10"
                                            >security code
                                            </text>
                                        </g>
                                        <rect
                                            x="58.1"
                                            y="378.6"
                                            className="st11"
                                            width="375.5"
                                            height="13.5"
                                        />
                                        <rect
                                            x="58.1"
                                            y="405.6"
                                            className="st11"
                                            width="421.7"
                                            height="13.5"
                                        />
                                        <text
                                            transform="matrix(1 0 0 1 59.5073 228.6099)"
                                            id="svgnameback"
                                            className="st12 st13"
                                        >John Doe
                                        </text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <Flex
                        gap={'small'}
                        vertical
                    >
                        {/* <Flex vertical>
                            <label htmlFor="name">Name</label>
                            <Input
                                id="name"
                                maxLength={20}
                                type="text"
                                style={{ textTransform: 'uppercase' }}
                                onChange={handleCardHolderNameChange}
                                onFocus={() => cardRef.current?.classList.remove('flipped')}
                            />
                        </Flex>
                        <Flex vertical>
                            <label htmlFor="cardnumber">Card Number</label>
                            <Flex
                                align='center'
                                gap={'small'}
                            >
                                <InputMask
                                    id="cardnumber"
                                    masks={CardMasks}
                                    onChange={handleCardNumberChange}
                                    onMatch={(mask) =>
                                    {
                                        mask && setCardType(mask.cardtype);
                                    }}
                                    onFocus={() => cardRef.current?.classList.remove('flipped')}
                                />
                                {cardType && (
                                    <FAIcon
                                        icon={cardType}
                                        size='2rem'
                                        type='brands'
                                    />
                                )}
                            </Flex>
                        </Flex>
                        <Flex gap={'small'}>
                            <Flex vertical>
                                <label htmlFor="expirationdate">Expiration (mm/yy)</label>
                                <Input
                                    id="expirationdate"
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    onChange={handleExpirationDateChange}
                                    onFocus={() => cardRef.current?.classList.remove('flipped')}
                                />
                            </Flex>
                            <Flex vertical>
                                <label htmlFor="securitycode">Security Code</label>
                                <Input
                                    id="securitycode"
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    onChange={handleSecurityCodeChange}
                                    onFocus={() => cardRef.current?.classList.add('flipped')}
                                />
                            </Flex>
                        </Flex> */}

                        {/* <Flex gap={'small'}>
                            <Flex vertical>
                                <label htmlFor="expirationdate">Expiration (mm/yy)</label>
                                <Input
                                    id="expirationdate"
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    onChange={handleExpirationDateChange}
                                    onFocus={() => cardRef.current?.classList.remove('flipped')}
                                />
                            </Flex>
                            <Flex vertical>
                                <label htmlFor="securitycode">Security Code</label>
                                <Input
                                    id="securitycode"
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    onChange={handleSecurityCodeChange}
                                    onFocus={() => cardRef.current?.classList.add('flipped')}
                                />
                            </Flex>
                        </Flex> */}

                        <Flex vertical>
                            <label htmlFor="card-holder">Card holder</label>
                            <Input
                                id="card-holder"
                                style={{ textTransform: 'uppercase' }}
                                onChange={handleCardHolderNameChange}
                            />
                        </Flex>

                        <Flex vertical>
                            <label htmlFor="card-number">Card Number</label>
                            <PayPalHostedField
                                id="card-number"
                                className="card-field"
                                style={CUSTOM_FIELD_STYLE}
                                hostedFieldType="number"
                                options={{
                                    selector: '#card-number',
                                    placeholder: '4111 1111 1111 1111',
                                    maxlength: 16,
                                }}
                            />
                        </Flex>

                        <Flex gap={'small'}>
                            <Flex vertical>
                                <label htmlFor="cvv">CVV</label>
                                <PayPalHostedField
                                    id="cvv"
                                    className="card-field"
                                    style={CUSTOM_FIELD_STYLE}
                                    hostedFieldType="cvv"
                                    options={{
                                        selector: '#cvv',
                                        placeholder: '123',
                                        maskInput: true,
                                    }}
                                />
                            </Flex>
                            <Flex vertical>
                                <label htmlFor="expiration-date">
                            Expiration Date
                                    <span style={INVALID_COLOR}>*</span>
                                </label>
                                <PayPalHostedField
                                    id="expiration-date"
                                    className="card-field"
                                    style={CUSTOM_FIELD_STYLE}
                                    hostedFieldType="expirationDate"
                                    options={{
                                        selector: '#expiration-date',
                                        placeholder: 'MM/YYYY',
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </PayPalHostedFieldsProvider>
        </PayPalScriptProvider>
    );
};
