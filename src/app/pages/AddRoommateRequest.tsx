import { useState } from "react";
import { ArrowLeft, MapPin, DollarSign, Users, Phone, Mail, User, Wifi, Car, Wind, Utensils, Droplets, BookOpen, Home, GraduationCap, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export default function AddRoommateRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    location: "",
    moveInDate: "",
    duration: "semester",
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "any",
    studyField: "",
    lifestyle: "calm",
  });
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const preferences = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "ac", label: "AC / Heating", icon: Wind },
    { id: "kitchen", label: "Shared Kitchen", icon: Utensils },
    { id: "bathroom", label: "Private Bathroom", icon: Droplets },
    { id: "study", label: "Study Room", icon: BookOpen },
    { id: "furnished", label: "Furnished", icon: Home },
    { id: "quiet", label: "Quiet Area", icon: Heart },
  ];

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    navigate("/app/housing");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Find a Roommate</h1>
            <p className="text-purple-200 text-sm">Describe who you're looking for</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-5">
        {/* About You */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <GraduationCap size={18} className="text-purple-500" />
            <span>About You</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
              <input
                type="text"
                placeholder="e.g. CS student looking for a roommate near FST"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Description</label>
              <textarea
                placeholder="Tell potential roommates about yourself — your habits, schedule, personality..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 21"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Gender Pref.</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm appearance-none"
                >
                  <option value="any">No preference</option>
                  <option value="male">Male only</option>
                  <option value="female">Female only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Study Field</label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. CS, Math..."
                    value={formData.studyField}
                    onChange={(e) => setFormData({ ...formData, studyField: e.target.value })}
                    className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Lifestyle</label>
                <select
                  value={formData.lifestyle}
                  onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm appearance-none"
                >
                  <option value="calm">Calm & studious</option>
                  <option value="social">Social & active</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Housing Preferences */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Home size={18} className="text-purple-500" />
            <span>Housing Preferences</span>
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Max Budget</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. 800 MAD/mo"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Near FST"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Move-in Date</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                    className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm appearance-none"
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
          <h3 className="font-bold text-slate-900 mb-4">Housing Must-Haves</h3>
          <div className="grid grid-cols-2 gap-2">
            {preferences.map((f) => {
              const isSelected = selectedPreferences.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => togglePreference(f.id)}
                  className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    isSelected
                      ? "border-purple-400 bg-purple-50 text-purple-700"
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
            <User size={18} className="text-purple-500" />
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
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
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
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
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
                  className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-purple-700 transition-colors active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <Users size={20} />
          <span>Publish Roommate Request</span>
        </button>

        <p className="text-center text-xs text-slate-400 pb-4">
          Other students will be able to see your roommate request and contact you directly.
        </p>
      </div>
    </div>
  );
}
