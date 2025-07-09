import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserSlash, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState("");

    const {
        data: users = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["searchedUsers", emailQuery],
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, role }) =>
            await axiosSecure.patch(`/users/${id}/role`, { role }),
        onSuccess: () => {
            refetch();
        },
    });

    const handleRoleChange = async (id, currentRole) => {
        const action = currentRole === "admin" ? "Remove admin" : "Make admin";
        const newRole = currentRole === "admin" ? "user" : "admin";

        const confirm = await Swal.fire({
            title: `${action}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ id, role: newRole });
            Swal.fire("Success", `${action} successful`, "success");
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-4">Make Admin</h2>

            <div className="flex items-center gap-3 mb-6 bg-white dark:bg-base-200 p-3 rounded-xl shadow-md w-full max-w-xl">
                <FaSearch className="text-gray-500 text-xl" />
                <input
                    type="text"
                    className="flex-1 bg-transparent outline-none placeholder:text-gray-400 text-base"
                    placeholder="Search user by email"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
            </div>

            {isFetching && <Loading></Loading>}

            {!isFetching && users.length === 0 && emailQuery && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-100/10 border border-red-200 dark:border-red-500 text-red-500 font-medium text-sm shadow-sm">
                    <FaUserSlash className="text-lg" />
                    <span>No users found!</span>
                </div>
            )}

            {users.length > 0 && (
                <div className="overflow-x-auto rounded-sm">
                    <table className="table w-full table-zebra">
                        <thead className="bg-accent text-white">
                            <tr>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id}>
                                    <td>{u.email}</td>
                                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <span
                                            className={`badge w-24 text-center font-semibold ${u.role === "admin" ? "badge-success" : "badge-error"
                                                }`}
                                        >
                                            {u.role.charAt(0).toUpperCase() + u.role.slice(1) || "User"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleRoleChange(u._id, u.role || "user")}
                                            className={`btn w-36 btn-sm text-secondary ${u.role === "admin" ? "btn-error" : "btn-primary"
                                                }`}
                                        >
                                            {u.role === "admin" ? (
                                                <>
                                                    <FaUserTimes className="mr-1" />
                                                    Remove Admin
                                                </>
                                            ) : (
                                                <>
                                                    <FaUserShield className="mr-1" />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;