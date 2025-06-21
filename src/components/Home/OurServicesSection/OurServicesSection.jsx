import React from 'react';
import ServiceCard from './ServiceCard';
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt
} from 'react-icons/fa';

const services = [
  {
    icon: FaShippingFast,
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
  },
  {
    icon: FaMapMarkedAlt,
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
  },
  {
    icon: FaWarehouse,
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
  },
  {
    icon: FaMoneyBillWave,
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
  },
  {
    icon: FaBuilding,
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support."
  },
  {
    icon: FaUndoAlt,
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
  }
];

const OurServicesSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-secondary rounded-xl my-10">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-gray-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
          />
        ))}
      </div>
    </section>
  );
};

export default OurServicesSection;
