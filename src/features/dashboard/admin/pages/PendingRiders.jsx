import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>;
    }

    const handleDecision = async (id, action) => {
        const confirm = await Swal.fire({
            title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, {
                status: action === "approve" ? "active" : "rejected",
            });

            refetch();

            Swal.fire("Success", `Rider ${action}${action === "approve" ? "d" : "ed"} successfully`, "success");

        } catch (err) {
            Swal.fire("Error", "Could not update rider status", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-primary">Pending Rider Applications</h2>

            <div className="overflow-x-auto rounded-sm">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Applied</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.contact_number}</td>
                                <td>{new Date(rider.created_at).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedRider(rider)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleDecision(rider._id, "approve")}
                                        className="btn btn-sm btn-success"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() => handleDecision(rider._id, "reject")}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedRider && (
                <dialog id="riderDetailsModal" className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-base-100 shadow-xl rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-primary mb-4 border-b pb-2">👤 Rider Application Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                            <span className="font-semibold text-gray-900">Name:</span> {selectedRider.name}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">Email:</span> {selectedRider.email}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">NID:</span> {selectedRider.nid_number}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">Age:</span> {selectedRider.age}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">Phone:</span> {selectedRider.contact_number}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">Bike Reg.:</span> {selectedRider.bike_registration_number}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">Region:</span> {selectedRider.region}
                            </div>
                            <div>
                            <span className="font-semibold text-gray-900">District:</span> {selectedRider.district}
                            </div>
                            <div className="md:col-span-2">
                            <span className="font-semibold text-gray-900">Applied At:</span>{" "}
                            {new Date(selectedRider.created_at).toLocaleString()}
                            </div>
                            {selectedRider.additional_info && (
                            <div className="md:col-span-2">
                                <span className="font-semibold text-gray-900">Additional Info:</span>{" "}
                                {selectedRider.additional_info}
                            </div>
                            )}
                        </div>

                        <div className="modal-action mt-6">
                            <button
                            className="btn btn-outline btn-error"
                            onClick={() => setSelectedRider(null)}
                            >
                            Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;