import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SignInWithGoogle = () => {

    const {googleSignIn} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(() => {
            navigate(`${location.state ? location.state : "/"}`)
            Swal.fire({
                icon: "success",
                title: "You have signed in with Google successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(() => {
            Swal.fire({
                title: "Google sign-in failed. Please try again or use another account!",
                icon: "error",
                draggable: true
            });
        })
    }

    return (
        <button onClick={handleGoogleSignIn} className="btn btn-outline mt-1"><FcGoogle className="text-xl" />Continue with Google</button>
    );
};

export default SignInWithGoogle;