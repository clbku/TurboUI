import { FAIcon } from '@repo/vicon';
import { Menu } from 'antd';
import { UserIdentityContext } from '../../contexts/UserIdentity';

type SubFeaturesProps = {

}

export const SubFeatures: React.FC<SubFeaturesProps> = (props) =>
{
    return (
        <Menu
            mode="inline"
            selectedKeys={['']}
            items={[
                {
                    key: 'setting',
                    label: 'setting',
                    icon: (
                        <FAIcon
                            icon='cog'
                            size={'1rem'}
                        />
                    ),
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
                    onClick: () => {},
                },
            ]}
        />
    );
};
