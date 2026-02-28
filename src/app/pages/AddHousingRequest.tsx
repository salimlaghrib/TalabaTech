import { useState } from "react";
import { ArrowLeft, MapPin, DollarSign, Users, Phone, Mail, User, Home, Wifi, Car, Wind, Utensils, Droplets, Tv, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

export default function AddHousingRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    location: "",
    roommates: "1",
    moveInDate: "",
    duration: "semester",
    name: "",
    phone: "",
    email: "",
  });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const features = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "kitchen", label: "Kitchen", icon: Utensils },
    { id: "bathroom", label: "Private Bathroom", icon: Droplets },
    { id: "tv", label: "TV", icon: Tv },
    { id: "study", label: "Study Room", icon: BookOpen },
    { id: "furnished", label: "Furnished", icon: Home },
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // Simulate submission
    navigate("/app/housing");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Housing Request</h1>
            <p className="text-orange-100 text-sm">Describe what you're looking for</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-5">
        {/* What are you looking for */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Home size={18} className="text-orange-500" />
            <span>What are you looking for?</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
              <input
                type="text"
                placeholder="e.g. Looking for a room near campus"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Description</label>
              <textarea
                placeholder="Describe what you're looking for in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Max Budget</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. 1500 MAD/mo"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Roommates</label>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.roommates}
                    onChange={(e) => setFormData({ ...formData, roommates: e.target.value })}
                    className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="1">Alone</option>
                    <option value="2">1 roommate</option>
                    <option value="3">2 roommates</option>
                    <option value="4">3+ roommates</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Preferred Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Near FST, Errachidia Center..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Move-in Date</label>
                <input
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm appearance-none"
                >
                  <option value="semester">1 Semester</option>
                  <option value="year">Full Year</option>
                  <option value="months">Few Months</option>
                  <option value="indefinite">Indefinite</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Desired Features */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-4">Desired Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {features.map((f) => {
              const isSelected = selectedFeatures.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFeature(f.id)}
                  className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    isSelected
                      ? "border-orange-400 bg-orange-50 text-orange-700"
                      : "border-gray-100 bg-gray-50 text-slate-600 hover:border-gray-200"
                  }`}
                >
                  <f.icon size={16} />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <User size={18} className="text-orange-500" />
            <span>Your Contact Info</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+212 6 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-orange-600 transition-colors active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <Users size={20} />
          <span>Publish My Request</span>
        </button>

        <p className="text-center text-xs text-slate-400 pb-4">
          Housing providers will be able to see your request and contact you directly.
        </p>
      </div>
    </div>
  );
}
