import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(user && user?.email){
        return children;
    }
    else{
        return <Navigate to={'/auth/signin'} state={location.pathname}></Navigate>;
    }
};

export default PrivateRoute;