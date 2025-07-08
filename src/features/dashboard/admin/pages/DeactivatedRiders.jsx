import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaSearch, FaCheck } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const DeactivatedRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["deactivatedRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/deactivated");
      return res.data;
    },
  });

  const handleReactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Activate this rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, activate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, { status: "active" });
      Swal.fire("Success", "Rider has been activated", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to activate rider", error);
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.nid_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-error">Deactivated Riders</h2>

      <div className="mb-6 max-w-md w-full">
        <label className="flex items-center bg-white shadow-sm rounded-full px-4 py-2 border border-error focus-within:ring-2 ring-error transition-all">
          <FaSearch className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            placeholder="Search by NID Number..."
            className="bg-transparent outline-none w-full text-sm placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {filteredRiders.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
              <FaEye className="text-6xl mb-4 animate-pulse" />
              <p className="text-lg font-semibold">No deactivated riders found</p>
              <p className="text-sm mt-1">There are currently no deactivated riders. You're all set!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-sm">
              <table className="table table-zebra w-full">
                <thead className="bg-error text-white">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>NID</th>
                    <th>Region</th>
                    <th>District</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRiders.map((rider) => (
                    <tr key={rider._id}>
                      <td>{rider.name}</td>
                      <td>{rider.email}</td>
                      <td>{rider.contact_number}</td>
                      <td>{rider.nid_number}</td>
                      <td>{rider.region}</td>
                      <td>{rider.district}</td>
                      <td>
                        <span className="badge badge-error text-white">Deactivated</span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleReactivate(rider._id)}
                          className="btn btn-sm btn-success"
                        >
                          <FaCheck className="mr-1" /> Activate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeactivatedRiders;