import { Search, MapPin, MessageCircle, Building, Eye, Plus, BarChart3, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

/* ════════════════════════════════════════════════════
   PROVIDER HOME — Dashboard focused
   ════════════════════════════════════════════════════ */
function ProviderHome() {
  const navigate = useNavigate();
  const { userName, approvalStatus } = useUser();

  /* ─── Pending / Rejected state ─── */
  if (approvalStatus !== "approved") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Hello, {userName}! 🏠</h1>
            <p className="text-slate-500">Housing Provider</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm cursor-pointer" onClick={() => navigate("/app/profile")}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className={`rounded-2xl p-6 text-center ${approvalStatus === "pending" ? "bg-yellow-50 border border-yellow-200" : "bg-red-50 border border-red-200"}`}>
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${approvalStatus === "pending" ? "bg-yellow-100" : "bg-red-100"}`}>
            <Clock size={32} className={approvalStatus === "pending" ? "text-yellow-600" : "text-red-600"} />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${approvalStatus === "pending" ? "text-yellow-800" : "text-red-800"}`}>
            {approvalStatus === "pending" ? "Account Under Review" : "Account Rejected"}
          </h2>
          <p className={`text-sm ${approvalStatus === "pending" ? "text-yellow-700" : "text-red-700"}`}>
            {approvalStatus === "pending"
              ? "Your housing provider account is being reviewed by our team. You'll be able to manage listings once approved."
              : "Your provider request was rejected. Please contact support for more information."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Provider Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-200 text-sm font-medium">Housing Provider</p>
            <h1 className="text-2xl font-bold text-white">Hello, {userName}! 🏠</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/app/chat")}
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/25 transition-colors relative"
            >
              <MessageCircle size={20} className="text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">3</span>
              </div>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden border-2 border-white/30 cursor-pointer" onClick={() => navigate("/app/profile")}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-blue-200 text-xs mt-0.5">Active Listings</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">285</p>
            <p className="text-blue-200 text-xs mt-0.5">Total Views</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-blue-200 text-xs mt-0.5">Inquiries</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Quick Actions */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => navigate("/app/housing/add")}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Plus size={18} />
            <span>Add Listing</span>
          </button>
          <button
            onClick={() => navigate("/app/housing")}
            className="flex-1 flex items-center justify-center space-x-2 bg-white text-blue-600 py-3.5 rounded-xl font-semibold text-sm border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
          >
            <BarChart3 size={18} />
            <span>My Dashboard</span>
          </button>
        </div>

        {/* My Listings Preview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">My Listings</h2>
            <button onClick={() => navigate("/app/housing")} className="text-blue-600 text-sm font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, title: "Modern Apartment City Center", price: "2000 MAD/mo", location: "Errachidia Center", views: 142, inquiries: 8, status: "active", image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
              { id: 5, title: "Private Room with Balcony", price: "1500 MAD/mo", location: "Hay Mohammadi", views: 89, inquiries: 3, status: "active", image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80" },
            ].map((listing) => (
              <div
                key={listing.id}
                onClick={() => navigate(`/app/housing/${listing.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img src={`https://images.unsplash.com/${listing.image}`} alt={listing.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight flex-1 pr-2">{listing.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Active</span>
                    </div>
                    <p className="text-sm font-bold text-blue-600 mt-1">{listing.price}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1.5">
                      <span className="flex items-center space-x-1"><Eye size={11} /><span>{listing.views} views</span></span>
                      <span className="flex items-center space-x-1"><MessageCircle size={11} /><span>{listing.inquiries} inquiries</span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Student Requests */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Student Requests</h2>
            <button onClick={() => navigate("/app/housing")} className="text-blue-600 text-sm font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Youssef B.", budget: "800 MAD/mo", location: "Near FST", features: ["Wi-Fi", "Furnished"], time: "2 days ago" },
              { name: "Amina L.", budget: "700 MAD/mo", location: "Near Campus", features: ["Study Room", "Wi-Fi"], time: "1 day ago" },
              { name: "Karim T.", budget: "1000 MAD/mo", location: "Errachidia Center", features: ["Kitchen", "AC"], time: "3 days ago" },
            ].map((req, i) => (
              <div
                key={i}
                onClick={() => navigate("/app/housing")}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900">{req.name}</span>
                  <span className="text-[11px] text-slate-400">{req.time}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mb-2">
                  <span className="flex items-center"><MapPin size={12} className="mr-1" />{req.location}</span>
                  <span className="font-semibold text-green-600">{req.budget}</span>
                </div>
                <div className="flex space-x-1.5">
                  {req.features.map(f => (
                    <span key={f} className="px-2 py-0.5 bg-gray-50 rounded-full text-[10px] text-slate-500 border border-gray-100">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   STUDENT HOME — Browse & discover
   ════════════════════════════════════════════════════ */
function StudentHome() {
  const navigate = useNavigate();
  const { userName } = useUser();

  const featuredListings = [
    { id: 1, title: "Sunny Student Apt", price: "1500 MAD", location: "City Center, Errachidia", rating: 4.8, image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Cozy Studio Near FST", price: "1200 MAD", location: "Near Faculty", rating: 4.5, image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" },
  ];

  const roommateRequests = [
    { id: 2, name: "Youssef B.", location: "Near FST", budget: "800 MAD/mo", image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
    { id: 4, name: "Fatima Z.", location: "Hay Mohammadi", budget: "600 MAD/mo", image: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
  ];

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, {userName}! 👋</h1>
          <p className="text-slate-500">Find what you need today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/app/chat")}
            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm hover:bg-blue-100 transition-colors relative"
          >
            <MessageCircle size={20} className="text-blue-600" />
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">2</span>
            </div>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm cursor-pointer" onClick={() => navigate("/app/profile")}>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for housing, roommates..."
          className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl shadow-sm border border-gray-100 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Featured Housing */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Featured Housing</h2>
          <button onClick={() => navigate("/app/housing")} className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {featuredListings.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/app/housing/${item.id}`)}
              className="min-w-[240px] bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer"
            >
              <div className="h-32 bg-gray-200 relative">
                <img src={`https://images.unsplash.com/${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-900">{item.price}</div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                <div className="flex items-center text-slate-500 text-xs mb-2">
                  <MapPin size={12} className="mr-1" />
                  {item.location}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400 text-xs">{"★".repeat(Math.floor(item.rating))}</div>
                  <span className="text-xs text-slate-400">({item.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roommate Requests */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Looking for Roommates</h2>
          <button onClick={() => navigate("/app/housing")} className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        <div className="space-y-3">
          {roommateRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => navigate(`/app/housing/${req.id}`)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <img src={`https://images.unsplash.com/${req.image}`} alt={req.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-200" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900">{req.name}</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span className="flex items-center"><MapPin size={11} className="mr-0.5" />{req.location}</span>
                  <span className="text-green-600 font-semibold">{req.budget}</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN EXPORT — switches view by role
   ════════════════════════════════════════════════════ */
export default function Home() {
  const { role } = useUser();

  if (role === "provider") {
    return <ProviderHome />;
  }

  return <StudentHome />;
}
