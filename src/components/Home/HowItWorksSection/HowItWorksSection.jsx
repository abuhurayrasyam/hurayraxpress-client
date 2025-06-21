import { FaCalendarCheck, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const steps = [
  {
    icon: <FaCalendarCheck className="text-3xl text-accent" />,
    title: "Booking Pick & Drop",
    desc: "Easily schedule parcel pickup and delivery from anywhere across Bangladesh.",
  },
  {
    icon: <FaMoneyBillWave className="text-3xl text-accent" />,
    title: "Cash On Delivery",
    desc: "Enable COD for your parcels with secure payment upon delivery.",
  },
  {
    icon: <FaWarehouse className="text-3xl text-accent" />,
    title: "Delivery Hub",
    desc: "We operate with smart hubs ensuring faster and smarter local dispatch.",
  },
  {
    icon: <FaBuilding className="text-3xl text-accent" />,
    title: "Booking SME & Corporate",
    desc: "Custom logistics support for businesses with bulk parcel solutions.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">How It Works</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                {step.title}
              </h3>
              <p className="text-sm text-neutral">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
