import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Divider, Flex, Layout, Menu } from 'antd';
import { theme as antdTheme } from 'antd';


import { FAIcon } from '@repo/vicon';
import { useState } from 'react';

import './AppLayout.css';
import { AppLayoutRoute } from './types';
import { SubFeatures } from './SubFeatures';

type AppLayoutProps = {
  logo?: any;
  routes: AppLayoutRoute[];
  defaultRoute?: string;
  collapsed?: boolean;
  subFeaterRoute?: any[]
};

export const AppLayout: React.FC<AppLayoutProps> = (props) =>
{
    const { logo, routes, defaultRoute, subFeaterRoute } = props;

    const { useToken } = antdTheme;
    const { token: theme } = useToken();

    const [collapsed, setCollapsed] = useState(props.collapsed || false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(
        defaultRoute ? [defaultRoute] : [],
    );

    const navigate = useNavigate();

    const navigateTo = (path: string) =>
    {
        setSelectedKeys([path]);
        navigate(path);
    };

    return (
        <>
            <Layout
                style={{ width: '100vw', height: '100%' }}
                hasSider
            >
                <Flex
                    style={{ width: collapsed ? 64 : 256, justifyContent: 'flex-end', backgroundColor: theme?.colorBgContainer }}
                    className="sidebar"
                    vertical
                >
                    {logo && (
                        <>
                            <Flex className="app-brand">
                                <img
                                    src={logo}
                                    style={{
                                        width: 'auto',
                                        height: '100%',
                                        maxHeight: collapsed ? 48 : 64,
                                    }}
                                    onClick={() => navigateTo(defaultRoute || '')}
                                />
                            </Flex>
                            <Divider />
                        </>
                    )}
                    <Flex className="app-feature">
                        <Menu
                            mode={'inline'}
                            selectedKeys={selectedKeys}
                            style={{ border: 'none' }}
                            items={routes?.map((route) => ({
                                key: route.path,
                                label: route.label,
                                title: route.label,
                                icon: (
                                    <FAIcon
                                        icon={route.icon}
                                        size="1rem"
                                    />),
                                onClick: () => navigateTo(route.path),
                            }))}
                        />
                    </Flex>
                    <Flex className="app-sub-feature">
                        <SubFeatures routes={subFeaterRoute} />
                    </Flex>
                    <Divider style={{ margin: '2px' }} />
                    <Flex className="app-collapse-button">
                        <Button
                            variant='text'
                            color='default'
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <FAIcon
                                icon={
                                    collapsed ? 'chevron-double-right' : 'chevron-double-left'
                                }
                                size="1rem"
                            />
                        </Button>
                    </Flex>
                </Flex>
                <Divider
                    style={{ margin: 0, height: '100%' }}
                    type="vertical"
                />
                <Layout
                    className="app-content"
                    style={{ backgroundColor: theme?.colorBgContainer }}
                >
                    <Outlet />
                </Layout>
            </Layout>
        </>
    );
};
