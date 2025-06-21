import React from 'react';
import location from '../../../assets/merchants/location-merchant.png'

const BecomeMerchantSection = () => {
    return (
        <div data-aos="zoom-in-up" className="bg-[url('assets/merchants/be-a-merchant-bg.png')] bg-no-repeat bg-secondary rounded-4xl p-20 my-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={location} className="max-w-sm"/>
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-gray-300">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <button className="btn bg-primary hover:bg-accent text-black border-none rounded-full">Become A Merchant</button>
                        <button className="btn bg-secondary hover:bg-accent text-primary hover:text-black btn-outline hover:border-none rounded-full text-xs md:text-sm">Earn with HurayraXpress Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeMerchantSection;