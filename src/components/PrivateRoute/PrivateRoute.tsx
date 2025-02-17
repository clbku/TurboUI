import { PropsWithChildren } from 'react';
import { useUserIdentity } from '../../contexts/UserIdentity';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
    redirectPath?: string;
};

export const PrivateRoute: React.FC<PropsWithChildren<PrivateRouteProps>> = (props) =>
{
    const { redirectPath = '/sign-in' } = props;

    const { userProfile } = useUserIdentity();
    const location = useLocation();

    if (!userProfile || Object.keys(userProfile).length === 0)
    {
        return (
            <Navigate
                to={redirectPath}
                state={{ redirectTo: location }}
                replace
            />
        );
    }

    return (
        <>
            {props.children}
        </>
    );
};
