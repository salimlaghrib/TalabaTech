import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Phone, MoreVertical, Send, Paperclip, Smile } from "lucide-react";

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

interface ConvMeta {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  time: string;
  unread: number;
}

const MSGS_KEY = (id: number) => `talab_messages_${id}`;
const CONVS_KEY = "talab_conversations";

function loadMessages(id: number, seed: Message[]): Message[] {
  try {
    const stored = localStorage.getItem(MSGS_KEY(id));
    if (stored) return JSON.parse(stored);
  } catch {}
  if (seed.length > 0) localStorage.setItem(MSGS_KEY(id), JSON.stringify(seed));
  return seed;
}

function saveMessages(id: number, messages: Message[]) {
  localStorage.setItem(MSGS_KEY(id), JSON.stringify(messages));
}

function updateConvLastMessage(id: number, text: string, time: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(CONVS_KEY) || "[]") as ConvMeta[];
    const idx = stored.findIndex((c) => c.id === id);
    if (idx >= 0) {
      stored[idx].lastMessage = text;
      stored[idx].time = time;
      stored[idx].unread = 0;
      localStorage.setItem(CONVS_KEY, JSON.stringify(stored));
    }
  } catch {}
}

const staticChatData: Record<number, { name: string; avatar: string; online: boolean; seedMessages: Message[] }> = {
  1: {
    name: "Youssef B.",
    avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    online: true,
    seedMessages: [
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
    seedMessages: [
      { id: 1, text: "Bonjour ! Votre studio est encore disponible ?", time: "11:40", isMine: true },
      { id: 2, text: "Bonjour ! Oui, disponible à partir du 1er mars.", time: "11:55", isMine: false },
      { id: 3, text: "D'accord, on peut visiter demain ?", time: "12:15", isMine: false },
    ],
  },
  3: {
    name: "Agence ImmoPlus",
    avatar: "photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80",
    online: false,
    seedMessages: [
      { id: 1, text: "Bonjour, je suis intéressé par l'appartement F3.", time: "10:00", isMine: true },
      { id: 2, text: "Bonjour ! Bien sûr, c'est un bel appartement au centre.", time: "10:30", isMine: false },
      { id: 3, text: "L'appartement est disponible à partir de mars.", time: "10:31", isMine: false },
    ],
  },
  4: {
    name: "Karim T.",
    avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    online: false,
    seedMessages: [
      { id: 1, text: "Salut ! Tu as encore de la place dans ta coloc ?", time: "09:00", isMine: true },
      { id: 2, text: "Salut ! Oui il reste une place.", time: "09:15", isMine: false },
      { id: 3, text: "Parfait, envoie-moi ton numéro.", time: "09:20", isMine: false },
    ],
  },
  5: {
    name: "Amina L.",
    avatar: "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    online: false,
    seedMessages: [
      { id: 1, text: "Bonjour ! J'ai une chambre disponible si tu cherches.", time: "Lun 14:00", isMine: true },
      { id: 2, text: "Merci pour les infos !", time: "Lun 15:00", isMine: false },
    ],
  },
};

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = Number(id);
  const staticChat = staticChatData[numId];
  const bottomRef = useRef<HTMLDivElement>(null);

  const [convMeta, setConvMeta] = useState<{ name: string; avatar: string; online: boolean } | null>(() => {
    if (staticChat) return { name: staticChat.name, avatar: staticChat.avatar, online: staticChat.online };
    try {
      const convs = JSON.parse(localStorage.getItem(CONVS_KEY) || "[]") as ConvMeta[];
      const found = convs.find((c) => c.id === numId);
      if (found) return { name: found.name, avatar: found.avatar, online: found.online };
    } catch {}
    return null;
  });

  const [messages, setMessages] = useState<Message[]>(() =>
    loadMessages(numId, staticChat?.seedMessages ?? [])
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!convMeta) {
      try {
        const convs = JSON.parse(localStorage.getItem(CONVS_KEY) || "[]") as ConvMeta[];
        const found = convs.find((c) => c.id === numId);
        if (found) setConvMeta({ name: found.name, avatar: found.avatar, online: found.online });
      } catch {}
    }
  }, [numId, convMeta]);

  if (!convMeta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 font-medium">Conversation introuvable</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-blue-600 font-semibold text-sm">Retour</button>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = { id: Date.now(), text: input.trim(), time, isMine: true };
    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(numId, updated);
    updateConvLastMessage(numId, input.trim(), time);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center space-x-3 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate("/app/chat")} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-700" />
        </button>
        <img
          src={`https://images.unsplash.com/${convMeta.avatar}`}
          alt={convMeta.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900">{convMeta.name}</p>
          <p className={`text-[11px] ${convMeta.online ? "text-green-500" : "text-slate-400"}`}>
            {convMeta.online ? "En ligne" : "Hors ligne"}
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
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">Commencez la conversation !</p>
          </div>
        )}
        {messages.map((msg) => (
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
        <div ref={bottomRef} />
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
