import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, DollarSign, Plus, X, Truck, Shirt } from "lucide-react";
import { useNavigate } from "react-router";

interface ServiceItem {
  name: string;
  price: string;
  duration: string;
}

export default function AddLaundry() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    openTime: "08:00",
    closeTime: "20:00",
    delivery: false,
    pickup: false,
  });

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [newService, setNewService] = useState({ name: "", price: "", duration: "24h" });
  const [showAddService, setShowAddService] = useState(false);

  const addMockImage = () => {
    const mockImages = [
      "photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=400&q=80",
      "photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=400&q=80",
    ];
    if (images.length < 3) {
      setImages([...images, mockImages[images.length % mockImages.length]]);
    }
  };

  const addService = () => {
    if (newService.name && newService.price) {
      setServices([...services, { ...newService }]);
      setNewService({ name: "", price: "", duration: "24h" });
      setShowAddService(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Add Laundry Service</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Photos */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-3 block">Photos</label>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={`https://images.unsplash.com/${img}`} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
            {images.length < 3 && (
              <button onClick={addMockImage} className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-slate-400 hover:border-cyan-400 hover:text-cyan-500 transition-colors flex-shrink-0">
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Service Name</label>
          <input
            type="text"
            placeholder="e.g. Sparkle Laundry"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Address..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 block">Open</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="time" value={formData.openTime} onChange={(e) => setFormData({ ...formData, openTime: e.target.value })} className="w-full bg-white pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 block">Close</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="time" value={formData.closeTime} onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })} className="w-full bg-white pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm" />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <Truck size={18} className="text-cyan-500" />
              <span className="text-sm font-bold text-slate-700">Delivery Service</span>
            </div>
            <button
              onClick={() => setFormData({ ...formData, delivery: !formData.delivery })}
              className={`w-12 h-7 rounded-full transition-colors ${formData.delivery ? "bg-cyan-500" : "bg-gray-200"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.delivery ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <Shirt size={18} className="text-cyan-500" />
              <span className="text-sm font-bold text-slate-700">Pickup Available</span>
            </div>
            <button
              onClick={() => setFormData({ ...formData, pickup: !formData.pickup })}
              className={`w-12 h-7 rounded-full transition-colors ${formData.pickup ? "bg-cyan-500" : "bg-gray-200"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.pickup ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Description</label>
          <textarea
            rows={3}
            placeholder="Describe your laundry services, specialties..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-cyan-400 resize-none"
          />
        </div>

        {/* Service Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-700">Service Pricing</label>
            <button
              onClick={() => setShowAddService(true)}
              className="flex items-center space-x-1 text-cyan-600 text-sm font-semibold"
            >
              <Plus size={16} />
              <span>Add Service</span>
            </button>
          </div>

          {showAddService && (
            <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 mb-3 space-y-3">
              <input
                type="text"
                placeholder="Service name (e.g. Standard Wash)"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm"
              />
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Price/kg"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    className="w-full bg-white pl-8 pr-4 py-3 rounded-xl border border-gray-200 outline-none text-sm"
                  />
                </div>
                <select
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  className="bg-white px-3 py-3 rounded-xl border border-gray-200 outline-none text-sm"
                >
                  <option>12h</option>
                  <option>24h</option>
                  <option>48h</option>
                  <option>72h</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setShowAddService(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-500">Cancel</button>
                <button onClick={addService} className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-white text-sm font-bold">Add</button>
              </div>
            </div>
          )}

          {services.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {services.map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-3 ${i !== services.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                      <Shirt size={14} className="text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.duration} turnaround</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-cyan-600">{item.price} MAD/kg</span>
                    <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <Shirt size={32} className="mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-slate-400">No services added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 pb-safe z-40">
        <button
          onClick={() => { alert("Laundry service published!"); navigate(-1); }}
          className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 hover:bg-cyan-600 transition-colors"
        >
          <Plus size={20} />
          <span>Publish Laundry Service</span>
        </button>
      </div>
    </div>
  );
}
