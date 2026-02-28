import { ArrowLeft, Clock, MapPin, Truck, Plus, Phone, Star, Info } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

export default function Laundry() {
  const navigate = useNavigate();
  const { role, approvalStatus } = useUser();

  const services = [
    {
      id: 1,
      name: "Sparkle Laundry",
      price: "15 MAD/kg",
      time: "24h",
      distance: "0.8 km",
      delivery: true,
      rating: 4.9,
      phone: "+212 6 12 34 56 78",
      address: "45 Rue Hassan II, Errachidia",
      hours: "8h - 20h",
      description: "Professional laundry service with express options and eco-friendly products.",
    },
    {
      id: 2,
      name: "Quick Wash",
      price: "12 MAD/kg",
      time: "48h",
      distance: "1.5 km",
      delivery: false,
      rating: 4.5,
      phone: "+212 6 98 76 54 32",
      address: "12 Av. Mohammed V, Errachidia",
      hours: "9h - 18h",
      description: "Affordable laundry for students. Quality wash at the best price.",
    },
    {
      id: 3,
      name: "Campus Cleaners",
      price: "10 MAD/kg",
      time: "72h",
      distance: "0.3 km",
      delivery: false,
      rating: 4.2,
      phone: "+212 6 55 44 33 22",
      address: "Near University Campus, Errachidia",
      hours: "7h - 22h",
      description: "Located right next to campus. Convenient drop-off and pick-up for students.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 pb-24">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 bg-white rounded-full shadow-sm border border-gray-200"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Laundry Services</h1>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                <div className="flex items-center text-xs text-slate-500 mt-1">
                  <MapPin size={12} className="mr-1" /> {service.address}
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-yellow-700">{service.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-500 mb-3">{service.description}</p>

            {/* Info tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center text-xs font-medium text-slate-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                <Clock size={12} className="mr-1" /> {service.hours}
              </div>
              <div className="flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                <Info size={12} className="mr-1" /> {service.price} • {service.time}
              </div>
              <div className="flex items-center text-xs font-medium text-slate-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                <MapPin size={12} className="mr-1" /> {service.distance}
              </div>
              {service.delivery && (
                <div className="flex items-center text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-lg">
                  <Truck size={12} className="mr-1" /> Delivery
                </div>
              )}
            </div>

            {/* Contact button */}
            <a
              href={`tel:${service.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center space-x-2 w-full py-3 bg-green-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-green-700 transition-colors active:scale-[0.98]"
            >
              <Phone size={16} />
              <span>{service.phone}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Floating Add Button - Approved Provider only */}
      {role === "provider" && approvalStatus === "approved" && (
        <button
          onClick={() => navigate("/app/laundry/add")}
          className="fixed bottom-24 right-6 w-14 h-14 bg-cyan-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-cyan-600 transition-colors z-40 hover:scale-105 active:scale-95"
        >
          <Plus size={28} />
        </button>
      )}
    </div>
  );
}