import { FAIcon } from '@repo/vicon';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

import { UserIdentityContext } from '../../contexts/UserIdentity';
import { useTheme } from '../../contexts/Theme/Theme';

type SubFeaturesProps = {
    routes?: any[]
}

export const SubFeatures: React.FC<SubFeaturesProps> = (props) =>
{
    const { routes } = props;
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const defaultRoute = [
        {
            key: 'theme',
            label: 'Theme',
            icon: (
                <FAIcon
                    icon={theme === 'dark' ? 'moon' : (theme === 'light' ? 'sun' : 'adjust')}
                    size={'1rem'}
                />
            ),
            onClick: toggleTheme,
        },
        {
            key: 'user',
            label: (
                <UserIdentityContext.Consumer>
                    {
                        ({ userProfile }) => (
                            userProfile?.username || 'Account'
                        )
                    }
                </UserIdentityContext.Consumer>
            ),
            icon: (
                <FAIcon
                    icon='user-circle'
                    size={'1rem'}
                />
            ),
            onClick: () =>
            {
                navigate('/user/profile');
            },
        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={['']}
            items={[...(routes || []), ...defaultRoute]}
        />
    );
};
