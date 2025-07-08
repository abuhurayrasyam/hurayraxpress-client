import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import riderAnimation from '../../../../assets/lotties/rider-animation.json';
import { AuthContext } from "../../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BeARider = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {user} = useContext(AuthContext);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
        fetch('/serviceCenter.json')
        .then((res) => res.json())
        .then((data) => setServiceCenters(data))
    }, []);

  const regions = [...new Set(serviceCenters.map((s) => s.region))];
  const districts = serviceCenters
      .filter((s) => s.region === selectedRegion)
      .map((s) => s.district);

  const onSubmit = (data) => {
    const riderData = {
        ...data,
        name: user?.displayName || "",
        email: user?.email || "",
        status: "pending",
        created_at: new Date().toISOString(),
    };

    axiosSecure.post('/riders', riderData)
    .then(res => {
        if(res.data.insertedId){
            Swal.fire({
                icon: "success",
                title: "Application Submitted!",
                text: "Your application is pending approval.",
            });
        }
    })

    reset();
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 rounded-[30px]">
      <div className="bg-white flex flex-col md:flex-row justify-between items-center rounded-xl shadow-3xl p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-5xl mx-auto">
        <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0 flex justify-center">
          <Lottie className="w-80 md:w-[350px]" animationData={riderAnimation} loop={true}></Lottie>
        </div>

        <div className="w-full md:w-1/2 order-2 md:order-1 max-w-xl space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-primary">Be a Rider</h1>
            <p className="text-neutral mt-2">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal
              packages to business shipments — we deliver on time, every time.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Your Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Your Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">NID No</label>
              <input
                type="number"
                {...register("nid_number", { required: "NID is required" })}
                placeholder="Enter your NID number"
                className="input input-bordered w-full"
              />
              {errors.nid_number && <p className="text-red-500 text-sm">{errors.nid_number.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold">Your Age</label>
              <input
                type="number"
                {...register("age", { required: "Age is required" })}
                placeholder="Enter your age"
                className="input input-bordered w-full"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold">Contact Number</label>
              <input
                type="text"
                {...register("contact_number", { required: "Contact is required" })}
                placeholder="Enter your contact number"
                className="input input-bordered w-full"
              />
              {errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold">Your Region</label>
              <select
                {...register("region", {
                  required: "Region is required",
                  onChange: (e) => {
                    setSelectedRegion(e.target.value);
                  },
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold">Which wire-house you want to work?</label>
              <select
                {...register("district", { required: "Please select a warehouse" })}
                className="select select-bordered w-full" disabled={!selectedRegion}
              >
                <option value="">Select wire-house</option>
                {districts.map((district, idx) => (
                    <option key={idx} value={district}>
                        {district}
                    </option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold">Bike Registration No</label>
              <input
                type="text"
                placeholder="Enter your bike registration number (e.g., DHAKA-XYZ-1234)"
                className="input input-bordered w-full"
                {...register("bike_registration_number", { required: "Registration number is required" })}
              />
              {errors.bike_registration_number && (
                <p className="text-red-500 text-sm mt-1">{errors.bike_registration_number.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold">Additional Information (Optional)</label>
              <textarea
                placeholder="Write any additional info here..."
                className="textarea textarea-bordered w-full"
                {...register("additional_info")}
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="btn bg-primary text-white w-full hover:bg-secondary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeARider;