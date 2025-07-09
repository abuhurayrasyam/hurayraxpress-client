import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            signOutUser()
                .then(() => {
                    navigate('/auth/signin')
                })
                .catch(() => {})
        }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;