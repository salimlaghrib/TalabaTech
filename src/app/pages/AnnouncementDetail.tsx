import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Phone, MessageCircle, BedDouble, Bath, Maximize, Wifi, Car, Wind, Heart, Share2, Users, Calendar, Shield } from "lucide-react";

interface AnnouncementData {
  id: number;
  type: "offer-room" | "search-coloc" | "provider-listing";
  title: string;
  description: string;
  city: string;
  price: string;
  housingType: string;
  images: string[];
  authorName: string;
  authorImage: string;
  authorPhone: string;
  posted: string;
  tags: string[];
  gender?: string;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  furnished?: boolean;
  currentRoommates?: number;
  maxRoommates?: number;
  address?: string;
  availableFrom?: string;
  duration?: string;
  bio?: string;
  university?: string;
  studyField?: string;
}

const announcements: Record<number, AnnouncementData> = {
  // Offer room
  1: { id: 1, type: "offer-room", title: "Chambre meublée près FST", description: "Chambre privée dans un appartement partagé, ambiance calme et studieuse. L'appartement est situé à 5 minutes à pied de la FST. Cuisine équipée partagée, salle de bain privée. Internet haut débit (fibre optique).", city: "Errachidia", price: "750 MAD/mois", housingType: "Chambre", images: ["photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"], authorName: "Youssef B.", authorImage: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", authorPhone: "0600123456", posted: "il y a 2h", tags: ["Wi-Fi", "Meublé", "Cuisine"], gender: "Homme", bedrooms: 3, bathrooms: 1, surface: 80, furnished: true, currentRoommates: 2, maxRoommates: 3, address: "Rue Hassan II, quartier FST", availableFrom: "Disponible immédiatement" },
  2: { id: 2, type: "offer-room", title: "Studio partagé 2 personnes", description: "Studio spacieux à partager avec un(e) étudiant(e) sérieux(se). Situé dans un quartier calme, idéal pour les études. Machine à laver disponible.", city: "Errachidia", price: "600 MAD/mois", housingType: "Studio", images: ["photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"], authorName: "Fatima Z.", authorImage: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", authorPhone: "0600234567", posted: "il y a 5h", tags: ["Calme", "Proche campus"], gender: "Femme", bedrooms: 1, bathrooms: 1, surface: 45, furnished: true, currentRoommates: 1, maxRoommates: 2, address: "Bd Mohammed V", availableFrom: "1er Mars 2025" },
  3: { id: 3, type: "offer-room", title: "Coloc moderne centre-ville", description: "Grand appartement tout équipé, 2 places libres. Climatisation, parking sécurisé, Wi-Fi haut débit. Ambiance conviviale.", city: "Errachidia", price: "900 MAD/mois", housingType: "Appartement", images: ["photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"], authorName: "Karim T.", authorImage: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", authorPhone: "0600345678", posted: "il y a 1j", tags: ["AC", "Wi-Fi", "Parking"], gender: "Mixte", bedrooms: 4, bathrooms: 2, surface: 120, furnished: true, currentRoommates: 2, maxRoommates: 4, address: "Centre-ville Errachidia", availableFrom: "Disponible immédiatement" },
  // Search coloc
  10: { id: 10, type: "search-coloc", title: "Cherche colocation près FST", description: "Je suis étudiant en informatique à la FST d'Errachidia. Calme, sérieux et respectueux. Je cherche une chambre meublée dans une colocation. Non-fumeur. Budget maximum 800 MAD/mois.", city: "Errachidia", price: "800 MAD/mois", housingType: "Chambre", images: [], authorName: "Youssef B.", authorImage: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", authorPhone: "0600123456", posted: "il y a 2h", tags: ["Wi-Fi", "Non-fumeur", "Calme"], gender: "Homme", bio: "Étudiant en 3ème année informatique, passionné de code et de sport.", university: "FST Errachidia", studyField: "Informatique", duration: "6 mois minimum" },
  11: { id: 11, type: "search-coloc", title: "Étudiante cherche logement", description: "Étudiante en lettres cherche chambre meublée avec study room. Habitudes calmes, je suis organisée et propre.", city: "Errachidia", price: "600 MAD/mois", housingType: "Chambre", images: [], authorName: "Fatima Z.", authorImage: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", authorPhone: "0600234567", posted: "il y a 5h", tags: ["Meublé", "Study Room"], gender: "Femme", bio: "Étudiante en lettres françaises, j'aime la lecture et la cuisine.", university: "FST Errachidia", studyField: "Lettres Françaises", duration: "Année universitaire" },
  12: { id: 12, type: "search-coloc", title: "Cherche coloc sympa", description: "Étudiante en physique cherche colocation abordable près du campus. Je suis sociable et respectueuse.", city: "Errachidia", price: "700 MAD/mois", housingType: "Chambre", images: [], authorName: "Amina L.", authorImage: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", authorPhone: "0600456789", posted: "il y a 1j", tags: ["Wi-Fi", "Cuisine"], gender: "Femme", bio: "Étudiante passionnée de sciences, je cherche un environnement calme.", university: "FST Errachidia", studyField: "Physique", duration: "1 année" },
  // Provider listings
  20: { id: 20, type: "provider-listing", title: "Appartement F3 meublé centre", description: "Bel appartement de 3 pièces, entièrement meublé et équipé. Idéal pour 2-3 étudiants. Situé au centre-ville avec toutes les commodités à proximité.", city: "Errachidia", price: "2000 MAD/mois", housingType: "Appartement", images: ["photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"], authorName: "Agence ImmoPlus", authorImage: "photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80", authorPhone: "0600567890", posted: "il y a 3j", tags: ["Meublé", "Parking", "AC"], bedrooms: 3, bathrooms: 1, surface: 95, furnished: true, address: "Centre-ville, Avenue Mohammed V", availableFrom: "Disponible immédiatement" },
  21: { id: 21, type: "provider-listing", title: "Chambre privée avec balcon", description: "Chambre individuelle dans résidence sécurisée, avec balcon et vue dégagée. Quartier calme.", city: "Errachidia", price: "1500 MAD/mois", housingType: "Chambre", images: ["photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"], authorName: "Omar H.", authorImage: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", authorPhone: "0600678901", posted: "il y a 5j", tags: ["Sécurisé", "Balcon"], bedrooms: 1, bathrooms: 1, surface: 30, furnished: false, address: "Quartier El Massira", availableFrom: "1er Avril 2025" },
  22: { id: 22, type: "provider-listing", title: "Maison pour étudiants", description: "Grande maison 5 chambres, jardin, parking. Idéale pour groupe d'étudiants.", city: "Errachidia", price: "4000 MAD/mois", housingType: "Maison", images: ["photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"], authorName: "Propriétaire Direct", authorImage: "photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", authorPhone: "0600789012", posted: "il y a 1 sem", tags: ["Jardin", "Parking", "5 chambres"], bedrooms: 5, bathrooms: 2, surface: 200, furnished: false, address: "Route de Tinghir", availableFrom: "Disponible immédiatement" },
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "offer-room": return { label: "Offre logement", bg: "bg-emerald-100 text-emerald-700" };
    case "search-coloc": return { label: "Cherche coloc", bg: "bg-orange-100 text-orange-700" };
    case "provider-listing": return { label: "Logement", bg: "bg-blue-100 text-blue-700" };
    default: return { label: "", bg: "" };
  }
};

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const a = announcements[Number(id)];

  if (!a) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 font-medium">Annonce introuvable</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-blue-600 font-semibold text-sm">Retour</button>
        </div>
      </div>
    );
  }

  const badge = getTypeBadge(a.type);

  // Render for housing types (offer-room and provider-listing)
  if (a.type !== "search-coloc") {
    return (
      <div className="min-h-screen bg-gray-50 pb-28">
        {/* Image gallery */}
        <div className="relative h-64">
          <img src={`https://images.unsplash.com/${a.images[0]}`} alt={a.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
              <Heart size={18} className="text-slate-600" />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
              <Share2 size={18} className="text-slate-600" />
            </button>
          </div>
          <div className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold ${badge.bg}`}>{badge.label}</div>
        </div>

        {/* More images */}
        {a.images.length > 1 && (
          <div className="flex space-x-2 px-6 py-3 overflow-x-auto">
            {a.images.slice(1).map((img, i) => (
              <img key={i} src={`https://images.unsplash.com/${img}`} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border-2 border-white shadow-sm" />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900 mb-1">{a.title}</h1>
          <div className="flex items-center text-sm text-slate-500 mb-3">
            <MapPin size={14} className="mr-1" />{a.address || a.city}
            <span className="mx-2">•</span>
            <span>{a.posted}</span>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-green-700 font-bold text-lg">{a.price}</p>
            <p className="text-green-600 text-xs">{a.availableFrom}</p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {a.bedrooms && (
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <BedDouble size={18} className="mx-auto text-blue-500 mb-1" />
                <p className="text-xs font-bold text-slate-900">{a.bedrooms}</p>
                <p className="text-[10px] text-slate-400">Chambres</p>
              </div>
            )}
            {a.bathrooms && (
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <Bath size={18} className="mx-auto text-blue-500 mb-1" />
                <p className="text-xs font-bold text-slate-900">{a.bathrooms}</p>
                <p className="text-[10px] text-slate-400">SDB</p>
              </div>
            )}
            {a.surface && (
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <Maximize size={18} className="mx-auto text-blue-500 mb-1" />
                <p className="text-xs font-bold text-slate-900">{a.surface}m²</p>
                <p className="text-[10px] text-slate-400">Surface</p>
              </div>
            )}
            {a.currentRoommates !== undefined && (
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <Users size={18} className="mx-auto text-blue-500 mb-1" />
                <p className="text-xs font-bold text-slate-900">{a.currentRoommates}/{a.maxRoommates}</p>
                <p className="text-[10px] text-slate-400">Colocs</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {a.furnished && <span className="px-3 py-1.5 bg-blue-50 rounded-full text-xs font-medium text-blue-600">✓ Meublé</span>}
            {a.gender && <span className="px-3 py-1.5 bg-purple-50 rounded-full text-xs font-medium text-purple-600">{a.gender}</span>}
            {a.tags.map(t => <span key={t} className="px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-slate-600 border border-gray-100">{t}</span>)}
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="font-bold text-slate-900 mb-2">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>
          </div>

          {/* Author */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center space-x-3">
              <img src={`https://images.unsplash.com/${a.authorImage}`} alt={a.authorName} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-900">{a.authorName}</p>
                <p className="text-xs text-slate-400">Publié {a.posted}</p>
              </div>
              <Shield size={18} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* Bottom action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex space-x-3 z-20 max-w-md mx-auto">
          <a href={`tel:${a.authorPhone}`} className="w-14 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Phone size={20} className="text-green-600" />
          </a>
          <a href={`https://wa.me/212${a.authorPhone.slice(1)}`} target="_blank" className="w-14 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <MessageCircle size={20} className="text-emerald-600" />
          </a>
          <button
            onClick={() => navigate(`/app/chat/${a.id}`)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            Contacter
          </button>
        </div>
      </div>
    );
  }

  // Render for profile-type (search-coloc)
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 pt-6 pb-10 relative">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="text-center pt-8">
          <img src={`https://images.unsplash.com/${a.authorImage}`} alt={a.authorName} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg mb-3" />
          <h1 className="text-xl font-bold text-white">{a.authorName}</h1>
          <p className="text-blue-200 text-sm">{a.university} • {a.studyField}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${badge.bg}`}>{badge.label}</span>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Budget card */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Budget maximum</p>
              <p className="text-lg font-bold text-green-600">{a.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Durée</p>
              <p className="text-sm font-bold text-slate-900">{a.duration}</p>
            </div>
          </div>
        </div>

        {/* Search info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-3">Ce que je cherche</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <MapPin size={16} className="text-blue-500 mr-2" />
              <span className="text-slate-600">Ville : <strong>{a.city}</strong></span>
            </div>
            <div className="flex items-center text-sm">
              <BedDouble size={16} className="text-blue-500 mr-2" />
              <span className="text-slate-600">Type : <strong>{a.housingType}</strong></span>
            </div>
            <div className="flex items-center text-sm">
              <Users size={16} className="text-blue-500 mr-2" />
              <span className="text-slate-600">Préférence : <strong>{a.gender}</strong></span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={16} className="text-blue-500 mr-2" />
              <span className="text-slate-600">Durée : <strong>{a.duration}</strong></span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-2">Préférences</h3>
          <div className="flex flex-wrap gap-2">
            {a.tags.map(t => (
              <span key={t} className="px-3 py-1.5 bg-blue-50 rounded-full text-xs font-medium text-blue-600">{t}</span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-2">À propos de moi</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{a.bio}</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-2">Détail de la recherche</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>
        </div>
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex space-x-3 z-20 max-w-md mx-auto">
        <a href={`tel:${a.authorPhone}`} className="w-14 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <Phone size={20} className="text-green-600" />
        </a>
        <a href={`https://wa.me/212${a.authorPhone.slice(1)}`} target="_blank" className="w-14 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <MessageCircle size={20} className="text-emerald-600" />
        </a>
        <button
          onClick={() => navigate(`/app/chat/${a.id}`)}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
        >
          Contacter
        </button>
      </div>
    </div>
  );
}
