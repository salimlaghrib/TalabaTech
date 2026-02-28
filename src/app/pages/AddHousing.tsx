import { useState } from "react";
import { ArrowLeft, Camera, MapPin, DollarSign, Wifi, Coffee, Car, Wind, Plus, X, Home } from "lucide-react";
import { useNavigate } from "react-router";

export default function AddHousing() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "Apartment",
    amenities: [] as string[],
  });

  const amenitiesList = [
    { name: "WiFi", icon: Wifi },
    { name: "Kitchen", icon: Coffee },
    { name: "Parking", icon: Car },
    { name: "AC", icon: Wind },
  ];

  const toggleAmenity = (name: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(name)
        ? prev.amenities.filter(a => a !== name)
        : [...prev.amenities, name],
    }));
  };

  const addMockImage = () => {
    const mockImages = [
      "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
    ];
    if (images.length < 5) {
      setImages([...images, mockImages[images.length % mockImages.length]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Add Housing</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Photos */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-3 block">Photos (max 5)</label>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={`https://images.unsplash.com/${img}`} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                onClick={addMockImage}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex-shrink-0"
              >
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Title</label>
          <input
            type="text"
            placeholder="e.g. Modern Apartment City Center"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
          />
        </div>

        {/* Type */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Housing Type</label>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {["Apartment", "Studio", "Shared", "Private", "Villa"].map((type) => (
              <button
                key={type}
                onClick={() => setFormData({ ...formData, type })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  formData.type === type
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 border border-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 block">Price (MAD/month)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder="1500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-white pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 block">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Errachidia"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Description</label>
          <textarea
            rows={4}
            placeholder="Describe your property, its features, nearby facilities..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-3 block">Amenities</label>
          <div className="grid grid-cols-4 gap-3">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity.name}
                onClick={() => toggleAmenity(amenity.name)}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                  formData.amenities.includes(amenity.name)
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "bg-white border-gray-200 text-slate-400"
                }`}
              >
                <amenity.icon size={22} />
                <span className="text-xs font-medium mt-1">{amenity.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 pb-safe z-40">
        <button
          onClick={() => { alert("Listing published!"); navigate(-1); }}
          className="w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-colors bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Plus size={20} />
          <span>Publish Housing Offer</span>
        </button>
      </div>
    </div>
  );
}
