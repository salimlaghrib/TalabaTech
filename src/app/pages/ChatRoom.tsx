import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ArrowLeft, Send, Image, Smile, MoreVertical, Users } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isMe: boolean;
}

// Mock data for different chat contexts
const chatContexts: Record<string, { name: string; type: "direct" | "group"; avatar: string; members?: number; messages: Message[] }> = {
  // Housing landlord chats
  "housing-1": {
    name: "Ahmed K.",
    type: "direct",
    avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    messages: [
      { id: 1, sender: "Ahmed K.", avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", text: "Bonjour! Oui, l'appartement est toujours disponible.", time: "10:30", isMe: false },
      { id: 2, sender: "Me", avatar: "", text: "Super! Est-ce que je peux le visiter demain?", time: "10:32", isMe: true },
      { id: 3, sender: "Ahmed K.", avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", text: "Bien sûr, à quelle heure vous convient?", time: "10:33", isMe: false },
    ],
  },
  "housing-2": {
    name: "Sara M.",
    type: "direct",
    avatar: "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    messages: [
      { id: 1, sender: "Sara M.", avatar: "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", text: "Le studio est meublé et prêt.", time: "09:15", isMe: false },
      { id: 2, sender: "Me", avatar: "", text: "Le prix est négociable?", time: "09:20", isMe: true },
    ],
  },
  // Event group chats
  "event-1": {
    name: "University Welcome Party",
    type: "group",
    avatar: "photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=100&q=80",
    members: 42,
    messages: [
      { id: 1, sender: "Youssef B.", avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", text: "Qui vient à la soirée ce soir? 🎉", time: "14:00", isMe: false },
      { id: 2, sender: "Fatima Z.", avatar: "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", text: "Moi je serai là! À quelle heure on se retrouve?", time: "14:05", isMe: false },
      { id: 3, sender: "Me", avatar: "", text: "Je viens aussi! On peut se retrouver à l'entrée à 20h?", time: "14:10", isMe: true },
      { id: 4, sender: "Youssef B.", avatar: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", text: "Parfait! RDV à l'entrée principale 👍", time: "14:12", isMe: false },
      { id: 5, sender: "Amina L.", avatar: "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", text: "Est-ce qu'il y a un dress code?", time: "14:15", isMe: false },
    ],
  },
  "event-2": {
    name: "Coding Workshop",
    type: "group",
    avatar: "photo-1531482615713-2afd69097998?auto=format&fit=crop&w=100&q=80",
    members: 28,
    messages: [
      { id: 1, sender: "Prof. Khaled", avatar: "photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", text: "N'oubliez pas d'installer VS Code avant le workshop!", time: "11:00", isMe: false },
      { id: 2, sender: "Me", avatar: "", text: "On travaille sur quel langage?", time: "11:05", isMe: true },
      { id: 3, sender: "Prof. Khaled", avatar: "photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", text: "Python et JavaScript. Apportez vos laptops!", time: "11:08", isMe: false },
    ],
  },
  "event-3": {
    name: "Hiking Trip to Oasis",
    type: "group",
    avatar: "photo-1551632811-561732d1e306?auto=format&fit=crop&w=100&q=80",
    members: 15,
    messages: [
      { id: 1, sender: "Omar H.", avatar: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", text: "Qui a besoin de transport? J'ai de la place dans ma voiture 🚗", time: "08:00", isMe: false },
      { id: 2, sender: "Nadia R.", avatar: "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", text: "Moi! Tu peux me prendre à la fac?", time: "08:10", isMe: false },
      { id: 3, sender: "Me", avatar: "", text: "N'oubliez pas d'apporter de l'eau et de la crème solaire!", time: "08:15", isMe: true },
    ],
  },
};

export default function ChatRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const chatType = searchParams.get("type") || "direct";
  const chatKey = `${chatType}-${id}`;

  const chatData = chatContexts[chatKey] || {
    name: "Chat",
    type: "direct" as const,
    avatar: "",
    messages: [],
  };

  const [messages, setMessages] = useState<Message[]>(chatData.messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: messages.length + 1,
      sender: "Me",
      avatar: "",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center space-x-3 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={22} className="text-slate-700" />
        </button>
        <div className="relative">
          <img
            src={`https://images.unsplash.com/${chatData.avatar}`}
            alt={chatData.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
          />
          {chatData.type === "group" && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
              <Users size={10} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-slate-900 text-sm truncate">{chatData.name}</h2>
          <p className="text-xs text-slate-400">
            {chatData.type === "group"
              ? `${chatData.members} members`
              : "Online"}
          </p>
        </div>
        <button className="p-1">
          <MoreVertical size={20} className="text-slate-400" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
        {chatData.type === "group" && (
          <div className="text-center">
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
              Group chat for this event
            </span>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
            {!msg.isMe && chatData.type === "group" && (
              <img
                src={`https://images.unsplash.com/${msg.avatar}`}
                alt={msg.sender}
                className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
              />
            )}
            {!msg.isMe && chatData.type === "direct" && (
              <img
                src={`https://images.unsplash.com/${msg.avatar}`}
                alt={msg.sender}
                className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
              />
            )}
            <div className={`max-w-[75%]`}>
              {!msg.isMe && chatData.type === "group" && (
                <span className="text-xs font-semibold text-blue-600 mb-1 block">{msg.sender}</span>
              )}
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isMe
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 border border-gray-100 rounded-bl-md shadow-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className={`text-[10px] text-slate-400 mt-1 block ${msg.isMe ? "text-right" : ""}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 p-3 px-4 flex items-center space-x-2 pb-safe">
        <button className="p-2 text-slate-400 hover:text-slate-600">
          <Image size={22} />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600">
          <Smile size={22} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 outline-none text-sm focus:border-blue-200 focus:bg-white transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="p-2.5 bg-blue-600 rounded-full text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
