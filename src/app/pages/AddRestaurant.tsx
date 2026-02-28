import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, DollarSign, Plus, X, Utensils } from "lucide-react";
import { useNavigate } from "react-router";

interface MenuItem {
  name: string;
  price: string;
  category: string;
}

export default function AddRestaurant() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "Fast Food",
    description: "",
    location: "",
    openTime: "08:00",
    closeTime: "22:00",
    priceRange: "$",
    delivery: false,
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Main" });
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addMockImage = () => {
    const mockImages = [
      "photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=400&q=80",
      "photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
      "photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80",
    ];
    if (images.length < 5) {
      setImages([...images, mockImages[images.length % mockImages.length]]);
    }
  };

  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems([...menuItems, { ...newItem }]);
      setNewItem({ name: "", price: "", category: "Main" });
      setShowAddMenu(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Add Restaurant</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Photos */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-3 block">Restaurant Photos</label>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={`https://images.unsplash.com/${img}`} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button onClick={addMockImage} className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-colors flex-shrink-0">
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Restaurant Name</label>
          <input
            type="text"
            placeholder="e.g. Mama's Kitchen"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-50"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Category</label>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {["Fast Food", "Traditional", "Coffee & Snacks", "Pizza", "Tacos", "Healthy"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  formData.category === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-slate-600 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Hours */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Address..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-orange-400"
            />
          </div>
        </div>

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

        {/* Price Range */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Price Range</label>
          <div className="flex space-x-3">
            {["$", "$$", "$$$"].map((range) => (
              <button
                key={range}
                onClick={() => setFormData({ ...formData, priceRange: range })}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  formData.priceRange === range
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-slate-600 border border-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery toggle */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
          <span className="text-sm font-bold text-slate-700">Delivery Available</span>
          <button
            onClick={() => setFormData({ ...formData, delivery: !formData.delivery })}
            className={`w-12 h-7 rounded-full transition-colors ${formData.delivery ? "bg-orange-500" : "bg-gray-200"}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.delivery ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-2 block">Description</label>
          <textarea
            rows={3}
            placeholder="Tell students about your restaurant, specialties..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-white px-4 py-3.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-orange-400 resize-none"
          />
        </div>

        {/* Menu Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-700">Menu Items</label>
            <button
              onClick={() => setShowAddMenu(true)}
              className="flex items-center space-x-1 text-orange-600 text-sm font-semibold"
            >
              <Plus size={16} />
              <span>Add Item</span>
            </button>
          </div>

          {/* Add Menu Item Form */}
          {showAddMenu && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-3 space-y-3">
              <input
                type="text"
                placeholder="Item name (e.g. Chicken Burger)"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm"
              />
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full bg-white pl-8 pr-4 py-3 rounded-xl border border-gray-200 outline-none text-sm"
                  />
                </div>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="bg-white px-3 py-3 rounded-xl border border-gray-200 outline-none text-sm"
                >
                  <option>Main</option>
                  <option>Starter</option>
                  <option>Drink</option>
                  <option>Dessert</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setShowAddMenu(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-500">Cancel</button>
                <button onClick={addMenuItem} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold">Add</button>
              </div>
            </div>
          )}

          {/* Menu Items List */}
          {menuItems.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {menuItems.map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-3 ${i !== menuItems.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Utensils size={14} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-orange-600">{item.price} MAD</span>
                    <button onClick={() => setMenuItems(menuItems.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <Utensils size={32} className="mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-slate-400">No menu items yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 pb-safe z-40">
        <button
          onClick={() => { alert("Restaurant published!"); navigate(-1); }}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Publish Restaurant</span>
        </button>
      </div>
    </div>
  );
}
