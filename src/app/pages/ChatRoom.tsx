import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Phone, MoreVertical, Send, Paperclip, Smile } from "lucide-react";

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

const chatData: Record<number, { name: string; avatar: string; online: boolean; messages: Message[] }> = {
  1: {
    name: "Youssef B.",
    avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    online: true,
    messages: [
      { id: 1, text: "Salam ! J'ai vu votre annonce pour la chambre près de la FST.", time: "14:20", isMine: true },
      { id: 2, text: "Salam ! Oui elle est toujours disponible.", time: "14:22", isMine: false },
      { id: 3, text: "C'est meublé ?", time: "14:25", isMine: true },
      { id: 4, text: "Oui la chambre est toujours disponible !", time: "14:30", isMine: false },
      { id: 5, text: "Le loyer inclut l'eau et l'électricité. Wi-Fi aussi.", time: "14:30", isMine: false },
      { id: 6, text: "Super ! Je peux visiter quand ?", time: "14:32", isMine: true },
    ],
  },
  2: {
    name: "Fatima Z.",
    avatar: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    online: true,
    messages: [
      { id: 1, text: "Bonjour ! Votre studio est encore disponible ?", time: "11:40", isMine: true },
      { id: 2, text: "Bonjour ! Oui, disponible à partir du 1er mars.", time: "11:55", isMine: false },
      { id: 3, text: "D'accord, on peut visiter demain ?", time: "12:15", isMine: false },
    ],
  },
  3: {
    name: "Agence ImmoPlus",
    avatar: "photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80",
    online: false,
    messages: [
      { id: 1, text: "Bonjour, je suis intéressé par l'appartement F3.", time: "10:00", isMine: true },
      { id: 2, text: "Bonjour ! Bien sûr, c'est un bel appartement au centre.", time: "10:30", isMine: false },
      { id: 3, text: "L'appartement est disponible à partir de mars.", time: "10:31", isMine: false },
    ],
  },
  4: {
    name: "Karim T.",
    avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    online: false,
    messages: [
      { id: 1, text: "Salut ! Tu as encore de la place dans ta coloc ?", time: "09:00", isMine: true },
      { id: 2, text: "Salut ! Oui il reste une place.", time: "09:15", isMine: false },
      { id: 3, text: "Parfait, envoie-moi ton numéro.", time: "09:20", isMine: false },
    ],
  },
  5: {
    name: "Amina L.",
    avatar: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    online: false,
    messages: [
      { id: 1, text: "Bonjour ! J'ai une chambre disponible si tu cherches.", time: "Lun 14:00", isMine: true },
      { id: 2, text: "Merci pour les infos !", time: "Lun 15:00", isMine: false },
    ],
  },
};

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const chat = chatData[Number(id)];

  if (!chat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 font-medium">Conversation introuvable</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-blue-600 font-semibold text-sm">Retour</button>
        </div>
      </div>
    );
  }

  const allMessages = [...chat.messages, ...messages];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isMine: true,
    }]);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center space-x-3 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate("/app/chat")} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-700" />
        </button>
        <img
          src={`https://images.unsplash.com/${chat.avatar}`}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900">{chat.name}</p>
          <p className={`text-[11px] ${chat.online ? "text-green-500" : "text-slate-400"}`}>
            {chat.online ? "En ligne" : "Hors ligne"}
          </p>
        </div>
        <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
          <Phone size={16} className="text-slate-600" />
        </button>
        <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
          <MoreVertical size={16} className="text-slate-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {allMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.isMine
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-white text-slate-800 rounded-bl-md shadow-sm border border-gray-100"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${
                msg.isMine ? "text-blue-200" : "text-slate-400"
              }`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Paperclip size={18} className="text-slate-500" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Écrire un message..."
              className="w-full bg-gray-50 px-4 py-2.5 pr-10 rounded-full border border-gray-200 text-sm outline-none focus:border-blue-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Smile size={18} className="text-slate-400" />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-blue-700 transition-colors"
          >
            <Send size={18} className="text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
