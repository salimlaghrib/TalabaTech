import { useNavigate } from "react-router";
import { Search, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  { id: 1, name: "Youssef B.", avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", lastMessage: "Oui la chambre est toujours disponible !", time: "14:30", unread: 2, online: true },
  { id: 2, name: "Fatima Z.", avatar: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", lastMessage: "D'accord, on peut visiter demain ?", time: "12:15", unread: 0, online: true },
  { id: 3, name: "Agence ImmoPlus", avatar: "photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80", lastMessage: "L'appartement est disponible à partir de mars.", time: "Hier", unread: 1, online: false },
  { id: 4, name: "Karim T.", avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", lastMessage: "Parfait, envoie-moi ton numéro.", time: "Hier", unread: 0, online: false },
  { id: 5, name: "Amina L.", avatar: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", lastMessage: "Merci pour les infos !", time: "Lun", unread: 0, online: false },
];

export default function Chat() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-slate-900 mb-3">Messages</h1>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="divide-y divide-gray-100">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => navigate(`/app/chat/${conv.id}`)}
            className="w-full flex items-center px-6 py-4 hover:bg-white transition-colors text-left"
          >
            <div className="relative mr-3">
              <img
                src={`https://images.unsplash.com/${conv.avatar}`}
                alt={conv.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conv.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-gray-50 rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className={`text-sm ${conv.unread > 0 ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{conv.name}</p>
                <span className={`text-[11px] ${conv.unread > 0 ? "text-blue-600 font-semibold" : "text-slate-400"}`}>{conv.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-xs truncate ${conv.unread > 0 ? "text-slate-700 font-medium" : "text-slate-400"}`}>{conv.lastMessage}</p>
                {conv.unread > 0 && (
                  <span className="ml-2 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0">{conv.unread}</span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-slate-500 font-medium">Aucune conversation</p>
            <p className="text-slate-400 text-sm mt-1">Contactez un utilisateur via une annonce</p>
          </div>
        )}
      </div>
    </div>
  );
}
