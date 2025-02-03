import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '../types/user';
import { Spin } from 'antd';

type UserIdentityContextProps = {
    userProfile: UserProfile,
    isAuthorized: boolean,
    fetchUserProfile: () => Promise<void>
    updateUserProfile: (profile: UserProfile) => Promise<void>
}

export const UserIdentityContext = createContext<UserIdentityContextProps>({} as UserIdentityContextProps);

export const UserIdentityProvider: React.FC<React.PropsWithChildren<{storage: 'local' | 'cookie'}>> = (props) =>
{
    const { storage } = props;

    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);

    const fetchUserProfile = async () =>
    {
        try
        {
            const response = await axios.get('/api/users/profile');
            setUserProfile({ ...response.data.data });
        }
        catch (error: any)
        {
            console.log(error.message);
        }

        setLoading(false);
    };

    const updateUserProfile = async (profile: UserProfile) =>
    {
        try
        {
            const response = await axios.put('/api/users/profile', profile);
            setUserProfile({ ...response.data.data });
        }
        catch (error: any)
        {
            console.log(error.message);
        }
    };

    useEffect(() =>
    {
        if (storage === 'local')
        {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken)
            {
                fetchUserProfile();
            }
            else
            {
                setLoading(false);
            }
        }
        else if (storage === 'cookie')
        {
            fetchUserProfile();
        }
        else
        {
            setLoading(false);
        }

    }, []);

    if (loading)
    {
        return <Spin />;
    }

    return (
        <UserIdentityContext.Provider value={{
            isAuthorized: !!userProfile && Object.keys(userProfile).length > 0,
            userProfile,
            fetchUserProfile,
            updateUserProfile,
        }}
        >
            {props.children}
        </UserIdentityContext.Provider>
    );
};

export const useUserIdentity = (): UserIdentityContextProps =>
{
    return useContext(UserIdentityContext);
};

export const withAuthRedirect = (Component: React.FC): React.FC =>
{
    return () =>
    {
        const { isAuthorized } = useUserIdentity();

        if (!isAuthorized)
        {
            window.location.href = '/sign-in';
            return null;
        }

        return <Component />;
    };
};
