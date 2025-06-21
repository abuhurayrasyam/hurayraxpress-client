import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2 h-8 md:h-10 lg:h-12' src={logo} alt="" />
            <p className='text-xs md:text-sm lg:text-xl text-accent -ml-3 font-extrabold'>Hurayra<span className='text-primary'>Xpress</span></p>
        </div>
    );
};

export default Logo;