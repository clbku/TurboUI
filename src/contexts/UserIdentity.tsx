import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '../types/user';

type UserIdentityContextProps = {
    userProfile: UserProfile
}

export const UserIdentityContext = createContext<UserIdentityContextProps>({} as UserIdentityContextProps);

export const UserIdentityProvider: React.FC<React.PropsWithChildren<{storage: 'local'}>> = (props) =>
{
    const { storage } = props;

    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);

    const fetchUserProfile = async () =>
    {
        const response = await axios.get('/api/users/profile');
        setUserProfile(response.data.data);
    };

    useEffect(() =>
    {
        if (storage === 'local')
        {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken)
            {
                axios.interceptors.request.use(function (config)
                {
                    config.headers.Authorization = 'bearer ' + accessToken;
                    return config;
                });

                fetchUserProfile();
            }
        }
    }, []);

    return (
        <UserIdentityContext.Provider value={{ userProfile }}>
            {props.children}
        </UserIdentityContext.Provider>
    );
};

export const useUserIdentity = (): UserIdentityContextProps =>
{
    return useContext(UserIdentityContext);
};
