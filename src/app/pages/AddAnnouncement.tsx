import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Camera, MapPin, BedDouble, Bath, Maximize, Users, DollarSign, Check, Home, UserPlus, Building2 } from "lucide-react";
import { useUser } from "../context/UserContext";

type FormType = "offer-room" | "search-coloc" | "provider-listing";

export default function AddAnnouncement() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role } = useUser();
  const typeParam = searchParams.get("type") as FormType | null;

  const [formType, setFormType] = useState<FormType>(typeParam || (role === "provider" ? "provider-listing" : "offer-room"));
  const [submitted, setSubmitted] = useState(false);

  // Common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  // Housing fields (offer-room & provider-listing)
  const [housingType, setHousingType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [surface, setSurface] = useState("");
  const [address, setAddress] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [genderPref, setGenderPref] = useState("Mixte");

  // Offer room specifics
  const [currentRoommates, setCurrentRoommates] = useState("");
  const [maxRoommates, setMaxRoommates] = useState("");

  // Search coloc fields
  const [university, setUniversity] = useState("");
  const [studyField, setStudyField] = useState("");
  const [duration, setDuration] = useState("");
  const [bio, setBio] = useState("");

  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const allTags = ["Wi-Fi", "Meublé", "Cuisine", "AC", "Parking", "Calme", "Proche campus", "Non-fumeur", "Study Room", "Balcon", "Sécurisé", "Jardin"];

  useEffect(() => {
    if (typeParam) setFormType(typeParam);
  }, [typeParam]);

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate("/app");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Annonce publiée !</h2>
          <p className="text-slate-500 text-sm mb-4">Votre annonce est maintenant visible par tous les utilisateurs.</p>
          <p className="text-xs text-slate-400">Redirection automatique...</p>
        </div>
      </div>
    );
  }

  const typeOptions: { key: FormType; label: string; icon: React.ComponentType<any>; desc: string; forRole: string }[] = [
    { key: "offer-room", label: "J'offre une colocation", icon: BedDouble, desc: "Partager votre logement avec des colocataires (photos, nombre de chambres...)", forRole: "student" },
    { key: "search-coloc", label: "Je cherche une colocation", icon: UserPlus, desc: "Vous cherchez à louer avec quelqu'un", forRole: "student" },
    { key: "provider-listing", label: "J'offre un logement", icon: Building2, desc: "Publier un bien immobilier (chambre, appartement, maison...)", forRole: "provider" },
  ];

  const filteredTypes = typeOptions.filter(t => t.forRole === role);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">
            {formType === "offer-room" ? "J'offre une colocation" : formType === "search-coloc" ? "Je cherche une colocation" : formType === "provider-listing" ? "J'offre un logement" : "Publier une annonce"}
          </h1>
        </div>
      </div>

      <div className="px-6 py-4 space-y-5">
        {/* Type selector — only show if no type was pre-selected via URL */}
        {!typeParam && filteredTypes.length > 1 && (
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Type d'annonce</label>
            <div className="space-y-2">
              {filteredTypes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFormType(t.key)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl border-2 transition-all text-left ${
                    formType === t.key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    formType === t.key ? "bg-blue-600" : "bg-gray-100"
                  }`}>
                    <t.icon size={20} className={formType === t.key ? "text-white" : "text-slate-500"} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${formType === t.key ? "text-blue-700" : "text-slate-900"}`}>{t.label}</p>
                    <p className="text-xs text-slate-400">{t.desc}</p>
                  </div>
                  {formType === t.key && (
                    <div className="ml-auto w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
            {formType === "search-coloc" ? "Titre de votre recherche" : "Titre de l'annonce"}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={formType === "search-coloc" ? "Ex: Cherche colocation près FST" : "Ex: Chambre meublée centre-ville"}
            className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={formType === "search-coloc"
              ? "Décrivez ce que vous cherchez, vos habitudes..."
              : "Décrivez le logement, équipements, avantages..."
            }
            rows={4}
            className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        {/* Photos (only for housing types) */}
        {formType !== "search-coloc" && (
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Photos</label>
            <div className="flex space-x-3 overflow-x-auto">
              <button className="w-24 h-24 bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex-shrink-0">
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">Ajouter</span>
              </button>
              {[1, 2].map(i => (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-300">
                  <Camera size={20} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* City + Price row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Ville</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 appearance-none"
            >
              <option value="">Choisir...</option>
              <option>Errachidia</option>
              <option>Ouarzazate</option>
              <option>Meknès</option>
              <option>Fès</option>
              <option>Rabat</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
              {formType === "search-coloc" ? "Budget max" : "Prix (MAD/mois)"}
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 750"
              className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Housing-specific fields */}
        {formType !== "search-coloc" && (
          <>
            {/* Housing type */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Type de logement</label>
              <div className="flex flex-wrap gap-2">
                {["Chambre", "Studio", "Appartement", "Maison"].map(t => (
                  <button
                    key={t}
                    onClick={() => setHousingType(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      housingType === t ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-slate-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Adresse</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rue, quartier..."
                  className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase mb-1 block">Chambres</label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-center outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase mb-1 block">SDB</label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-center outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase mb-1 block">Surface m²</label>
                <input
                  type="number"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-center outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Furnished + Gender */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFurnished(!furnished)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  furnished ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-slate-600"
                }`}
              >
                <Check size={16} className={furnished ? "opacity-100" : "opacity-0"} />
                <span>Meublé</span>
              </button>
            </div>
          </>
        )}

        {/* Offer-room roommate counts */}
        {formType === "offer-room" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Colocs actuels</label>
              <input
                type="number"
                value={currentRoommates}
                onChange={(e) => setCurrentRoommates(e.target.value)}
                placeholder="0"
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Places max</label>
              <input
                type="number"
                value={maxRoommates}
                onChange={(e) => setMaxRoommates(e.target.value)}
                placeholder="0"
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
              />
            </div>
          </div>
        )}

        {/* Search coloc specific */}
        {formType === "search-coloc" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Université</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Ex: FST Errachidia"
                  className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Filière</label>
                <input
                  type="text"
                  value={studyField}
                  onChange={(e) => setStudyField(e.target.value)}
                  placeholder="Ex: Informatique"
                  className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Durée souhaitée</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 appearance-none"
              >
                <option value="">Choisir...</option>
                <option>1-3 mois</option>
                <option>3-6 mois</option>
                <option>6 mois minimum</option>
                <option>1 année</option>
                <option>Année universitaire</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">À propos de vous</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Parlez de vous, vos habitudes, hobbies..."
                rows={3}
                className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 resize-none"
              />
            </div>
          </>
        )}

        {/* Gender preference */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Préférence sexe</label>
          <div className="flex space-x-2">
            {["Homme", "Femme", "Mixte"].map(g => (
              <button
                key={g}
                onClick={() => setGenderPref(g)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  genderPref === g ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-slate-600"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Caractéristiques</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  tags.includes(tag) ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-slate-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 mt-2"
        >
          Publier l'annonce
        </button>
      </div>
    </div>
  );
}
