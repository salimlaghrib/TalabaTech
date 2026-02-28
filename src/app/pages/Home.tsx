import { Search, MapPin, MessageCircle, Users, ChevronRight, BedDouble, Building2, BookOpen, UserPlus, Home as HomeIcon, Plus, Eye, BarChart3, Clock, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

/* ════════════════════════════════════════════════════
   STUDENT HOME
   - Voir les colocations dispo (offer-room + provider-listing)
   - Voir les étudiants qui cherchent coloc (search-coloc)
   - Publier : offrir un logement ou chercher coloc
   ════════════════════════════════════════════════════ */
function StudentHome() {
  const navigate = useNavigate();
  const { userName } = useUser();

  /* Colocations disponibles (offres de partage par des étudiants) */
  const availableColocations = [
    { id: 1, title: "Chambre meublée près FST", price: "750 MAD/mois", location: "Près FST, Errachidia", rooms: "3 colocataires", available: "1 place", image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", features: ["Wi-Fi", "Meublé", "Cuisine"] },
    { id: 2, title: "Studio partagé étudiants", price: "600 MAD/mois", location: "Hay Mohammadi", rooms: "2 colocataires", available: "1 place", image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", features: ["Calme", "Proche campus"] },
    { id: 3, title: "Coloc moderne centre-ville", price: "900 MAD/mois", location: "Centre Errachidia", rooms: "4 colocataires", available: "2 places", image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", features: ["AC", "Wi-Fi", "Parking"] },
    { id: 4, title: "Maison partagée calme", price: "850 MAD/mois", location: "Hay Salam", rooms: "3 colocataires", available: "1 place", image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", features: ["Jardin", "Cuisine", "Non-fumeur"] },
  ];

  /* Logements disponibles (offres de prestataires immobiliers) */
  const availableHousings = [
    { id: 20, title: "Appartement F3 meublé centre", price: "2000 MAD/mois", location: "Centre Errachidia", type: "Appartement", surface: "80m²", image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", features: ["Meublé", "Parking", "AC"] },
    { id: 21, title: "Chambre privée avec balcon", price: "1500 MAD/mois", location: "Hay El Massira", type: "Chambre", surface: "25m²", image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", features: ["Sécurisé", "Balcon"] },
    { id: 22, title: "Studio neuf près campus", price: "1800 MAD/mois", location: "Près FST", type: "Studio", surface: "35m²", image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", features: ["Meublé", "Wi-Fi", "Cuisine"] },
  ];

  /* Étudiants qui cherchent coloc */
  const roommateProfiles = [
    { id: 10, name: "Youssef B.", age: 21, faculty: "FST", location: "Près FST", budget: "800 MAD/mois", features: ["Wi-Fi", "Calme", "Non-fumeur"], image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", posted: "2h" },
    { id: 11, name: "Fatima Z.", age: 20, faculty: "FLSH", location: "Hay Mohammadi", budget: "600 MAD/mois", features: ["Meublé", "Study Room"], image: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", posted: "5h" },
    { id: 12, name: "Amina L.", age: 22, faculty: "FST", location: "Près Campus", budget: "700 MAD/mois", features: ["Wi-Fi", "Cuisine"], image: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", posted: "1j" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero Header */}
      <div className="bg-blue-600 p-6 pb-10 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <img src="/logo_TalabaTech.png" alt="TalabaTech" className="h-10 w-auto brightness-0 invert" />
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate("/app/chat")} className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 relative">
              <MessageCircle size={20} className="text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">2</span>
              </div>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden border-2 border-white/30 cursor-pointer" onClick={() => navigate("/app/profile")}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-blue-200 text-sm font-medium flex items-center space-x-1"><BookOpen size={14} /><span>Espace Étudiant</span></p>
          <h1 className="text-2xl font-bold text-white">Salut, {userName}! 👋</h1>
          <p className="text-blue-200 text-sm mt-1">Trouve ta colocation idéale</p>
        </div>
      </div>

      <div className="px-6 -mt-5">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => navigate("/app/add?type=offer-room")} className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <BedDouble size={22} className="text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">J'offre une colocataire</p>
              <p className="text-[10px] text-slate-400">Partager mon logement</p>
            </div>
          </button>
          <button onClick={() => navigate("/app/add?type=search-coloc")} className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <UserPlus size={22} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Je cherche colocataire</p>
              <p className="text-[10px] text-slate-400">Trouver un colocataire</p>
            </div>
          </button>
        </div>
        <button onClick={() => navigate("/app/announcements")} className="w-full flex items-center justify-center space-x-2 bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-6">
          <Users size={18} className="text-orange-500" />
          <p className="text-sm font-bold text-slate-700">Parcourir toutes les annonces</p>
          <ChevronRight size={16} className="text-slate-400" />
        </button>

        {/* ══ SECTION PRINCIPALE : Colocations disponibles ══ */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">Colocations disponibles</h2>
            </div>
            <button onClick={() => navigate("/app/announcements")} className="text-blue-600 text-sm font-semibold">Voir tout</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {availableColocations.map((item) => (
              <div key={item.id} onClick={() => navigate(`/app/announcements/${item.id}`)} className="min-w-[260px] bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-36 bg-gray-200 relative">
                  <img src={`https://images.unsplash.com/${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1">
                    <Users size={12} />
                    <span>{item.available}</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-700">Colocation</div>
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900">{item.price}</div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-slate-800 text-sm mb-1.5">{item.title}</h3>
                  <div className="flex items-center text-slate-500 text-xs mb-1">
                    <MapPin size={12} className="mr-1" />{item.location}
                  </div>
                  <p className="text-[11px] text-blue-600 font-medium mb-2">{item.rooms} · {item.available}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.features.map(f => (
                      <span key={f} className="px-2 py-0.5 bg-blue-50 rounded-full text-[10px] text-blue-600 border border-blue-100">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Logements disponibles (prestataires) ── */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Building2 size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-slate-800">Logements disponibles</h2>
            </div>
            <button onClick={() => navigate("/app/announcements")} className="text-blue-600 text-sm font-semibold">Voir tout</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {availableHousings.map((item) => (
              <div key={item.id} onClick={() => navigate(`/app/announcements/${item.id}`)} className="min-w-[240px] bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-200 relative">
                  <img src={`https://images.unsplash.com/${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-100 text-purple-700">Prestataire</div>
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900">{item.price}</div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                  <div className="flex items-center text-slate-500 text-xs mb-1">
                    <MapPin size={12} className="mr-1" />{item.location}
                  </div>
                  <p className="text-[11px] text-purple-600 font-medium mb-2">{item.type} · {item.surface}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.features.map(f => (
                      <span key={f} className="px-2 py-0.5 bg-purple-50 rounded-full text-[10px] text-purple-600 border border-purple-100">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Étudiants cherchent coloc ── */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">Cherchent colocation</h2>
            </div>
            <button onClick={() => navigate("/app/announcements")} className="text-blue-600 text-sm font-semibold">Voir tout</button>
          </div>
          <div className="space-y-3">
            {roommateProfiles.map((profile) => (
              <div key={profile.id} onClick={() => navigate(`/app/announcements/${profile.id}`)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <img src={`https://images.unsplash.com/${profile.image}`} alt={profile.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-200" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{profile.name} <span className="text-slate-400 font-normal text-xs">({profile.age} ans)</span></h3>
                      <span className="text-[10px] text-slate-400">{profile.posted}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center"><BookOpen size={11} className="mr-1" />{profile.faculty}</span>
                      <span className="flex items-center"><MapPin size={11} className="mr-1" />{profile.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {profile.features.map(f => (
                          <span key={f} className="px-2 py-0.5 bg-blue-50 rounded-full text-[10px] text-blue-600 font-medium">{f}</span>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-green-600 whitespace-nowrap ml-2">{profile.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div onClick={() => navigate("/app/add?type=search-coloc")} className="bg-blue-600 rounded-2xl p-5 mb-6 cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UserPlus size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-base">Tu cherches un colocataire ?</h3>
              <p className="text-blue-100 text-xs mt-0.5">Publie ta demande gratuitement</p>
            </div>
            <ChevronRight size={22} className="text-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   PROVIDER HOME
   - Ajouter un logement
   - Voir ses propres annonces
   - Voir les étudiants qui cherchent un logement (search-coloc)
   ════════════════════════════════════════════════════ */
function ProviderHome() {
  const navigate = useNavigate();
  const { userName } = useUser();

  const myListings = [
    { id: 20, title: "Appartement meublé centre", price: "2000 MAD/mois", location: "Errachidia Centre", views: 142, inquiries: 8, image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", status: "Actif" },
    { id: 21, title: "Chambre privée avec balcon", price: "1500 MAD/mois", location: "Hay El Massira", views: 89, inquiries: 3, image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", status: "Actif" },
    { id: 22, title: "Maison 5 chambres", price: "4000 MAD/mois", location: "Route Tinghir", views: 56, inquiries: 2, image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", status: "Pausé" },
  ];

  const studentRequests = [
    { id: 10, name: "Youssef B.", age: 21, faculty: "FST - Informatique", budget: "800 MAD/mois", location: "Près FST", features: ["Wi-Fi", "Meublé", "Non-fumeur"], image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", time: "2h", phone: "0600123456" },
    { id: 11, name: "Fatima Z.", age: 20, faculty: "FLSH - Lettres", budget: "600 MAD/mois", location: "Hay Mohammadi", features: ["Meublé", "Study Room"], image: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", time: "5h", phone: "0600234567" },
    { id: 12, name: "Amina L.", age: 22, faculty: "FST - Physique", budget: "700 MAD/mois", location: "Près Campus", features: ["Wi-Fi", "Cuisine"], image: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", time: "1j", phone: "0600345678" },
    { id: 13, name: "Omar K.", age: 23, faculty: "EST - Gestion", budget: "900 MAD/mois", location: "Centre-ville", features: ["Parking", "AC", "Wi-Fi"], image: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", time: "2j", phone: "0600456789" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Provider Header */}
      <div className="bg-indigo-700 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <img src="/logo_TalabaTech.png" alt="TalabaTech" className="h-10 w-auto brightness-0 invert" />
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate("/app/chat")} className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 relative">
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
        <div className="mb-6">
          <p className="text-purple-200 text-sm font-medium flex items-center space-x-1"><Building2 size={14} /><span>Espace Prestataire</span></p>
          <h1 className="text-2xl font-bold text-white">Bonjour, {userName}! 🏠</h1>
          <p className="text-purple-200 text-sm mt-1">Gérez vos logements et trouvez des locataires</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{myListings.length}</p>
            <p className="text-purple-200 text-xs mt-0.5">Mes annonces</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{myListings.reduce((s, l) => s + l.views, 0)}</p>
            <p className="text-purple-200 text-xs mt-0.5">Vues totales</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{myListings.reduce((s, l) => s + l.inquiries, 0)}</p>
            <p className="text-purple-200 text-xs mt-0.5">Demandes</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Quick Action */}
        <button onClick={() => navigate("/app/add?type=provider-listing")} className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg mb-6">
          <Plus size={18} />
          <span>Ajouter un logement</span>
        </button>

        {/* ── Mes annonces ── */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Building2 size={20} className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800">Mes annonces</h2>
            </div>
          </div>
          <div className="space-y-3">
            {myListings.map((listing) => (
              <div key={listing.id} onClick={() => navigate(`/app/announcements/${listing.id}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img src={`https://images.unsplash.com/${listing.image}`} alt={listing.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight flex-1 pr-2">{listing.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${listing.status === "Actif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{listing.status}</span>
                    </div>
                    <p className="text-sm font-bold text-indigo-600 mt-1">{listing.price}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1.5">
                      <span className="flex items-center space-x-1"><Eye size={11} /><span>{listing.views} vues</span></span>
                      <span className="flex items-center space-x-1"><MessageCircle size={11} /><span>{listing.inquiries} demandes</span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Demandes étudiantes ── */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-orange-500" />
              <h2 className="text-lg font-bold text-slate-800">Étudiants cherchent logement</h2>
            </div>
            <button onClick={() => navigate("/app/announcements")} className="text-indigo-600 text-sm font-semibold">Voir tout</button>
          </div>
          <div className="space-y-3">
            {studentRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <img src={`https://images.unsplash.com/${req.image}`} alt={req.name} className="w-14 h-14 rounded-full object-cover border-2 border-orange-200" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{req.name} <span className="text-slate-400 font-normal text-xs">({req.age} ans)</span></h3>
                      <span className="text-[10px] text-slate-400">{req.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1.5">{req.faculty}</p>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center"><MapPin size={11} className="mr-1" />{req.location}</span>
                      <span className="font-bold text-green-600">{req.budget}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {req.features.map(f => (
                          <span key={f} className="px-2 py-0.5 bg-orange-50 rounded-full text-[10px] text-orange-600 font-medium">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                  <button onClick={() => navigate(`/app/announcements/${req.id}`)} className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">Voir profil</button>
                  <button onClick={() => navigate(`/app/chat/${req.id}`)} className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1">
                    <MessageCircle size={12} />
                    <span>Contacter</span>
                  </button>
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
   MAIN EXPORT
   ════════════════════════════════════════════════════ */
export default function Home() {
  const { role } = useUser();
  if (role === "provider") return <ProviderHome />;
  return <StudentHome />;
}
