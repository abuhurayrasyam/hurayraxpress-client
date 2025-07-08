import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaSearch, FaUserSlash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, { status: "deactivated" });
      Swal.fire("Done", "Rider has been deactivated", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to deactivate rider", error);
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.nid_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-primary">Active Riders</h2>

      <div className="mb-6 max-w-md w-full">
        <label className="flex items-center bg-white shadow-sm rounded-full px-4 py-2 border border-accent focus-within:ring-2 ring-primary transition-all">
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

      {isLoading && <Loading></Loading>}

      {!isLoading && (
        <>
        {filteredRiders.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
              <FaEye className="text-6xl mb-4 animate-pulse" />
              <p className="text-lg font-semibold">No active riders found</p>
              <p className="text-sm mt-1">There are currently no active riders available. Please check back later for updates.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-sm">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary">
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
                        <td><span className="badge badge-success text-white">Active</span></td>
                        <td>
                            <button
                            onClick={() => handleDeactivate(rider._id)}
                            className="btn btn-sm btn-error"
                            >
                            <FaUserSlash className="mr-1" /> Deactivate
                            </button>
                        </td>
                        </tr>
                    ))}
                    {filteredRiders.length === 0 && (
                        <tr>
                        <td colSpan="8" className="text-center text-neutral">
                            No matching riders found.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActiveRiders;