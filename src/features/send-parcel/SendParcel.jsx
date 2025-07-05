import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();

    // Extract unique regions
    const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

    // Get districts by region
    const getDistrictsByRegion = (region) => serviceCenters.filter((w) => w.region === region).map((w) => w.district);

    const parcelType = watch("type");
    const senderRegion = watch("sender_region");
    const receiverRegion = watch("receiver_region");

    const onSubmit = (data) => {
        const weight = parseFloat(data.weight) || 0;
        const isSameDistrict = data.sender_center === data.receiver_center;

        let baseCost = 0;
        let extraCost = 0;
        let breakdown = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 50 : 80;
            breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
        } else {
            if (weight <= 1) {
                baseCost = isSameDistrict ? 80 : 120;
                breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
            } else {
                const extraKg = weight - 1;
                const perKgCharge = extraKg * 20;
                const districtExtra = isSameDistrict ? 0 : 20;
                baseCost = isSameDistrict ? 80 : 120;
                extraCost = perKgCharge + districtExtra;

                breakdown = `
                Base extra weight: ${extraKg.toFixed(1)} kg & Charge per extra kg: ৳ 20<br/>
                Subtotal for weight: ৳ 20 × ${extraKg.toFixed(1)} = ৳ ${(20 * extraKg).toFixed(2)}<br/>
                ${districtExtra ? "Outside district charge: ৳ 20<br/>" : ""}
                <b>Total extra charge: ৳ ${perKgCharge.toFixed(2)}${districtExtra ? " + ৳ 20 = ৳ " + (perKgCharge + 20).toFixed(2) : ""}</b>
                `;
            }
        }

        const totalCost = baseCost + extraCost;

        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: 
            `<div class="text-center text-base space-y-2">
                    <p><strong class="text-primary">Parcel Type:</strong> <strong>${data.type.charAt(0).toUpperCase() + data.type.slice(1)}</strong></p>
                    <p><strong class="text-primary">Weight:</strong> <strong>${weight} kg</strong></p>
                    <p><strong class="text-primary">Delivery Zone:</strong> <strong>${isSameDistrict ? "Within Same District" : "Outside District"}</strong></p>
                    <hr class="my-2"/>
                    <p><strong class="text-primary">Base Cost:</strong> <strong>৳ ${baseCost}</strong></p>
                    ${extraCost > 0 ? `<p><strong class="text-primary">Extra Charges:</strong> <strong>৳ ${extraCost}</p></strong>` : ""}
                    <hr class="my-2"/>
                    <div class="text-sm font-bold text-secondary">Non-document parcel exceeding 1kg ${isSameDistrict ? "within" : "outside"} the district</div>
                    <div class="text-secondary text-sm">${breakdown}</div>
                    <hr class="my-2"/>
                    <p class="text-xl font-bold text-accent">Total Cost: ৳ ${totalCost}</p>
                </div>`,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#85A947",
            denyButtonColor: "#606060",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    created_by: user.email,
                    cost: totalCost,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: generateTrackingID(),
                };
                
                axiosSecure.post('/parcels', parcelData)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // TODO: redirect to a payment page 
                        Swal.fire({
                            title: "Redirecting...",
                            text: "Proceeding to payment gateway.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        reset();
                    }
                })
                
            }
        });
    };

    // Design-related Tailwind classes definitions
    const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
    const sectionTitleClasses = "text-lg font-semibold text-gray-800 mb-4";
    const mainTitleClasses = "text-2xl md:text-3xl font-bold text-primary mb-8";
    const subHeadingClasses = "text-lg font-semibold text-gray-800 mb-6 mt-8";
    const radioLabelClasses = "flex items-center space-x-2 text-gray-700";
    const radioInputClasses = "form-radio h-4 w-4 text-secondary border-gray-300 focus:ring-secondary";

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-3xl p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-5xl">
                <h1 className={mainTitleClasses}>Send Parcel</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={subHeadingClasses}>Enter your parcel details</h2>

                    <div className="flex flex-col sm:flex-row sm:space-x-8 mb-6">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <label className={radioLabelClasses}>
                                <input
                                    type="radio"
                                    value="document"
                                    {...register("type", { required: true })}
                                    className={radioInputClasses}
                                />
                                <span>Document</span>
                            </label>
                            <label className={radioLabelClasses}>
                                <input
                                    type="radio"
                                    value="non-document"
                                    {...register("type", { required: true })}
                                    className={radioInputClasses}
                                />
                                <span>Non-Document</span>
                            </label>
                            {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label htmlFor="parcelName" className={labelClasses}>Parcel Name</label>
                            <input
                                type="text"
                                id="parcelName"
                                placeholder="Enter Parcel Name"
                                {...register("title", { required: true })}
                                className={inputClasses}
                            />
                            {errors.title && <p className="text-red-500 text-sm">Parcel name is required</p>}
                        </div>
                        <div>
                            <label htmlFor="parcelWeight" className={labelClasses}>Parcel Weight (KG)</label>
                            <input
                                type="number"
                                id="parcelWeight"
                                placeholder="Parcel Weight (KG)"
                                step="0.1"
                                {...register("weight")}
                                disabled={parcelType !== "non-document"}
                                className={`${inputClasses} ${parcelType !== "non-document" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                        <div>
                            <h3 className={sectionTitleClasses}>Sender Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="senderName" className={labelClasses}>Sender Name</label>
                                    <input
                                        type="text"
                                        id="senderName"
                                        placeholder="Enter Sender Name"
                                        {...register("sender_name", { required: true })}
                                        className={inputClasses}
                                    />
                                    {errors.sender_name && <p className="text-red-500 text-sm">Sender name is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="senderContact" className={labelClasses}>Sender Contact No</label>
                                    <input
                                        type="number"
                                        id="senderContact"
                                        placeholder="Enter Sender Contact Number"
                                        {...register("sender_contact", { required: true })}
                                        className={inputClasses}
                                    />
                                    {errors.sender_contact && <p className="text-red-500 text-sm">Sender contact number is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="senderRegion" className={labelClasses}>Sender Region</label>
                                    <select
                                        id="senderRegion"
                                        {...register("sender_region", { required: true })}
                                        className={inputClasses}
                                    >
                                        <option value="">Select Region</option>
                                        {uniqueRegions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errors.sender_region && <p className="text-red-500 text-sm">Sender region is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="senderCenter" className={labelClasses}>Sender Pickup Warehouse</label>
                                    <select
                                        id="senderCenter"
                                        {...register("sender_center", { required: true })}
                                        className={inputClasses}
                                    >
                                        <option value="">Select Pickup Center</option>
                                        {getDistrictsByRegion(senderRegion).map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {errors.sender_center && <p className="text-red-500 text-sm">Sender pickup center is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="senderAddress" className={labelClasses}>Sender Address</label>
                                    <input
                                        type="text"
                                        id="senderAddress"
                                        placeholder="Enter Sender Address"
                                        {...register("sender_address", { required: true })}
                                        className={inputClasses}
                                    />
                                    {errors.sender_address && <p className="text-red-500 text-sm">Sender address is required</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className={sectionTitleClasses}>Receiver Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="receiverName" className={labelClasses}>Receiver Name</label>
                                    <input
                                        type="text"
                                        id="receiverName"
                                        placeholder="Enter Receiver Name"
                                        {...register("receiver_name", { required: true })}
                                        className={inputClasses}
                                    />
                                    {errors.receiver_name && <p className="text-red-500 text-sm">Receiver name is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="receiverContact" className={labelClasses}>Receiver Contact No</label>
                                    <input
                                        type="number"
                                        id="receiverContact"
                                        placeholder="Enter Receiver Contact Number"
                                        {...register("receiver_contact", { required: true })}
                                        className={inputClasses}
                                    />
                                    {errors.receiver_contact && <p className="text-red-500 text-sm">Receiver contact number is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="receiverRegion" className={labelClasses}>Receiver Region</label>
                                    <select
                                        id="receiverRegion"
                                        {...register("receiver_region", { required: true })}
                                        className={inputClasses}
                                    >
                                        <option value="">Select Region</option>
                                        {uniqueRegions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errors.receiver_region && <p className="text-red-500 text-sm">Receiver region is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="receiverCenter" className={labelClasses}>Receiver Delivery Warehouse</label>
                                    <select
                                        id="receiverCenter"
                                        {...register("receiver_center", { required: true })}
                                        className={inputClasses}
                                    >
                                        <option value="">Select Delivery Center</option>
                                        {getDistrictsByRegion(receiverRegion).map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {errors.receiver_center && <p className="text-red-500 text-sm">Receiver delivery center is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="receiverAddress" className={labelClasses}>Receiver Address</label>
                                    <input
                                        type="text"
                                        id="receiverAddress"
                                        placeholder="Enter Receiver Address"
                                        {...register("receiver_address", { required: true })}
                                        className={inputClasses}
                                    />
                                    {errors.receiver_address && <p className="text-red-500 text-sm">Receiver address is required</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="deliveryInstruction" className={labelClasses}>Delivery Instruction</label>
                        <textarea
                            id="deliveryInstruction"
                            placeholder="Delivery Instruction"
                            rows="4"
                            {...register("delivery_instruction", { required: true })}
                            className={inputClasses}
                        ></textarea>
                        {errors.delivery_instruction && <p className="text-red-500 text-sm">Delivery instruction is required</p>}
                    </div>

                    <p className="text-sm text-neutral mb-8 mt-5">* PickUp Time 4pm-7pm Approx.</p>

                    <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-75 transition duration-200 ease-in-out">Proceed to Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;