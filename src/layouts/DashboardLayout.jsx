import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../components/Logo';
import { FaBoxOpen, FaHome, FaMoneyCheckAlt, FaMotorcycle, FaSearchLocation, FaUserEdit, FaUserShield, FaUserSlash } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { MdPendingActions } from 'react-icons/md';
import { BsPersonCheckFill } from 'react-icons/bs';

const DashboardLayout = () => {

    const navLinks = (
        <>
            <NavLink to="/dashboard" end className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaHome /> Home</NavLink>
            <NavLink to="/dashboard/send-parcel" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FiPackage /> Send Parcel</NavLink>
            <NavLink to="/dashboard/my-parcels" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaBoxOpen /> My Parcels</NavLink>
            <NavLink to="/dashboard/my-payment-history" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaMoneyCheckAlt /> My Payment History</NavLink>
            <NavLink to="/dashboard/track-parcel" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaSearchLocation /> Track a Parcel</NavLink>
            <NavLink to="/dashboard/be-rider" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaMotorcycle /> Be A Rider</NavLink>
            <NavLink to="/dashboard/pending-riders" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><MdPendingActions /> Pending Riders</NavLink>
            <NavLink to="/dashboard/active-riders" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><BsPersonCheckFill /> Active Riders</NavLink>
            <NavLink to="/dashboard/deactivated-riders" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaUserSlash /> Deactivated Riders</NavLink>
            <NavLink to="/dashboard/make-admin" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaUserShield /> Make Admin</NavLink>
            <NavLink to="/dashboard/update-profile" className="flex text-sm md:text-xl items-center gap-2 text-white mb-2"><FaUserEdit /> Update Your Profile</NavLink>
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