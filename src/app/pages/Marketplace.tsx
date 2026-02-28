import { ArrowLeft, Plus, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router";

export default function Marketplace() {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      name: "Calculus Textbook",
      price: "150 MAD",
      condition: "Used - Good",
      seller: "Sara M.",
      image: "photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Desk Lamp",
      price: "80 MAD",
      condition: "Like New",
      seller: "Omar K.",
      image: "photo-1534073828943-f801091a7d58?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Scientific Calculator",
      price: "120 MAD",
      condition: "Used",
      seller: "Youssef A.",
      image: "photo-1587145820266-a2651c4694d9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Small Fridge",
      price: "600 MAD",
      condition: "Used - Fair",
      seller: "Lina B.",
      image: "photo-1571175443880-49e1d58b794a?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 bg-white rounded-full shadow-sm border border-gray-200"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Marketplace</h1>
        </div>
        <button className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors">
          <Plus size={24} />
        </button>
      </div>

      <div className="flex space-x-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm"
          />
        </div>
        <button className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
          <Filter size={18} className="text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
            <div className="h-32 overflow-hidden bg-gray-200 relative">
              <img
                src={`https://images.unsplash.com/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-900 uppercase tracking-wide">
                {item.condition}
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">{item.name}</h3>
              <div className="font-bold text-blue-600 text-sm mb-2">{item.price}</div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-[10px] text-slate-400">By {item.seller}</span>
                <button className="text-[10px] font-bold text-slate-900 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                  Offer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}