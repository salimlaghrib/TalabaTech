import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, Star, Phone, MessageCircle, Heart, Share2, Wifi, Coffee, Car, Wind, Home, Users, Calendar } from "lucide-react";

interface Listing {
  id: string | undefined;
  title: string;
  price: string;
  period: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  announcement: "offer" | "demand";
  amenities: { name: string; icon: React.ComponentType<{ size: number; className?: string }> }[];
  author: {
    name: string;
    image: string;
    joined: string;
    role: string;
  };
  images: string[];
  // demand-specific fields
  preferences?: string[];
  moveInDate?: string;
  currentOccupants?: number;
}

const listingsData: Record<string, Listing> = {
  "1": {
    id: "1",
    title: "Modern Apartment City Center",
    price: "2000 MAD",
    period: "/month",
    location: "Errachidia Center, Rue 5",
    rating: 4.8,
    reviews: 24,
    announcement: "offer",
    description: "A beautiful, fully furnished apartment located in the heart of Errachidia. Perfect for students looking for a quiet and comfortable place to study. Includes high-speed internet and utilities.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: Coffee },
      { name: "Parking", icon: Car },
      { name: "AC", icon: Wind },
    ],
    author: {
      name: "Ahmed K.",
      image: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      joined: "2 years ago",
      role: "Landlord",
    },
    images: [
      "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    ],
  },
  "2": {
    id: "2",
    title: "Looking for a Roommate near FST",
    price: "800 MAD",
    period: "/month (per person)",
    location: "Near FST, Errachidia",
    rating: 0,
    reviews: 0,
    announcement: "demand",
    description: "Salut! Je suis étudiant en 2ème année informatique à la FST. Je cherche un(e) colocataire sérieux(se) pour partager un appartement 2 chambres près de la fac. L'appartement est déjà meublé avec internet. Ambiance calme pour étudier, mais aussi conviviale!",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: Coffee },
    ],
    author: {
      name: "Youssef B.",
      image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      joined: "6 months ago",
      role: "Student",
    },
    images: [
      "photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    ],
    preferences: ["Non-smoker", "Student preferred", "Quiet after 22h", "Share cleaning"],
    moveInDate: "Nov 1, 2024",
    currentOccupants: 1,
  },
  "3": {
    id: "3",
    title: "Studio for Student",
    price: "1200 MAD",
    period: "/month",
    location: "Boutalamine, Errachidia",
    rating: 4.2,
    reviews: 8,
    announcement: "offer",
    description: "Cozy studio apartment ideal for a single student. Located in a quiet neighborhood with easy access to public transport. The studio is fully equipped with a small kitchen and private bathroom.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: Coffee },
      { name: "AC", icon: Wind },
    ],
    author: {
      name: "Sara M.",
      image: "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      joined: "1 year ago",
      role: "Landlord",
    },
    images: [
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    ],
  },
  "4": {
    id: "4",
    title: "Searching Colocation Partner",
    price: "600 MAD",
    period: "/month (per person)",
    location: "Hay Mohammadi, Errachidia",
    rating: 0,
    reviews: 0,
    announcement: "demand",
    description: "Je cherche une colocataire pour un grand appartement 3 chambres. L'appart est spacieux, bien situé et pas loin du centre. On est actuellement 2, on cherche une 3ème personne pour partager les frais. Filles uniquement svp.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: Coffee },
      { name: "Parking", icon: Car },
    ],
    author: {
      name: "Fatima Z.",
      image: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      joined: "3 months ago",
      role: "Student",
    },
    images: [
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    ],
    preferences: ["Girls only", "Student preferred", "Clean & tidy", "Respect privacy"],
    moveInDate: "Oct 15, 2024",
    currentOccupants: 2,
  },
  "5": {
    id: "5",
    title: "Private Room with Balcony",
    price: "1500 MAD",
    period: "/month",
    location: "Hay Mohammadi, Errachidia",
    rating: 4.9,
    reviews: 32,
    announcement: "offer",
    description: "A spacious private room with a beautiful balcony overlooking the city. Perfect for students who want privacy and comfort. Includes all utilities and building security.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: Coffee },
      { name: "Parking", icon: Car },
      { name: "AC", icon: Wind },
    ],
    author: {
      name: "Omar H.",
      image: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
      joined: "3 years ago",
      role: "Landlord",
    },
    images: [
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    ],
  },
  "6": {
    id: "6",
    title: "Need Roommate - 2BR Apartment",
    price: "700 MAD",
    period: "/month (per person)",
    location: "Near Campus, Errachidia",
    rating: 0,
    reviews: 0,
    announcement: "demand",
    description: "Salut! J'ai un appartement 2 chambres à 5 min de la fac. Je cherche un(e) coloc cool et respectueux(se). L'appart est neuf, bien meublé. On partage le salon, la cuisine et la salle de bain. Ambiance chill mais studieuse!",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: Coffee },
    ],
    author: {
      name: "Amina L.",
      image: "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      joined: "2 months ago",
      role: "Student",
    },
    images: [
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    ],
    preferences: ["Non-smoker", "Respectful", "Share expenses equally"],
    moveInDate: "ASAP",
    currentOccupants: 1,
  },
};

