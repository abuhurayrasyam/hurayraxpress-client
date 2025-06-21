import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner01 from '../../../assets/banners/banner1.png';
import banner02 from '../../../assets/banners/banner2.png';
import banner03 from '../../../assets/banners/banner3.png';

const BannerSection = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} className='pt-10'>
            <div>
                <img src={banner01} />
            </div>
            <div>
                <img src={banner02} />
            </div>
            <div>
                <img src={banner03} />
            </div>
        </Carousel>
    );
};

export default BannerSection;