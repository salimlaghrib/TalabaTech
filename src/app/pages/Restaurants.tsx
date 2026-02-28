import { ArrowLeft, Clock, MapPin, Star, Plus, Phone, Info } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

export default function Restaurants() {
  const navigate = useNavigate();
  const { role, approvalStatus } = useUser();

  const restaurants = [
    {
      id: 1,
      name: "Student Bites",
      category: "Fast Food",
      rating: 4.7,
      distance: "0.5 km",
      price: "$",
      badge: "Student Friendly",
      image: "photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
      isOpen: true,
      phone: "+212 6 11 22 33 44",
      address: "23 Rue Al Massira, Errachidia",
      hours: "10h - 23h",
      description: "Affordable burgers, tacos and sandwiches perfect for students on a budget.",
    },
    {
      id: 2,
      name: "Mama's Kitchen",
      category: "Traditional",
      rating: 4.5,
      distance: "1.2 km",
      price: "$$",
      badge: "Best Value",
      image: "photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      isOpen: true,
      phone: "+212 6 55 66 77 88",
      address: "8 Av. Moulay Ali Cherif, Errachidia",
      hours: "11h - 22h",
      description: "Authentic Moroccan dishes with homemade tagines, couscous and fresh bread.",
    },
    {
      id: 3,
      name: "Campus Cafe",
      category: "Coffee & Snacks",
      rating: 4.2,
      distance: "0.2 km",
      price: "$",
      badge: "Study Spot",
      image: "photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
      isOpen: false,
      phone: "+212 6 33 44 55 66",
      address: "Near University Main Gate, Errachidia",
      hours: "7h - 20h",
      description: "Cozy cafe with great coffee, pastries and free Wi-Fi. Perfect for studying.",
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
        <h1 className="text-2xl font-bold text-slate-900">Food & Dining</h1>
      </div>

      <div className="space-y-4">
        {restaurants.map((place) => (
          <div key={place.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Image */}
            <div className="w-full h-40 bg-gray-200 overflow-hidden relative">
              <img 
                src={`https://images.unsplash.com/${place.image}`} 
                alt={place.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex space-x-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${place.isOpen ? 'bg-green-500/90 text-white' : 'bg-gray-800/70 text-white'}`}>
                  {place.isOpen ? 'Open Now' : 'Closed'}
                </span>
                {place.badge && (
                  <span className="text-xs font-bold text-white bg-orange-500/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {place.badge}
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-slate-800">{place.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{place.name}</h3>
                  <div className="text-xs text-slate-500">{place.category} • {place.price}</div>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-3">{place.description}</p>

              {/* Info tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="flex items-center text-xs font-medium text-slate-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                  <MapPin size={12} className="mr-1" /> {place.address}
                </div>
                <div className="flex items-center text-xs font-medium text-slate-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                  <Clock size={12} className="mr-1" /> {place.hours}
                </div>
                <div className="flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  <MapPin size={12} className="mr-1" /> {place.distance}
                </div>
              </div>

              {/* Contact button */}
              <a
                href={`tel:${place.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-green-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-green-700 transition-colors active:scale-[0.98]"
              >
                <Phone size={16} />
                <span>{place.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button - Approved Provider only */}
      {role === "provider" && approvalStatus === "approved" && (
        <button
          onClick={() => navigate("/app/restaurants/add")}
          className="fixed bottom-24 right-6 w-14 h-14 bg-orange-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors z-40 hover:scale-105 active:scale-95"
        >
          <Plus size={28} />
        </button>
      )}
    </div>
  );
}