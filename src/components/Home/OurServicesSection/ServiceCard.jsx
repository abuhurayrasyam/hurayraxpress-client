import React from 'react';

const ServiceCard = ({service}) => {

    const { icon: Icon, title, description } = service;

  return (
    <div className="card bg-base-100 shadow-md transition-all">
      <div className="card-body items-center text-center p-6">
        <div className="text-4xl text-primary mb-4">
          <Icon />
        </div>
        <h2 className="card-title text-lg text-secondary font-semibold">{title}</h2>
        <p className="text-sm text-neutral">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
