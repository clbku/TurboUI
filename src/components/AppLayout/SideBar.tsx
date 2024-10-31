import { useState } from 'react';
import { Flex, MenuProps, MenuTheme } from 'antd';
import { Menu, Layout } from 'antd';

import { FAIcon } from '@repo/vicon';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <FAIcon icon='user' />,
        children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
        ],
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

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
};

export const SideBar = () =>
{
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Sider
            collapsed={collapsed}
            width={256}
            style={siderStyle}
            trigger={null}
            collapsible
            onCollapse={(value) => setCollapsed(value)}
        >
            <Flex
                justify={'center'}
                style={{ padding: '0.5rem' }}
            />
            <Menu
                style={{ ...!collapsed && { width: 256 } }}
                defaultOpenKeys={['sub1']}
                selectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    );
};
