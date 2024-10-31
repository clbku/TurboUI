import { Button, Divider, Flex, Layout, Menu, MenuProps } from 'antd';

import { FAIcon } from '@repo/vicon';
import { useState } from 'react';

import './AppLayout.css';

type AdminLayoutProps = {
  logo?: any
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <FAIcon icon='user' />,
        // children: [
        //     { key: '1', label: 'Option 1' },
        //     { key: '2', label: 'Option 2' },
        //     { key: '3', label: 'Option 3' },
        //     { key: '4', label: 'Option 4' },
        // ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <FAIcon icon='user' />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <FAIcon icon='user' />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
];

export const AppLayout: React.FC<AdminLayoutProps> = () =>
{
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <Layout
                style={{ width: '100vw', height: '100vh' }}
                hasSider
            >
                <Flex
                    style={{ width: collapsed ? 64 : 256, justifyContent: 'flex-end' }}
                    className='sidebar'
                    vertical
                >
                    <Flex className="app-brand">
                        <img
                            src="https://picsum.photos/id/12/300/300"
                            style={{ width: 'auto', height: '100%', maxHeight: collapsed ? 48 : 64 }}
                        />
                    </Flex>
                    <Flex className='app-feature'>
                        <Menu
                            style={{ width: collapsed ? 64 : 256 }}
                            selectedKeys={['1']}
                            mode={collapsed ? 'vertical' : 'inline'}
                            items={items}
                        />
                    </Flex>
                    <Flex className='app-sub-feature'>
                        <Menu
                            selectedKeys={['1']}
                            mode="inline"
                            items={[{
                                key: 'sub1',
                                label: 'User',
                                icon: <FAIcon icon='user' />,
                            }]}
                        />
                    </Flex>
                    <Divider style={{ margin: '2px' }} />
                    <Flex className='app-collapse-button'>
                        <Button onClick={() => setCollapsed(!collapsed)}>
                            <FAIcon
                                icon={collapsed ? 'chevron-double-right' : 'chevron-double-left'}
                                size='1rem'
                            />
                        </Button>
                    </Flex>
                </Flex>
            </Layout>
        </>
    );
};
