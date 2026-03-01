import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { Settings, ChevronRight, LogOut, Bell, Shield, HelpCircle, Star, BedDouble, MapPin, Edit3, Eye, Trash2, Plus, Building2, PauseCircle, PlayCircle, GraduationCap, BookOpen, Users } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { role, userName, setRole, setUserName, studentAnnouncements, providerAnnouncements, deleteAnnouncement, toggleAnnouncementStatus } = useUser();

  const isStudent = role === "student";

  // Students only see their coloc-search requests; providers see all their listings
  const announcements = isStudent
    ? studentAnnouncements.filter(a => a.type === "search-coloc")
    : providerAnnouncements;

  const handleLogout = () => {
    setRole("student");
    setUserName("");
    navigate("/auth");
  };

  const menuItems = [
    { icon: Bell, label: "Notifications", count: 3 },
    { icon: Shield, label: "Confidentialité" },
    { icon: Star, label: "Évaluer l'application" },
    { icon: HelpCircle, label: "Aide & Support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Profile header */}
      <div className="bg-blue-600 px-6 pt-8 pb-20 rounded-b-[2rem] relative">
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Settings size={20} className="text-white" />
        </button>
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/40 shadow-lg mb-3">
            {(userName || "U").charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-white">{userName || "Utilisateur"}</h1>
          <span className={`inline-block mt-2 px-4 py-1.5 rounded-full text-xs font-bold ${
            isStudent ? "bg-yellow-400 text-yellow-900" : "bg-emerald-400 text-emerald-900"
          }`}>
            {isStudent ? "Étudiant" : "Prestataire"}
          </span>
        </div>
      </div>

      <div className="px-5 -mt-6">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-5 grid grid-cols-3 gap-4 text-center border border-gray-100">
          <div className="flex flex-col items-center">
            <p className="text-xl font-extrabold text-blue-600">{announcements.length}</p>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Annonces</p>
          </div>
          <div className="flex flex-col items-center border-x border-gray-100">
            <p className="text-xl font-extrabold text-blue-600">{announcements.reduce((sum, a) => sum + a.views, 0)}</p>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Vues totales</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-extrabold text-blue-600">5</p>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Messages</p>
          </div>
        </div>

        {/* Student info card */}
        {isStudent && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
            <h2 className="font-bold text-slate-900 mb-3 text-sm">Mes informations</h2>
            <div className="space-y-2.5">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Université</p>
                  <p className="text-sm font-semibold text-slate-800">FST Errachidia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Filière</p>
                  <p className="text-sm font-semibold text-slate-800">Informatique</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Préférence coloc</p>
                  <p className="text-sm font-semibold text-slate-800">Homme</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My announcements */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900">{isStudent ? "Mes demandes coloc" : "Mes annonces"}</h2>
            <button
              onClick={() => navigate("/app/add")}
              className="flex items-center space-x-1 text-blue-600 text-xs font-semibold"
            >
              <Plus size={14} />
              <span>Nouvelle</span>
            </button>
          </div>

          {announcements.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <BedDouble size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-slate-500 text-sm font-medium">{isStudent ? "Aucune demande de coloc" : "Aucune annonce"}</p>
              <button
                onClick={() => navigate(isStudent ? "/app/add?type=search-coloc" : "/app/add")}
                className="mt-3 text-blue-600 text-sm font-semibold"
              >
                {isStudent ? "Publier ma recherche" : "Publier ma première annonce"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="flex">
                    <img
                      src={`https://images.unsplash.com/${a.image}`}
                      alt={a.title}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{a.title}</p>
                          <div className="flex items-center text-xs text-slate-400 mt-0.5">
                            <MapPin size={10} className="mr-0.5" />{a.city}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          {a.status === "active" ? "Disponible" : "Occupé"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-bold text-green-600">{a.price}</p>
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <Eye size={12} /><span>{a.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/app/announcements/${a.id}`)}
                      className="flex-1 py-2.5 text-xs font-semibold text-blue-600 flex items-center justify-center space-x-1 hover:bg-blue-50 transition-colors"
                    >
                      <Eye size={12} /><span>Voir</span>
                    </button>
                    <button
                      onClick={() => navigate(`/app/add?edit=${a.id}`)}
                      className="flex-1 py-2.5 text-xs font-semibold text-slate-600 flex items-center justify-center space-x-1 hover:bg-gray-50 transition-colors border-l border-gray-100">
                      <Edit3 size={12} /><span>Modifier</span>
                    </button>
                    {!isStudent && (
                      <button
                        onClick={() => toggleAnnouncementStatus(a.id)}
                        className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center space-x-1 border-l border-gray-100 transition-colors ${
                          a.status === "active"
                            ? "text-orange-500 hover:bg-orange-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {a.status === "active"
                          ? <><PauseCircle size={12} /><span>Occupé</span></>
                          : <><PlayCircle size={12} /><span>Disponible</span></>}
                      </button>
                    )}
                    <button
                      onClick={() => deleteAnnouncement(a.id)}
                      className="flex-1 py-2.5 text-xs font-semibold text-red-500 flex items-center justify-center space-x-1 hover:bg-red-50 transition-colors border-l border-gray-100">
                      <Trash2 size={12} /><span>Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu items */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-5">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                i > 0 ? "border-t border-gray-100" : ""
              }`}
            >
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                <item.icon size={18} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-900 flex-1 text-left">{item.label}</span>
              {item.count && (
                <span className="w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center mr-2">{item.count}</span>
              )}
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-3.5 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
}
