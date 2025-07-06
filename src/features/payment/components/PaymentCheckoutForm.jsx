import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const PaymentCheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const  axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const {isPending, data: parcelInfo = {}} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if(isPending){
        return <Loading></Loading>;
    }

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        };

        const card = elements.getElement(CardElement);

        if(!card){
            return;
        };

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if(error){
            setError(error.message);
        }
        else{
            setError('');
            console.log(paymentMethod);

            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            })

            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            }
            else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {

                    const transactionId = result.paymentIntent.id;
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });
                        navigate('/dashboard/my-parcels');
                    }
                }
            }
        }

        
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className='p-2 border rounded'>
                </CardElement>
                <button type='submit' className="btn btn-primary text-white w-full" disabled={!stripe}>Pay ৳ {amount}</button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentCheckoutForm;