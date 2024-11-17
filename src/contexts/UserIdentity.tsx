import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '../types/user';
import { Spin } from 'antd';

type UserIdentityContextProps = {
    userProfile: UserProfile
    fetchUserProfile: () => Promise<void>
}

export const UserIdentityContext = createContext<UserIdentityContextProps>({} as UserIdentityContextProps);

export const UserIdentityProvider: React.FC<React.PropsWithChildren<{storage: 'local'}>> = (props) =>
{
    const { storage } = props;

    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);

    const fetchUserProfile = async () =>
    {
        const response = await axios.get('/api/users/profile');
        setUserProfile(response.data.data);
        setLoading(false);
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
        <UserIdentityContext.Provider value={{ userProfile, fetchUserProfile }}>
            {props.children}
        </UserIdentityContext.Provider>
    );
};

export const useUserIdentity = (): UserIdentityContextProps =>
{
    return useContext(UserIdentityContext);
};
