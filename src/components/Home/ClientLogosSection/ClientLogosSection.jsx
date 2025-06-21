import React from 'react';
import Marquee from 'react-fast-marquee';

import alhurayra from '../../../assets/clients/al-hurayra.png';
import amazon from '../../../assets/clients/amazon.png';
import aliexpress from '../../../assets/clients/ali-express.png';
import daraz from '../../../assets/clients/daraz.png';
import nokia from '../../../assets/clients/nokia.png';
import samsung from '../../../assets/clients/samsung.png';
import casio from '../../../assets/clients/casio.png';

const logos = [ alhurayra, amazon, aliexpress, daraz, nokia, samsung, casio];

const ClientLogosSection = () => {
  return (
    <section className="py-10 px-4">
      <h2 className="text-center text-3xl font-bold text-secondary mb-8">We've helped thousands of sales teams</h2>

      <Marquee
        gradient={false}
        speed={50}
        direction="left"
        pauseOnHover={true}
        className="flex space-x-12"
      >
        <div className="flex items-center justify-center gap-[100px] px-4">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client ${index + 1}`}
              className="max-h-[24px] w-auto object-contain"
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default ClientLogosSection;