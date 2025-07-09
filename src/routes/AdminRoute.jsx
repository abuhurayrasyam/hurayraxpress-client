import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>;
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;