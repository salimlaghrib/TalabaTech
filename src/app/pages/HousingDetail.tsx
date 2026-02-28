import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, Star, Phone, MessageCircle, Heart, Share2, Wifi, Coffee, Car, Wind, Home, Users, Calendar, BedDouble, Bath, Ruler, CheckCircle } from "lucide-react";

interface Roommate {
  name: string;
  age: number;
  faculty: string;
  image: string;
}

interface Listing {
  id: string | undefined;
  title: string;
  price: string;
  period: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  announcement: "offer" | "demand" | "colocation";
  amenities: { name: string; icon: React.ComponentType<{ size: number; className?: string }> }[];
  author: {
    name: string;
    image: string;
    joined: string;
    role: string;
    phone?: string;
    whatsapp?: string;
  };
  images: string[];
  // demand-specific fields
  preferences?: string[];
  moveInDate?: string;
  currentOccupants?: number;
  // colocation-specific fields
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  furnished?: boolean;
  availablePlaces?: number;
  totalPlaces?: number;
  roommates?: Roommate[];
}

const listingsData: Record<string, Listing> = {
  "1": {
    id: "1",
    title: "Chambre en coloc - Apt meublé",
    price: "750 MAD",
    period: "/mois",
    location: "Near FST, Errachidia",
    rating: 4.8,
    reviews: 12,
    announcement: "colocation",
    description: "Appartement spacieux et entièrement meublé, idéal pour les étudiants. Chambre privée avec lit, bureau et armoire. Espaces communs partagés : salon, cuisine équipée et salle de bain. Ambiance calme et studieuse, proche de la FST.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Cuisine", icon: Coffee },
      { name: "Parking", icon: Car },
      { name: "AC", icon: Wind },
    ],
    author: {
      name: "Ahmed K.",
      image: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      joined: "2 ans",
      role: "Propriétaire",
      phone: "0661-234567",
      whatsapp: "0661-234567",
    },
    images: [
      "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    ],
    rooms: 4,
    bedrooms: 3,
    bathrooms: 1,
    surface: 85,
    furnished: true,
    availablePlaces: 1,
    totalPlaces: 3,
    roommates: [
      { name: "Youssef B.", age: 21, faculty: "FST - Informatique", image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
      { name: "Karim T.", age: 22, faculty: "FST - Maths", image: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    ],
  },
  "2": {
    id: "2",
    title: "Studio partagé pour étudiants",
    price: "600 MAD",
    period: "/mois",
    location: "Hay Mohammadi, Errachidia",
    rating: 4.5,
    reviews: 8,
    announcement: "colocation",
    description: "Studio partagé entre 2 étudiants, situé dans un quartier calme à Hay Mohammadi. Chaque colocataire a son espace privé. L'appartement est proche du campus et des commerces. Ambiance studieuse garantie.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Cuisine", icon: Coffee },
    ],
    author: {
      name: "Youssef B.",
      image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      joined: "6 mois",
      role: "Étudiant",
      phone: "0677-345678",
      whatsapp: "0677-345678",
    },
    images: [
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    ],
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    surface: 55,
    furnished: false,
    availablePlaces: 1,
    totalPlaces: 2,
    roommates: [
      { name: "Youssef B.", age: 21, faculty: "FST - Informatique", image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
    ],
  },
  "3": {
    id: "3",
    title: "Coloc moderne centre-ville",
    price: "900 MAD",
    period: "/mois",
    location: "Centre Errachidia",
    rating: 4.9,
    reviews: 18,
    announcement: "colocation",
    description: "Grand appartement moderne au centre-ville, parfait pour les étudiants. 4 chambres spacieuses, salon lumineux, cuisine entièrement équipée. Proche de tous les commerces et transports. 2 places disponibles immédiatement.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Cuisine", icon: Coffee },
      { name: "AC", icon: Wind },
      { name: "Parking", icon: Car },
    ],
    author: {
      name: "Sara M.",
      image: "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      joined: "1 an",
      role: "Propriétaire",
      phone: "0655-789012",
      whatsapp: "0655-789012",
    },
    images: [
      "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    ],
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    surface: 120,
    furnished: true,
    availablePlaces: 2,
    totalPlaces: 4,
    roommates: [
      { name: "Amina L.", age: 22, faculty: "FST - Physique", image: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
      { name: "Fatima Z.", age: 20, faculty: "FLSH - Anglais", image: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
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
            : listing.announcement === "colocation"
            ? "bg-blue-500/90 text-white"
            : "bg-orange-500/90 text-white"
        }`}>
          {listing.announcement === "offer" ? (
            <>
              <Home size={16} />
              <span>Housing Offer</span>
            </>
          ) : listing.announcement === "colocation" ? (
            <>
              <Users size={16} />
              <span>Colocation</span>
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

        {/* ─── Colocation: Room Details ─── */}
        {listing.announcement === "colocation" && (
          <>
            {/* Room Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {listing.bedrooms !== undefined && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center space-x-3">
                  <BedDouble size={22} className="text-blue-500" />
                  <div>
                    <div className="text-xs text-slate-400">Chambres</div>
                    <div className="font-bold text-slate-900 text-sm">{listing.bedrooms}</div>
                  </div>
                </div>
              )}
              {listing.bathrooms !== undefined && (
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex items-center space-x-3">
                  <Bath size={22} className="text-purple-500" />
                  <div>
                    <div className="text-xs text-slate-400">Salles de bain</div>
                    <div className="font-bold text-slate-900 text-sm">{listing.bathrooms}</div>
                  </div>
                </div>
              )}
              {listing.surface !== undefined && (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center space-x-3">
                  <Ruler size={22} className="text-green-500" />
                  <div>
                    <div className="text-xs text-slate-400">Surface</div>
                    <div className="font-bold text-slate-900 text-sm">{listing.surface} m²</div>
                  </div>
                </div>
              )}
              {listing.availablePlaces !== undefined && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center space-x-3">
                  <Users size={22} className="text-orange-500" />
                  <div>
                    <div className="text-xs text-slate-400">Places dispo</div>
                    <div className="font-bold text-slate-900 text-sm">{listing.availablePlaces} / {listing.totalPlaces}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Furnished badge */}
            <div className={`flex items-center space-x-3 p-4 rounded-2xl mb-6 ${listing.furnished ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50 border border-gray-200"}`}>
              <CheckCircle size={22} className={listing.furnished ? "text-emerald-500" : "text-gray-400"} />
              <div>
                <div className="font-bold text-slate-900 text-sm">{listing.furnished ? "Meublé" : "Non meublé"}</div>
                <div className="text-xs text-slate-400">{listing.furnished ? "Lit, bureau, armoire inclus" : "Vous devez apporter vos meubles"}</div>
              </div>
            </div>

            {/* Current Roommates */}
            {listing.roommates && listing.roommates.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Colocataires actuels</h2>
                <div className="space-y-3">
                  {listing.roommates.map((rm, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <img
                        src={`https://images.unsplash.com/${rm.image}`}
                        alt={rm.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-slate-900 text-sm">{rm.name}</div>
                        <div className="text-xs text-slate-500">{rm.age} ans · {rm.faculty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
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
            {listing.announcement === "offer" ? "Landlord" : listing.announcement === "colocation" ? "Contact" : "Posted by"}
          </h2>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <img 
                  src={`https://images.unsplash.com/${listing.author.image}`} 
                  alt={listing.author.name} 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-bold text-slate-900">{listing.author.name}</div>
                  <div className="text-xs text-slate-400">
                    {listing.author.role} · {listing.author.joined}
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
            {/* Phone / WhatsApp for colocation */}
            {listing.announcement === "colocation" && listing.author.phone && (
              <div className="border-t border-gray-100 p-4 space-y-3">
                <a href={`tel:${listing.author.phone}`} className="flex items-center space-x-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">T\u00e9l\u00e9phone</div>
                    <div className="text-slate-500 text-xs">{listing.author.phone}</div>
                  </div>
                </a>
                {listing.author.whatsapp && (
                  <a href={`https://wa.me/${listing.author.whatsapp.replace(/[^0-9]/g, '')}`} className="flex items-center space-x-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <MessageCircle size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">WhatsApp</div>
                      <div className="text-slate-500 text-xs">{listing.author.whatsapp}</div>
                    </div>
                  </a>
                )}
              </div>
            )}
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
        {listing.announcement === "colocation" ? (
          <a href={`tel:${listing.author.phone || ''}`} className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
            <Phone size={18} />
            <span>Appeler</span>
          </a>
        ) : listing.announcement === "offer" ? (
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