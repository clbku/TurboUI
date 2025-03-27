import { FAIcon } from '@repo/vicon';
import { Avatar, Menu, Typography } from 'antd';

import { UserIdentityContext, useUserIdentity } from '../../contexts/UserIdentity';
import { useTheme } from '../../contexts/Theme/Theme';

type SubFeaturesProps = {
    routes?: any[]
}

export const SubFeatures: React.FC<SubFeaturesProps> = (props) =>
{
    const { routes } = props;
    const { theme, toggleTheme } = useTheme();
    const { showProfilePopup } = useUserIdentity();

    const themeRoute = {
        key: 'theme',
        label: 'Theme',
        icon: (
            <FAIcon
                icon={theme === 'dark' ? 'moon' : (theme === 'light' ? 'sun' : 'adjust')}
                size={'1rem'}
            />
        ),
        onClick: toggleTheme,
    };

    const userRoute = {
        key: 'user',
        label: (
            <UserIdentityContext.Consumer>
                {
                    ({ userProfile }) => (
                        <Typography.Text style={{ paddingLeft: '0.5rem' }}>
                            {userProfile?.name || 'Account'}
                        </Typography.Text>
                    )
                }
            </UserIdentityContext.Consumer>
        ),
        icon: (
            <UserIdentityContext.Consumer>
                {
                    ({ userProfile }) => (
                        userProfile.picture
                            ? (
                                <Avatar
                                    src={userProfile.picture}
                                    size={'small'}
                                />
                            )
                            : (
                                <FAIcon
                                    icon={'user'}
                                    size={'1rem'}
                                />
                            )
                    )
                }
            </UserIdentityContext.Consumer>

        ),
        onClick: () =>
        {
            showProfilePopup();
        },
    };

    return (
        <Menu
            mode="inline"
            style={{ border: 'none' }}
            selectedKeys={['']}
            items={routes?.map(route =>
            {
                if (typeof route === 'string')
                {
                    if (route === 'builtin:theme')
                    {
                        return themeRoute;
                    }
                    if (route === 'builtin:user')
                    {
                        return userRoute;
                    }
                }

                return {
                    key: route.key,
                    label: route.label,
                    icon: route.icon,
                    onClick: route.onClick,
                };
            })}
        />
    );
};
