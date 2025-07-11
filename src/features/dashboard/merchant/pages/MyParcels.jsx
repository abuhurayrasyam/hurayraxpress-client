import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import { FaBoxOpen, FaEye, FaMoneyBillAlt, FaMoneyBillWave, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })

    const handleView = (id) => {
        console.log("View Parcel", id);
        // Implement a modal or navigate to a detail page
    };

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`)
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
        });
        if (confirm.isConfirmed) { 
            axiosSecure.delete(`/parcels/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
                refetch();
            })
        }
    };

    const formatDate = (iso) => {
        return new Date(iso).toLocaleString();
    };

    return (
        <div className="overflow-x-auto rounded-sm w-11/12 mx-auto mt-10">
            {parcels?.length > 0 ? (
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-white font-semibold">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className="max-w-[180px] truncate">{parcel.title}</td>
                                <td className="capitalize">{parcel.type}</td>
                                <td>{formatDate(parcel.creation_date)}</td>
                                <td>৳ {parcel.cost}</td>
                                <td>
                                    <span
                                        className={`badge ${parcel.payment_status === "paid"
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {parcel.payment_status.charAt(0).toUpperCase() + parcel.payment_status.slice(1)}
                                    </span>
                                </td>
                                <td className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleView(parcel._id)}
                                        className="btn btn-xs flex items-center justify-center gap-1 text-xs w-24 h-7 bg-accent text-white"
                                    >
                                        <FaEye className="text-white text-sm" /> View
                                    </button>

                                    <button
                                        onClick={() => handlePay(parcel._id)}
                                        className={`btn btn-xs flex items-center justify-center gap-1 text-xs w-24 h-7 text-white ${
                                            parcel.payment_status === "paid" 
                                            ? "bg-neutral cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700"
                                        }`}
                                        disabled={parcel.payment_status === "paid"}
                                        >
                                        <FaMoneyBillWave className="text-sm" /> Pay Now
                                        </button>

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs flex items-center justify-center gap-1 text-xs w-24 h-7 text-white bg-red-600 hover:bg-red-700"
                                    >
                                        <FaTrashAlt className="text-sm" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-neutral max-w-md mx-auto">
                    <FaBoxOpen className="text-5xl text-neutral mb-4" />
                    <p className="text-xl font-semibold mb-2">No parcels found</p>
                    <p className="text-sm text-neutral mb-6 text-center">Looks like you haven't sent any parcels yet.</p>
                    <Link to={'/dashboard/send-parcel'}><button className="btn btn-sm bg-primary text-white rounded-md px-6 py-2 hover:bg-primary-focus transition"> Send a Parcel </button></Link>
                </div>
            )}
        </div>
    );
};

export default MyParcels;