import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '../types/user';
import { Spin } from 'antd';

type UserIdentityContextProps = {
    userProfile: UserProfile,
    isAuthorized: boolean,
    fetchUserProfile: () => Promise<void>
    updateUserProfile: (profile: UserProfile) => Promise<void>
    logout: () => Promise<void>
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
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get('/api/oauth/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUserProfile({ ...response.data });
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

    const logout = async () =>
    {
        try
        {
            await axios.post('/api/auth/logout');
            setUserProfile({} as UserProfile);
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
            const accessToken = localStorage.getItem('access_token');

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
            logout,
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

export function withAuthRedirect<T>(Component: T)
{
    return (props: any) =>
    {
        const { isAuthorized } = useUserIdentity();

        if (!isAuthorized)
        {
            window.location.href = '/sign-in';
            return null;
        }

        const ReactComponent = Component as any;

        return <ReactComponent {...props} />;
    };
}
