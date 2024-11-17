import { FAIcon } from '@repo/vicon';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

import { UserIdentityContext } from '../../contexts/UserIdentity';
import { useTheme } from '../../contexts/Theme/Theme';

type SubFeaturesProps = {

}

export const SubFeatures: React.FC<SubFeaturesProps> = (props) =>
{
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    return (
        <Menu
            mode="inline"
            selectedKeys={['']}
            items={[
                // {
                //     key: 'setting',
                //     label: 'setting',
                //     icon: (
                //         <FAIcon
                //             icon='cog'
                //             size={'1rem'}
                //         />
                //     ),
                // },
                {
                    key: 'theme',
                    label: 'Theme',
                    icon: (
                        <FAIcon
                            icon={theme === 'dark' ? 'moon' : 'sun'}
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
            ]}
        />
    );
};
