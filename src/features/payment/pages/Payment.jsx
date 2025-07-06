import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentCheckoutForm from '../components/PaymentCheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Elements stripe={stripePromise}>
                <div className='w-full max-w-lg'>
                    <h2 className="text-2xl font-bold mb-4 text-primary text-center">Complete Payment</h2>
                    <PaymentCheckoutForm></PaymentCheckoutForm>
                </div>
            </Elements>
        </div>
    );
};

export default Payment;