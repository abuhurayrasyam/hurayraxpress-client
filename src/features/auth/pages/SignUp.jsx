import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';

const SignUp = () => {

    useDocumentTitle("HurayraXpress | SignUp");

    const {signUpUser, updateUserProfile} = useContext(AuthContext);

    const {register, handleSubmit, formState: {errors}} = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);
    const maxFileSize = 500 * 1024;

    const onSubmit = (data) => {
        signUpUser(data.email, data.password)
        .then(() => {
            const formData = new FormData();
            formData.append("image", data.photo[0]);

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                const imageUrl = response.data.imageUrl;
                return updateUserProfile({ displayName: data.name, photoURL: imageUrl })
                .then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        image: imageUrl,
                        termsAccepted: data.termsAndConditions === true,
                        role: 'user',
                        created_at: new Date().toISOString(),
                        last_sign_in: new Date().toISOString()
                    };

                    return axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userInfo);
                });
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Your account has been created successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate(location.state ? location.state : "/");
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
            });
        });
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

                                <div className="w-full flex justify-center mt-3">
                                    <div className="w-25 h-25 border border-dashed border-neutral rounded-lg flex items-center justify-center relative overflow-hidden bg-white">
                                        {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="object-cover w-full h-full"
                                        />
                                        ) : (
                                        <span className="text-neutral text-sm text-center">
                                            Select Image <br />
                                            Max 500KB
                                        </span>
                                        )}
                                        <input
                                        type="file"
                                        accept="image/*"
                                        {...register('photo', {
                                            required: 'Profile image is required',
                                            validate: {
                                            lessThan500KB: (files) =>
                                                files[0]?.size < maxFileSize || 'Image must be smaller than 500KB',
                                            acceptedFormats: (files) =>
                                                ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) ||
                                                'Only JPG, PNG, or JPEG images are allowed',
                                            }
                                        })}
                                        className="absolute opacity-0 inset-0 cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file && file.size < maxFileSize) {
                                            setPreview(URL.createObjectURL(file));
                                            } else {
                                            setPreview(null);
                                            }
                                        }}
                                        />
                                    </div>
                                </div>
                                {errors.photo && (
                                    <p className="text-red-500 font-semibold mt-2 text-center">{errors.photo.message}</p>
                                )}
                                <label className="label font-semibold text-center block w-full">Profile Image (Max 500KB)</label>


                                <label className="label">Your Name</label>
                                <input type="text" {...register('name', {required: true, maxLength: 20})} className="input" placeholder="Enter your name" />
                                {
                                    errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Name is required</p>
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