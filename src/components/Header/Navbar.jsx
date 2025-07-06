import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import SignOut from '../../features/auth/components/SignOut';

const Navbar = () => {

    const {user} = useContext(AuthContext);

    const navLinks = (
        <>
            <NavLink to={'/'} className={'m-2 cursor-pointer text-[18px] text-secondary hover:text-accent font-bold'}>Home</NavLink>
            <NavLink to={'/coverage'} className={'m-2 cursor-pointer text-[18px] text-secondary hover:text-accent font-bold'}>Coverage</NavLink>
        </>
    )

    return (
        <div className="bg-[#FFFFFF] shadow-sm">
            <div className='navbar w-11/12 mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                    </div>
                    <h1 className="text-xl pb-5"><Logo></Logo></h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? (
                            <>
                                <Link to={'/dashboard'} className="btn bg-primary text-white hover:bg-secondary mr-2">Dashboard</Link>
                                <SignOut></SignOut>
                            </>
                        ) : (
                            <>
                                <Link to={'/auth/signin'} className="btn hover:bg-secondary hover:text-white mr-2">SignIn</Link>
                                <Link className="btn bg-primary hover:bg-secondary text-white">Be a Rider</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;