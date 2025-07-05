import React from 'react';
import { useLoaderData } from 'react-router';
import Map from '../components/Map';

const Coverage = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        We are available in 64 districts
      </h1>
      <Map serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
