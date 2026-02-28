import { useState } from "react";
import { Filter, MapPin, Star, Heart, Home, Users, Search, Plus, Eye, TrendingUp, Phone, Mail, Calendar, DollarSign, Wifi, Car, Wind, Utensils, Clock, Building, MessageCircle, ChevronRight, BarChart3, Megaphone, CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

/* ─── Shared listing data ─── */
const allListings = [
  {
    id: 1,
    title: "Modern Apartment City Center",
    price: "2000 MAD/mo",
    location: "Errachidia Center",
    rating: 4.8,
    reviews: 24,
    type: "Apartment",
    announcement: "offer" as const,
    status: "active" as "active" | "rented",
    author: { name: "Ahmed K.", avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Looking for a Roommate near FST",
    price: "800 MAD/mo",
    location: "Near FST",
    rating: 4.5,
    reviews: 12,
    type: "Shared",
    announcement: "demand" as const,
    status: "active" as "active" | "rented",
    author: { name: "Youssef B.", avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
    image: "photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Studio for Student",
    price: "1200 MAD/mo",
    location: "Boutalamine",
    rating: 4.2,
    reviews: 8,
    type: "Studio",
    announcement: "offer" as const,
    status: "rented" as "active" | "rented",
    author: { name: "Sara M.", avatar: "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
    image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Searching Colocation Partner",
    price: "600 MAD/mo",
    location: "Hay Mohammadi",
    rating: 0,
    reviews: 0,
    type: "Shared",
    announcement: "demand" as const,
    status: "active" as "active" | "rented",
    author: { name: "Fatima Z.", avatar: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
    image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Private Room with Balcony",
    price: "1500 MAD/mo",
    location: "Hay Mohammadi",
    rating: 4.9,
    reviews: 32,
    type: "Private",
    announcement: "offer" as const,
    status: "active" as "active" | "rented",
    author: { name: "Omar H.", avatar: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
    image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Need Roommate - 2BR Apartment",
    price: "700 MAD/mo",
    location: "Near Campus",
    rating: 0,
    reviews: 0,
    type: "Shared",
    announcement: "demand" as const,
    status: "active" as "active" | "rented",
    author: { name: "Amina L.", avatar: "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
];

/* ─── Student housing requests (demand-side details) ─── */
const studentRequests = [
  {
    id: 101,
    name: "Youssef B.",
    avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    title: "Looking for a room near FST campus",
    budget: "800 MAD/mo",
    location: "Near FST",
    roommates: 1,
    moveIn: "March 2026",
    features: ["Wi-Fi", "Furnished", "Kitchen"],
    phone: "06 12 34 56 78",
    email: "youssef@student.ma",
    posted: "2 days ago",
  },
  {
    id: 102,
    name: "Fatima Z.",
    avatar: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    title: "Searching for colocation near campus",
    budget: "600 MAD/mo",
    location: "Hay Mohammadi",
    roommates: 2,
    moveIn: "April 2026",
    features: ["Parking", "Air Conditioning", "Private Bathroom"],
    phone: "06 98 76 54 32",
    email: "fatima@student.ma",
    posted: "5 days ago",
  },
  {
    id: 103,
    name: "Amina L.",
    avatar: "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    title: "Need Roommate - 2BR apartment share",
    budget: "700 MAD/mo",
    location: "Near Campus",
    roommates: 1,
    moveIn: "March 2026",
    features: ["Wi-Fi", "Furnished", "Study Room"],
    phone: "06 55 44 33 22",
    email: "amina@student.ma",
    posted: "1 day ago",
  },
  {
    id: 104,
    name: "Karim T.",
    avatar: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    title: "Room wanted for next semester",
    budget: "1000 MAD/mo",
    location: "Errachidia Center",
    roommates: 0,
    moveIn: "September 2026",
    features: ["Wi-Fi", "Air Conditioning", "Kitchen", "Furnished"],
    phone: "06 11 22 33 44",
    email: "karim@student.ma",
    posted: "3 days ago",
  },
];

/* ─── Provider's own listings (mock) ─── */
const initialMyListings = [
  {
    id: 1,
    title: "Modern Apartment City Center",
    price: "2000 MAD/mo",
    location: "Errachidia Center",
    image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    views: 142,
    inquiries: 8,
    status: "active" as "active" | "rented" | "draft",
    rating: 4.8,
  },
  {
    id: 5,
    title: "Private Room with Balcony",
    price: "1500 MAD/mo",
    location: "Hay Mohammadi",
    image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    views: 89,
    inquiries: 3,
    status: "active" as "active" | "rented" | "draft",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Studio for Student",
    price: "1200 MAD/mo",
    location: "Boutalamine",
    image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    views: 54,
    inquiries: 1,
    status: "rented" as "active" | "rented" | "draft",
    rating: 4.2,
  },
];

/* ════════════════════════════════════════════════════
   PROVIDER DASHBOARD VIEW
   ════════════════════════════════════════════════════ */
function ProviderHousingDashboard() {
  const navigate = useNavigate();
  const { userName } = useUser();
  const [providerTab, setProviderTab] = useState<"listings" | "requests">("listings");
  const [myListings, setMyListings] = useState(initialMyListings);

  const changeStatus = (id: number, newStatus: "active" | "rented" | "draft") => {
    setMyListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const tabs = [
    { key: "listings" as const, label: "My Listings", icon: Building, count: myListings.length },
    { key: "requests" as const, label: "Requests", icon: Megaphone, count: studentRequests.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-blue-200 text-sm font-medium">Housing Provider</p>
            <h1 className="text-2xl font-bold text-white">{userName}'s Dashboard</h1>
          </div>
          <button
            onClick={() => navigate("/app/housing/add")}
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/30 hover:bg-white/30 transition-all"
          >
            <Plus size={18} className="text-white" />
            <span className="text-white text-sm font-semibold">Add Listing</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{myListings.length}</p>
            <p className="text-blue-200 text-xs mt-0.5">Listings</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{myListings.reduce((sum, l) => sum + l.views, 0)}</p>
            <p className="text-blue-200 text-xs mt-0.5">Total Views</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{studentRequests.length}</p>
            <p className="text-blue-200 text-xs mt-0.5">New Requests</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4">
        {/* Tab Switcher */}
        <div className="flex bg-white rounded-2xl p-1 shadow-md border border-gray-100 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setProviderTab(tab.key)}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                providerTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  providerTab === tab.key ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── Tab: My Listings ─── */}
        {providerTab === "listings" && (
          <div className="space-y-4">
            {myListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div
                  className="flex cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/app/housing/${listing.id}`)}
                >
                  <div className="w-28 h-28 flex-shrink-0">
                    <img
                      src={`https://images.unsplash.com/${listing.image}`}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight flex-1 pr-2">{listing.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-700"
                          : listing.status === "rented"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-500"
                      }`}>
                        {listing.status === "active" ? "Active" : listing.status === "rented" ? "Rented" : "Draft"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center mb-2">
                      <MapPin size={12} className="mr-1" />{listing.location}
                    </p>
                    <p className="text-sm font-bold text-blue-600 mb-2">{listing.price}</p>
                    <div className="flex items-center space-x-4 text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Eye size={12} />
                        <span>{listing.views} views</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle size={12} />
                        <span>{listing.inquiries} inquiries</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star size={12} className="text-yellow-500" fill="currentColor" />
                        <span>{listing.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Status actions */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => changeStatus(listing.id, "active")}
                    className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                      listing.status === "active" ? "bg-green-50 text-green-700" : "text-slate-400 hover:bg-gray-50"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => changeStatus(listing.id, "rented")}
                    className={`flex-1 py-2.5 text-xs font-semibold transition-colors border-x border-gray-100 ${
                      listing.status === "rented" ? "bg-orange-50 text-orange-700" : "text-slate-400 hover:bg-gray-50"
                    }`}
                  >
                    Rented
                  </button>
                  <button
                    onClick={() => changeStatus(listing.id, "draft")}
                    className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                      listing.status === "draft" ? "bg-gray-100 text-gray-700" : "text-slate-400 hover:bg-gray-50"
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </div>
            ))}

            {/* Add new listing card */}
            <button
              onClick={() => navigate("/app/housing/add")}
              className="w-full bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 hover:bg-blue-100 hover:border-blue-300 transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus size={24} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-600">Add New Listing</span>
              <span className="text-xs text-blue-400">Post a new housing offer</span>
            </button>
          </div>
        )}

        {/* ─── Tab: Student Requests ─── */}
        {providerTab === "requests" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-2">
              <p className="text-xs text-blue-700 font-medium flex items-center">
                <Megaphone size={14} className="mr-2 text-blue-500" />
                Students looking for housing. Contact them if your property matches!
              </p>
            </div>

            {studentRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Request header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start space-x-3 mb-3">
                    <img
                      src={`https://images.unsplash.com/${req.avatar}`}
                      alt={req.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">{req.name}</h3>
                        <span className="text-[11px] text-slate-400">{req.posted}</span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium mt-0.5">{req.title}</p>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center space-x-2 bg-green-50 rounded-lg px-3 py-2">
                      <DollarSign size={14} className="text-green-600" />
                      <div>
                        <p className="text-[10px] text-green-600 font-medium">Budget</p>
                        <p className="text-xs font-bold text-green-800">{req.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
                      <MapPin size={14} className="text-blue-600" />
                      <div>
                        <p className="text-[10px] text-blue-600 font-medium">Location</p>
                        <p className="text-xs font-bold text-blue-800">{req.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-purple-50 rounded-lg px-3 py-2">
                      <Calendar size={14} className="text-purple-600" />
                      <div>
                        <p className="text-[10px] text-purple-600 font-medium">Move-in</p>
                        <p className="text-xs font-bold text-purple-800">{req.moveIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-amber-50 rounded-lg px-3 py-2">
                      <Users size={14} className="text-amber-600" />
                      <div>
                        <p className="text-[10px] text-amber-600 font-medium">Roommates</p>
                        <p className="text-xs font-bold text-amber-800">{req.roommates === 0 ? "Solo" : `${req.roommates} person(s)`}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desired features */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {req.features.map((f) => (
                      <span key={f} className="px-2.5 py-1 bg-gray-50 text-[11px] font-medium text-slate-600 rounded-full border border-gray-100">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact actions */}
                <div className="flex border-t border-gray-100">
                  <a
                    href={`tel:${req.phone}`}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 text-green-600 hover:bg-green-50 transition-colors border-r border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={16} />
                    <span className="text-xs font-semibold">Call</span>
                  </a>
                  <a
                    href={`mailto:${req.email}`}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail size={16} />
                    <span className="text-xs font-semibold">Email</span>
                  </a>
                  <button
                    className="flex-1 flex items-center justify-center space-x-2 py-3 text-purple-600 hover:bg-purple-50 transition-colors"
                    onClick={() => navigate(`/app/chatroom/${req.id}`)}
                  >
                    <MessageCircle size={16} />
                    <span className="text-xs font-semibold">Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   STUDENT / DEFAULT VIEW
   ════════════════════════════════════════════════════ */
export default function Housing() {
  const { role, approvalStatus } = useUser();

  if (role === "provider" && approvalStatus === "approved") {
    return <ProviderHousingDashboard />;
  }

  return <StudentHousingView />;
}

function StudentHousingView() {
  const navigate = useNavigate();
  const { role, approvalStatus } = useUser();
  const [filterType, setFilterType] = useState("All");
  const [announcementType, setAnnouncementType] = useState<"all" | "offer" | "demand">("all");

  const filteredListings = allListings
    .filter(l => announcementType === "all" || l.announcement === announcementType)
    .filter(l => filterType === "All" || l.type === filterType);

  return (
    <div className="p-6 min-h-screen bg-gray-50 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Find Housing</h1>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-200">
          <Filter size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Announcement Type Toggle */}
      <div className="flex bg-white rounded-2xl p-1 mb-5 shadow-sm border border-gray-100">
        <button
          onClick={() => setAnnouncementType("all")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            announcementType === "all"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span>All</span>
        </button>
        <button
          onClick={() => setAnnouncementType("offer")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            announcementType === "offer"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Home size={16} />
          <span>Offers</span>
        </button>
        <button
          onClick={() => setAnnouncementType("demand")}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            announcementType === "demand"
              ? "bg-orange-500 text-white shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Users size={16} />
          <span>Roommates</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Apartment", "Studio", "Shared", "Private"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterType === type
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 border border-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-slate-500 font-medium">No listings found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
        {filteredListings.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/app/housing/${item.id}`)}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer ${item.status === "rented" ? "opacity-75" : ""}`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={`https://images.unsplash.com/${item.image}`}
                alt={item.title}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${item.status === "rented" ? "grayscale-[40%]" : ""}`}
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                <Heart size={18} className="text-slate-600 hover:text-red-500 transition-colors" />
              </button>

              {/* Rented overlay */}
              {item.status === "rented" && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold text-lg shadow-lg -rotate-12 border-2 border-white">
                    RENTED
                  </div>
                </div>
              )}
              
              {/* Announcement type badge */}
              <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-sm backdrop-blur-sm ${
                item.announcement === "offer"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-orange-500/90 text-white"
              }`}>
                {item.announcement === "offer" ? (
                  <>
                    <Home size={12} />
                    <span>Offer</span>
                  </>
                ) : (
                  <>
                    <Users size={12} />
                    <span>Looking for Roommate</span>
                  </>
                )}
              </div>

              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                <span className="text-white font-bold text-sm">{item.price}</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight flex-1">{item.title}</h3>
                {item.rating > 0 && (
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg ml-2">
                    <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-xs font-bold text-yellow-700">{item.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-slate-500 text-sm mb-3">
                <MapPin size={16} className="mr-1" />
                {item.location}
              </div>

              {/* Author info */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center">
                  <img
                    src={`https://images.unsplash.com/${item.author.avatar}`}
                    alt={item.author.name}
                    className="w-7 h-7 rounded-full object-cover mr-2 border border-gray-200"
                  />
                  <span className="text-xs font-medium text-slate-500">
                    {item.announcement === "offer" ? "Posted by" : "Requested by"}{" "}
                    <span className="text-slate-700 font-semibold">{item.author.name}</span>
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-600">View Details</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button - Approved Provider: add offer / Student: add request */}
      {role === "provider" && approvalStatus === "approved" && (
        <button
          onClick={() => navigate("/app/housing/add")}
          className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-40 hover:scale-105 active:scale-95"
        >
          <Plus size={28} />
        </button>
      )}
      {role === "student" && <StudentFloatingActions />}
    </div>
  );
}

function StudentFloatingActions() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Expanded options */}
      {open && (
        <div className="fixed bottom-40 right-6 z-40 flex flex-col items-end space-y-3">
          <button
            onClick={() => { setOpen(false); navigate("/app/housing/request"); }}
            className="flex items-center space-x-3 bg-white pl-4 pr-5 py-3 rounded-2xl shadow-xl border border-gray-100 hover:bg-orange-50 transition-colors"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Home size={20} className="text-orange-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Housing Request</p>
              <p className="text-[11px] text-slate-500">Describe what you need</p>
            </div>
          </button>
          <button
            onClick={() => { setOpen(false); navigate("/app/housing/roommate"); }}
            className="flex items-center space-x-3 bg-white pl-4 pr-5 py-3 rounded-2xl shadow-xl border border-gray-100 hover:bg-purple-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Find a Roommate</p>
              <p className="text-[11px] text-slate-500">Look for a colocation partner</p>
            </div>
          </button>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all z-40 hover:scale-105 active:scale-95 ${
          open ? "bg-slate-700 rotate-45" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {open ? <X size={28} /> : <Plus size={28} />}
      </button>
    </>
  );
}