export default function HousingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = listingsData[id || "1"] || listingsData["1"];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Image Area */}
      <div className="relative h-72">
        <img
          src={`https://images.unsplash.com/${listing.images[0]}`}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex space-x-3">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Announcement type badge */}
        <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-md backdrop-blur-sm ${
          listing.announcement === "offer"
            ? "bg-emerald-500/90 text-white"
            : "bg-orange-500/90 text-white"
        }`}>
          {listing.announcement === "offer" ? (
            <>
              <Home size={16} />
              <span>Housing Offer</span>
            </>
          ) : (
            <>
              <Users size={16} />
              <span>Looking for Roommate</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 -mt-6 relative bg-white rounded-t-3xl shadow-top">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{listing.title}</h1>
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin size={16} className="mr-1 text-blue-500" />
              {listing.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">{listing.price}</div>
            <div className="text-xs text-slate-400">{listing.period}</div>
          </div>
        </div>

        {listing.rating > 0 && (
          <div className="flex items-center space-x-4 mb-6 py-4 border-y border-gray-100">
            <div className="flex items-center pr-4 border-r border-gray-100">
              <Star size={20} className="text-yellow-400 mr-2" fill="currentColor" />
              <div>
                <div className="font-bold text-slate-900">{listing.rating}</div>
                <div className="text-xs text-slate-400">Rating</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-bold text-slate-900">{listing.reviews}</div>
              <div className="text-xs text-slate-400 ml-2">Reviews</div>
            </div>
          </div>
        )}

        {/* Demand-specific: Move-in date & current occupants */}
        {listing.announcement === "demand" && (
          <div className="flex space-x-3 mb-6">
            {listing.moveInDate && (
              <div className="flex-1 bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center space-x-3">
                <Calendar size={20} className="text-orange-500" />
                <div>
                  <div className="text-xs text-slate-400">Move-in Date</div>
                  <div className="font-bold text-slate-900 text-sm">{listing.moveInDate}</div>
                </div>
              </div>
            )}
            {listing.currentOccupants !== undefined && (
              <div className="flex-1 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center space-x-3">
                <Users size={20} className="text-blue-500" />
                <div>
                  <div className="text-xs text-slate-400">Current</div>
                  <div className="font-bold text-slate-900 text-sm">{listing.currentOccupants} occupant{listing.currentOccupants > 1 ? "s" : ""}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Description</h2>
          <p className="text-slate-500 leading-relaxed text-sm">{listing.description}</p>
        </div>

        {/* Demand-specific: Preferences */}
        {listing.announcement === "demand" && listing.preferences && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Roommate Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {listing.preferences.map((pref) => (
                <span
                  key={pref}
                  className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  {pref}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Amenities</h2>
          <div className="grid grid-cols-4 gap-4">
            {listing.amenities.map((amenity) => (
              <div key={amenity.name} className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <amenity.icon size={24} className="text-slate-600 mb-2" />
                <span className="text-xs font-medium text-slate-600">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {listing.announcement === "offer" ? "Landlord" : "Posted by"}
          </h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center">
              <img 
                src={`https://images.unsplash.com/${listing.author.image}`} 
                alt={listing.author.name} 
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <div className="font-bold text-slate-900">{listing.author.name}</div>
                <div className="text-xs text-slate-400">
                  {listing.author.role} · Joined {listing.author.joined}
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/app/chatroom/${id}?type=housing`)}
              className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle size={20} className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 pb-safe z-40 flex space-x-3">
        <button 
          onClick={() => navigate(`/app/chatroom/${id}?type=housing`)}
          className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors"
        >
          <MessageCircle size={18} />
          <span>Message</span>
        </button>
        {listing.announcement === "offer" ? (
          <button className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2">
            <Phone size={18} />
            <span>Call Now</span>
          </button>
        ) : (
          <button className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors">
            <Users size={18} />
            <span>Apply as Roommate</span>
          </button>
        )}
      </div>
    </div>
  );
}