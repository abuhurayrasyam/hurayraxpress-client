import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import signInAnimation from '../../../assets/lotties/signin-animation.json';
import Logo from '../../../components/Logo';
import Lottie from 'lottie-react';
import PasswordInput from '../components/PasswordInput';
import { Link, useLocation, useNavigate } from 'react-router';
import SignInWithGoogle from '../components/SignInWithGoogle';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const SignIn = () => {

    useDocumentTitle("HurayraXpress | SignIn");

    const {signInUser} = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        clearErrors();

        signInUser(data.email, data.password)
        .then(() => {
            navigate(`${location.state ? location.state : '/'}`);
            Swal.fire({
                icon: "success",
                title: "Welcome! You’ve logged in successfully.",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch((error) => {
            const errorCode = error.code;

            let message = "Login failed. Please try again.";

            if (errorCode === 'auth/user-not-found') {
                message = 'No account found with this email.';
            } else if (errorCode === 'auth/wrong-password') {
                message = 'Incorrect password.';
            } else if (errorCode === 'auth/too-many-requests') {
                message = 'Too many failed attempts. Please try again later.';
            }

            Swal.fire({
                icon: "error",
                title: message,
                confirmButtonText: "OK",
                confirmButtonColor: "#d33"
            });
        })
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div className="hero bg-base-200 min-h-screen py-10">
            <div className='w-11/12 mx-auto'>
                <div>
                    <Logo />
                </div>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie className='w-90' animationData={signInAnimation} loop={true} />
                    </div>
                    <div className="card bg-base-100 border border-gray-300 w-full max-w-sm shrink-0 shadow-sm pb-3">
                        <div className="card-body">
                            <h1 className="font-semibold text-secondary text-center text-xl">Login Your Account</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="input"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className='text-red-500 font-semibold'>{errors.email.message}</p>}

                                <label className="label">Password</label>
                                <PasswordInput
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className="text-red-500 font-semibold">{errors.password.message}</p>}

                                <div className='flex items-center gap-1 mt-2'>
                                    <a className="link link-hover">Forgot password?</a>
                                </div>

                                <input type="submit" className="btn btn-primary text-black border-dotted shadow-none border-gray-50 mt-4" value="Login" />
                            </form>

                            <h4 className="text-gray-500 text-center">Don't Have An Account ? <Link to={'/auth/signup'} className="text-red-600">Register</Link></h4>

                            <div className="flex items-center gap-2">
                                <div className="flex-1 border-t border-gray-400"></div>
                                <h4 className="text-gray-600 text-sm">Or</h4>
                                <div className="flex-1 border-t border-gray-400"></div>
                            </div>

                            <SignInWithGoogle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;