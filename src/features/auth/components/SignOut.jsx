import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

const SignOut = () => {

    const {signOutUser} = useContext(AuthContext);

    const handleSignOutUser = () => {
            signOutUser()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logout successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Logout unsuccessful!",
                    icon: "error",
                    draggable: true
                });
            })
        }

    return (
        <button onClick={handleSignOutUser} className='btn bg-primary hover:bg-secondary text-white'>Logout</button>
    );
};

export default SignOut;