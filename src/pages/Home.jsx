import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import BannerSection from '../components/Home/BannerSection/BannerSection';
import OurServicesSection from '../components/Home/OurServicesSection/OurServicesSection';
import ClientLogosSection from '../components/Home/ClientLogosSection/ClientLogosSection';
import BenefitsSection from '../components/Home/BenefitsSection/BenefitsSection';
import BecomeMerchantSection from '../components/Home/BecomeMerchantSection/BecomeMerchantSection';
import HowItWorksSection from '../components/Home/HowItWorksSection/HowItWorksSection';

const Home = () => {

    useDocumentTitle("Hurayra Xpress | Home");

    return (
        <div className='w-11/12 mx-auto'>
            <section>
                <BannerSection></BannerSection>
            </section>
            <section>
                <HowItWorksSection></HowItWorksSection>
            </section>
            <section>
                <OurServicesSection></OurServicesSection>
            </section>
            <section>
                <ClientLogosSection></ClientLogosSection>
            </section>
            <section>
                <BenefitsSection></BenefitsSection>
            </section>
            <section>
                <BecomeMerchantSection></BecomeMerchantSection>
            </section>
        </div>
    );
};

export default Home;