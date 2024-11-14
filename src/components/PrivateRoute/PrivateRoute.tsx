import { PropsWithChildren } from 'react';
import { useUserIdentity } from '../../contexts/UserIdentity';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC<PropsWithChildren<{}>> = (props) =>
{
    const { userProfile } = useUserIdentity();

    if (!userProfile || Object.keys(userProfile).length === 0)
    {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {props.children}
        </>
    );
};
