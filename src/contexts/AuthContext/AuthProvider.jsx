import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../../firebase/firebase.config';

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

     useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    },[])

    const authData = {
        user,
        setUser,
        loading,
        setLoading,
        signUpUser,
        updateUserProfile,
        signInUser,
        googleSignIn,
        signOutUser,
    };

    return (
        <AuthContext value={authData}>{children}</AuthContext>
    );
};

export default AuthProvider;