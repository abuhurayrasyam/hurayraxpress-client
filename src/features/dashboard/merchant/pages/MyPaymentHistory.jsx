import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import Loading from '../../../../components/Loading';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const formatDate = (iso) => new Date(iso).toLocaleString();

const MyPaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>;
    }

    return (
        <div className="overflow-x-auto shadow-none rounded-sm w-11/12 mx-auto mt-10">
            { payments?.length > 0 ? (
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-white font-semibold">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Amount</th>
                            <th>Transaction</th>
                            <th>Payment Time</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        { payments.map((p, index) => (
                            <tr key={p.transactionId}>
                                <td>{index + 1}</td>
                                <td className="truncate" title={p.parcelId}>
                                    {p.parcelId}...
                                </td>
                                <td>৳ {p.amount}</td>
                                <td className="font-mono text-sm">
                                    <span title={p.transactionId}>
                                        {p.transactionId}...
                                    </span>
                                </td>
                                <td>{formatDate(p.paid_at_string)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
                ) : (
                <div className="flex flex-col items-center justify-center py-12 text-neutral max-w-md mx-auto">
                    <FaMoneyCheckAlt className="text-5xl text-neutral mb-4" />
                    <p className="text-xl font-semibold mb-2">No payment history found</p>
                    <p className="text-sm text-neutral mb-6 text-center">
                        You have not made any payments yet.
                    </p>
                    <Link to="/dashboard/my-parcels">
                        <button className="btn btn-sm bg-primary text-white rounded-md px-6 py-2 hover:bg-primary-focus transition">
                        Make a Payment
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyPaymentHistory;