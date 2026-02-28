import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Users, BedDouble, Filter, X, ChevronDown, Building2, UserPlus, Home } from "lucide-react";
import { useUser } from "../context/UserContext";

type AnnouncementType = "all" | "offer-room" | "search-coloc" | "provider-listing";

interface Announcement {
  id: number;
  type: AnnouncementType;
  title: string;
  description: string;
  city: string;
  price: string;
  housingType: string;
  image: string;
  authorName: string;
  authorImage: string;
  posted: string;
  tags: string[];
  gender?: string;
}

const allAnnouncements: Announcement[] = [
  // Offer room (student has a room)
  { id: 1, type: "offer-room", title: "Chambre meublée près FST", description: "Chambre privée dans un appartement partagé, ambiance calme.", city: "Errachidia", price: "750 MAD/mois", housingType: "Chambre", image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", authorName: "Youssef B.", authorImage: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", posted: "2h", tags: ["Wi-Fi", "Meublé", "Cuisine"], gender: "Homme" },
  { id: 2, type: "offer-room", title: "Studio partagé 2 personnes", description: "Studio spacieux à partager avec un(e) étudiant(e) sérieux(se).", city: "Errachidia", price: "600 MAD/mois", housingType: "Studio", image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", authorName: "Fatima Z.", authorImage: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", posted: "5h", tags: ["Calme", "Proche campus"], gender: "Femme" },
  { id: 3, type: "offer-room", title: "Coloc moderne centre-ville", description: "Grand appartement, 2 places libres, tout équipé.", city: "Errachidia", price: "900 MAD/mois", housingType: "Appartement", image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", authorName: "Karim T.", authorImage: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", posted: "1j", tags: ["AC", "Wi-Fi", "Parking"], gender: "Mixte" },
  // Search coloc (student looking)
  { id: 10, type: "search-coloc", title: "Cherche colocation près FST", description: "Étudiant en informatique, calme et sérieux, cherche colocation meublée.", city: "Errachidia", price: "800 MAD/mois", housingType: "Chambre", image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", authorName: "Youssef B.", authorImage: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", posted: "2h", tags: ["Wi-Fi", "Non-fumeur", "Calme"], gender: "Homme" },
  { id: 11, type: "search-coloc", title: "Étudiante cherche logement", description: "Étudiante en lettres cherche chambre meublée avec study room.", city: "Errachidia", price: "600 MAD/mois", housingType: "Chambre", image: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", authorName: "Fatima Z.", authorImage: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", posted: "5h", tags: ["Meublé", "Study Room"], gender: "Femme" },
  { id: 12, type: "search-coloc", title: "Cherche coloc sympa", description: "Étudiante en physique cherche colocation abordable près du campus.", city: "Errachidia", price: "700 MAD/mois", housingType: "Chambre", image: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", authorName: "Amina L.", authorImage: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", posted: "1j", tags: ["Wi-Fi", "Cuisine"], gender: "Femme" },
  // Provider listings
  { id: 20, type: "provider-listing", title: "Appartement F3 meublé centre", description: "Bel appartement de 3 pièces, entièrement meublé et équipé. Idéal pour 2-3 étudiants.", city: "Errachidia", price: "2000 MAD/mois", housingType: "Appartement", image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", authorName: "Agence ImmoPlus", authorImage: "photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80", posted: "3j", tags: ["Meublé", "Parking", "AC"] },
  { id: 21, type: "provider-listing", title: "Chambre privée avec balcon", description: "Chambre individuelle dans résidence sécurisée, avec balcon et vue dégagée.", city: "Errachidia", price: "1500 MAD/mois", housingType: "Chambre", image: "photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", authorName: "Omar H.", authorImage: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", posted: "5j", tags: ["Sécurisé", "Balcon"] },
  { id: 22, type: "provider-listing", title: "Maison pour étudiants", description: "Grande maison 5 chambres, jardin, parking. Idéale pour groupe d'étudiants.", city: "Errachidia", price: "4000 MAD/mois", housingType: "Maison", image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", authorName: "Propriétaire Direct", authorImage: "photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", posted: "1 sem", tags: ["Jardin", "Parking", "5 chambres"] },
];

const cities = ["Toutes", "Errachidia", "Ouarzazate", "Meknès", "Fès", "Rabat"];
const housingTypes = ["Tous", "Chambre", "Studio", "Appartement", "Maison"];
const budgetRanges = ["Tous", "< 500 MAD", "500-1000 MAD", "1000-2000 MAD", "> 2000 MAD"];

export default function Announcements() {
  const navigate = useNavigate();
  const { role } = useUser();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<AnnouncementType>("all");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedBudget, setSelectedBudget] = useState("Tous");
  const [selectedGender, setSelectedGender] = useState("Tous");

  /* Tabs adaptés au rôle :
     - Étudiant : voit logements dispo (offer-room + provider-listing) + cherchent coloc
     - Prestataire : voit uniquement les étudiants qui cherchent (search-coloc) */
  const allTabs: { key: AnnouncementType; label: string; icon: React.ComponentType<any> }[] = role === "provider"
    ? [
        { key: "all", label: "Tout", icon: Search },
        { key: "search-coloc", label: "Étudiants cherchent", icon: UserPlus },
      ]
    : [
        { key: "all", label: "Tout", icon: Search },
        { key: "offer-room", label: "Offre logement", icon: BedDouble },
        { key: "search-coloc", label: "Cherche coloc", icon: UserPlus },
        { key: "provider-listing", label: "Logements pro", icon: Building2 },
      ];

  /* Filtrer selon le rôle avant d'appliquer les filtres utilisateur */
  const roleFiltered = role === "provider"
    ? allAnnouncements.filter(a => a.type === "search-coloc")
    : allAnnouncements;

  const filtered = roleFiltered.filter((a) => {
    if (activeTab !== "all" && a.type !== activeTab) return false;
    if (selectedCity !== "Toutes" && a.city !== selectedCity) return false;
    if (selectedType !== "Tous" && a.housingType !== selectedType) return false;
    if (selectedGender !== "Tous" && a.gender !== selectedGender) return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase()) && !a.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedBudget !== "Tous") {
      const price = parseInt(a.price.replace(/\D/g, ""));
      if (selectedBudget === "< 500 MAD" && price >= 500) return false;
      if (selectedBudget === "500-1000 MAD" && (price < 500 || price > 1000)) return false;
      if (selectedBudget === "1000-2000 MAD" && (price < 1000 || price > 2000)) return false;
      if (selectedBudget === "> 2000 MAD" && price <= 2000) return false;
    }
    return true;
  });

  const getTypeBadge = (type: AnnouncementType) => {
    switch (type) {
      case "offer-room": return { label: "Offre logement", bg: "bg-emerald-100 text-emerald-700" };
      case "search-coloc": return { label: "Cherche coloc", bg: "bg-orange-100 text-orange-700" };
      case "provider-listing": return { label: "Logement", bg: "bg-blue-100 text-blue-700" };
      default: return { label: "", bg: "" };
    }
  };

  const resetFilters = () => {
    setSelectedCity("Toutes");
    setSelectedType("Tous");
    setSelectedBudget("Tous");
    setSelectedGender("Tous");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCity !== "Toutes" || selectedType !== "Tous" || selectedBudget !== "Tous" || selectedGender !== "Tous";

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-slate-900">{role === "provider" ? "Demandes étudiantes" : "Annonces"}</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                hasActiveFilters ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
              }`}
            >
              <Filter size={16} />
              <span>Filtres</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white text-blue-600 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {[selectedCity !== "Toutes", selectedType !== "Tous", selectedBudget !== "Tous", selectedGender !== "Tous"].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une annonce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-1">
            {allTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-6 py-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Filtres</h3>
            <button onClick={resetFilters} className="text-blue-600 text-xs font-semibold">Réinitialiser</button>
          </div>

          {/* Ville */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Ville</label>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCity === c ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Type logement */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Type de logement</label>
            <div className="flex flex-wrap gap-2">
              {housingTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedType === t ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Budget</label>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBudget(b)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedBudget === b ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Sexe */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Préférence sexe</label>
            <div className="flex flex-wrap gap-2">
              {["Tous", "Homme", "Femme", "Mixte"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedGender === g ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowFilters(false)} className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold">
            Appliquer ({filtered.length} résultats)
          </button>
        </div>
      )}

      {/* Results */}
      <div className="px-6 py-4">
        <p className="text-xs text-slate-400 mb-3">{filtered.length} annonce{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}</p>
        <div className="space-y-3">
          {filtered.map((a) => {
            const badge = getTypeBadge(a.type);
            const isProfile = a.type === "search-coloc";

            return (
              <div
                key={a.id}
                onClick={() => navigate(`/app/announcements/${a.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                {!isProfile ? (
                  <>
                    <div className="h-40 relative">
                      <img src={`https://images.unsplash.com/${a.image}`} alt={a.title} className="w-full h-full object-cover" />
                      <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-lg text-[11px] font-bold ${badge.bg}`}>{badge.label}</div>
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900">{a.price}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{a.title}</h3>
                      <p className="text-xs text-slate-500 mb-2 line-clamp-2">{a.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-slate-500">
                          <MapPin size={12} className="mr-1" />{a.city}
                        </div>
                        <span className="text-[10px] text-slate-400">{a.posted}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {a.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-gray-50 rounded-full text-[10px] text-slate-500 border border-gray-100">{t}</span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <img src={`https://images.unsplash.com/${a.authorImage}`} alt={a.authorName} className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-bold text-slate-900">{a.authorName}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg}`}>{badge.label}</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mb-1">{a.title}</p>
                        <p className="text-xs text-slate-400 mb-2 line-clamp-2">{a.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span className="flex items-center"><MapPin size={11} className="mr-0.5" />{a.city}</span>
                            <span className="font-bold text-green-600">{a.price}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{a.posted}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {a.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-blue-50 rounded-full text-[10px] text-blue-600 font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-slate-500 font-medium">Aucune annonce trouvée</p>
              <p className="text-slate-400 text-sm mt-1">Essayez de modifier vos filtres</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
