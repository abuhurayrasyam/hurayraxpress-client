import React from 'react';
import Tracking from '../../../assets/benefits/tracking.png';
import Delivery from '../../../assets/benefits/delivery.png';
import Call from '../../../assets/benefits/call.png';

const benefits = [
  {
    img: Tracking,
    title: 'Live Parcel Tracking',
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: Delivery,
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
  },
  {
    img: Call,
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
  },
];

const BenefitsSection = () => {
  return (
    <section className="border-y border-dashed border-neutral py-10 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-secondary mb-4">Why Choose Us</h2>
        <p className="text-neutral">
          We offer more than just delivery — we provide complete peace of mind.
        </p>
      </div>

      <div className="space-y-8">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="card lg:card-side bg-base-200 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex flex-col lg:flex-row items-center w-full">
              <figure className="p-6 flex justify-center items-center">
                <img src={item.img} alt={item.title} className="max-w-40 max-h-40 object-contain" />
              </figure>

              <div className="hidden lg:block border-l-2 border-dotted border-primary h-32 my-auto"></div>

              <div className="card-body flex-1 flex flex-col items-center md:items-start text-center md:text-start">
                <h3 className="card-title text-xl font-bold text-secondary">{item.title}</h3>
                <p className="text-neutral">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;