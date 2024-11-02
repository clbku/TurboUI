import { createBrowserRouter, Outlet, useNavigate } from 'react-router-dom';
import { Button, Divider, Flex, Layout, Menu, MenuProps, MenuRef } from 'antd';

import { FAIcon } from '@repo/vicon';
import { useEffect, useMemo, useRef, useState } from 'react';

import './AppLayout.css';
import { AppLayoutRoute } from './types';
import { Link } from 'react-router-dom';

type AppLayoutProps = {
    logo?: any
    routes: AppLayoutRoute[]
    defaultRoute?: string
}

export const AppLayout: React.FC<AppLayoutProps> = (props) =>
{
    const { logo, routes, defaultRoute } = props;

    const [collapsed, setCollapsed] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultRoute ? [defaultRoute] : []);

    const navigate = useNavigate();

    useEffect(() => {
        defaultRoute && navigate(defaultRoute, {replace: true});
    }, [])

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
                    {logo && (
                        <Flex className="app-brand">
                            <img
                                src={logo}
                                style={{ width: 'auto', height: '100%', maxHeight: collapsed ? 48 : 64 }}
                            />
                        </Flex>
                    )}
                    <Flex className='app-feature'>
                        <Menu
                            mode={'inline'}
                            selectedKeys={[defaultRoute || '']}
                            items={routes?.map((route) =>
                                ({
                                    key: route.path,
                                    label: route.label,
                                    title: route.label,
                                    icon: (
                                        <FAIcon
                                            icon={route.icon}
                                            size="1rem"
                                        />
                                    ),
                                    onClick: () => navigate(route.path),
                                }),
                            )}
                        />
                    </Flex>
                    <Flex
                        className='app-sub-feature'
                    >
                        <Menu
                            mode="inline"
                            selectedKeys={[""]}
                            items={[{
                                key: 'setting',
                                label: "Setting",
                                icon: <FAIcon icon='cog' size={"1rem"}/>,
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
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Outlet />
                </Layout>
            </Layout>
        </>
    );
};
