import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../components/Logo';

const DashboardLayout = () => {

    const navLinks = (
        <>
            <li><NavLink to={'/dashboard'} end>Home</NavLink></li>
            <li><NavLink to={'/dashboard/my-parcels'}>My Parcels</NavLink></li>
        </>
    )

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                <div className="navbar bg-[#FFFFFF] w-full ">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current text-primary"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden text-primary font-bold">Dashboard</div>
                </div>
                <div className='bg-[#f3f4f6] min-h-screen'>
                    <Outlet></Outlet>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-secondary text-accent font-bold text-md md:text-xl min-h-full w-80 p-4"> 
                    <div className='mb-5'><Logo></Logo></div>
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;