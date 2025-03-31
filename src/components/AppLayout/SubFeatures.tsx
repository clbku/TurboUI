import { FAIcon } from '@repo/vicon';
import { Avatar, Menu } from 'antd';

import { useTheme } from '../../contexts/Theme/Theme';
import { useUserIdentity } from '../../contexts/UserIdentity';

type SubFeaturesProps = {
    routes?: any[]
}

export const SubFeatures: React.FC<SubFeaturesProps> = (props) =>
{
    const { routes } = props;
    const { theme, toggleTheme } = useTheme();
    const { showProfilePopup, userProfile } = useUserIdentity();

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
        label: userProfile?.name || 'Account',
        icon: (
            userProfile?.picture
                ? (

                    <Avatar
                        size={'small'}
                        src={userProfile?.picture}
                    />
                )
                : (
                    <FAIcon
                        icon={'user'}
                        size={'1rem'}
                    />
                )

        ),
        onClick: () =>
        {
            showProfilePopup();
        },
    };

    return (
        <Menu
            mode="inline"
            style={{ border: 'none', flex: 'auto' }}
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
