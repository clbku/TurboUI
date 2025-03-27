import { FAIcon } from '@repo/vicon';
import { Flex, Menu, Modal } from 'antd';
import React from 'react';
import { Account } from './Account';

type AccountSettingProps = {
    open: boolean;
    onClose: () => void;
}

export const AccountSetting: React.FC<AccountSettingProps> = (props) =>
{
    const { open, onClose } = props;

    const [selectedPage, setSelectedPage] = React.useState('account');

    const handleClose = () =>
    {
        onClose();
    };

    const renderPage = () =>
    {
        switch (selectedPage)
        {
            case 'account':
                return <Account />;
        }
    };

    return (
        <Modal
            open={open}
            style={{ maxWidth: '1000px' }}
            width={'70%'}
            title={'Profile'}
            onCancel={handleClose}
        >
            <Flex>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={[
                        {
                            key: 'account',
                            label: 'Account',
                            icon: (
                                <FAIcon
                                    icon='user'
                                    size='1rem'
                                />
                            ),
                        },
                    ]}
                    selectedKeys={[selectedPage]}
                    onClick={(e) => setSelectedPage(e.key)}
                />
                <Flex style={{ padding: '1rem', paddingTop: 0 }}>
                    {renderPage()}
                </Flex>
            </Flex>

        </Modal>
    );
};
