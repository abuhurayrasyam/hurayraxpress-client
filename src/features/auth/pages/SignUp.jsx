import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import signUpAnimation from '../../../assets/lotties/signup-animation.json';
import PasswordInput from '../components/PasswordInput';
import { useForm } from 'react-hook-form';
import Logo from '../../../components/Logo';
import SignInWithGoogle from '../components/SignInWithGoogle';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const SignUp = () => {

    useDocumentTitle("HurayraXpress | SignUp");

    const {signUpUser, updateUserProfile} = useContext(AuthContext);

    const {register, handleSubmit, formState: {errors}} = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        signUpUser(data.email, data.password)
        .then(() => {
            updateUserProfile({displayName: data.name, photoURL: data.photo})
            .then(() => {
                navigate(`${location.state ? location.state : '/'}`);
                Swal.fire({
                    icon: "success",
                    title: "Your account has been created successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Failed to create account. Please try again!",
                    icon: "error",
                    draggable: true
                });
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            let message = "Something went wrong. Please try again.";
            if (errorCode === "auth/email-already-in-use") {
            message = "This email is already registered!";
            }
            Swal.fire({
            title: message,
            icon: "error",
            draggable: true
            });
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
         <div className="hero bg-base-200 min-h-screen py-10">
            <div className='w-11/12 mx-auto'>
                <div>
                    <Logo></Logo>
                </div>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie className='w-90' animationData={signUpAnimation} loop={true}></Lottie>
                    </div>
                    <div className="card bg-base-100 border border-gray-300 w-full max-w-sm shrink-0 shadow-sm pb-3">
                        <div className="card-body">
                            <h1 className="font-semibold text-secondary text-center text-xl">Create an account</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

                                <label className="label">Your Name</label>
                                <input type="text" {...register('name', {required: true, maxLength: 20})} className="input" placeholder="Enter your name" />
                                {
                                    errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Name is required</p>
                                }

                                <label className="label">Photo URL</label>
                                <input type="url" {...register('photo', {required: true})} className="input" placeholder="Enter your photo url" />
                                {
                                    errors.photo?.type === 'required' && <p className='text-red-500 font-semibold'>Photo url is required</p>
                                }

                                <label className="label">Email</label>
                                <input type="email" {...register('email', {required: true})} className="input" placeholder="Enter your email" />
                                {
                                    errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Email is required</p>
                                }

                                <label className="label">Password</label>
                                <PasswordInput {...register('password', {
                                    required: 'Password is required',
                                    validate: {
                                        hasUppercase: (value) =>
                                            /[A-Z]/.test(value) || 'Add at least one uppercase letter',
                                        hasLowercase: (value) =>
                                            /[a-z]/.test(value) || 'Add at least one lowercase letter',
                                        hasNumber: (value) =>
                                            /\d/.test(value) || 'Add at least one number',
                                        hasSpecialChar: (value) =>
                                            /[^A-Za-z0-9]/.test(value) || 'Add at least one special character',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    }
                                })}></PasswordInput>
                                {
                                    errors.password && <p className="text-red-500 font-semibold">{errors.password.message}</p>
                                }

                                <div className='flex items-center gap-1 mt-2'>
                                    <input type="checkbox" {...register('termsAndConditions', {required: true})} className="checkbox h-5 w-5" />
                                    <a className="link link-hover">Accept Terms & Conditions</a>
                                </div>
                                {
                                    errors.termsAndConditions?.type === 'required' && <p className='text-red-500 font-semibold'>You must accept the terms and conditions</p>
                                }

                                <input type="submit" className="btn btn-primary text-black border-dotted shadow-none border-gray-50 mt-4" value="Register" />
                            </form>
                            <h4 className="text-gray-500 text-center">Already Have an Account ? <Link to={'/auth/signin'} className="text-red-600">Login</Link></h4>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 border-t border-gray-400"></div>
                                <h4 className="text-gray-600 text-sm">Or</h4>
                                <div className="flex-1 border-t border-gray-400"></div>
                            </div>
                            <SignInWithGoogle></SignInWithGoogle>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;