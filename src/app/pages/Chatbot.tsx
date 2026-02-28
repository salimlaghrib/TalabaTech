import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, ArrowLeft, RotateCcw, Home, MapPin, Users, BedDouble } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
  suggestions?: string[];
  cards?: HousingCard[];
}

interface HousingCard {
  title: string;
  price: string;
  location: string;
  type: string;
  image: string;
}

const quickQuestions = [
  "🏠 Trouver une colocation",
  "💰 Budget logement étudiant",
  "📋 Comment publier une annonce ?",
  "🤝 Conseils colocation",
];

function getTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getBotResponse(userMsg: string): { text: string; suggestions?: string[]; cards?: HousingCard[] } {
  const msg = userMsg.toLowerCase();

  if (msg.includes("colocation") || msg.includes("coloc") || msg.includes("trouver")) {
    return {
      text: "🏠 Je peux vous aider à trouver une colocation ! Voici quelques logements disponibles près de votre campus. Vous pouvez aussi publier votre propre annonce depuis l'accueil.",
      suggestions: ["Voir plus de colocations", "Publier une annonce", "Filtrer par prix"],
      cards: [
        { title: "Chambre meublée près FST", price: "750 MAD/mois", location: "Près FST, Errachidia", type: "Colocation", image: "photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" },
        { title: "Studio partagé étudiants", price: "600 MAD/mois", location: "Hay Mohammadi", type: "Colocation", image: "photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80" },
      ],
    };
  }

  if (msg.includes("budget") || msg.includes("prix") || msg.includes("combien") || msg.includes("mad")) {
    return {
      text: "💰 Le budget moyen pour un étudiant à Errachidia :\n\n• Chambre en colocation : 500-800 MAD/mois\n• Studio individuel : 1000-1500 MAD/mois\n• Appartement partagé : 600-900 MAD/personne\n\nJe vous conseille de chercher une colocation pour réduire les coûts !",
      suggestions: ["Colocations < 700 MAD", "Voir les studios", "Aide financière"],
    };
  }

  if (msg.includes("publier") || msg.includes("annonce") || msg.includes("ajouter")) {
    return {
      text: "📋 Pour publier une annonce, c'est simple :\n\n1️⃣ Allez sur l'Accueil\n2️⃣ Cliquez sur \"J'offre une coloc\" ou \"Je cherche coloc\"\n3️⃣ Remplissez le formulaire avec photos, prix, description\n4️⃣ Publiez !\n\nVotre annonce sera visible par tous les étudiants.",
      suggestions: ["J'offre une coloc", "Je cherche une coloc", "Retour à l'accueil"],
    };
  }

  if (msg.includes("conseil") || msg.includes("astuce") || msg.includes("aide")) {
    return {
      text: "🤝 Voici mes conseils pour une bonne colocation :\n\n✅ Visitez le logement avant de signer\n✅ Discutez des règles de vie commune\n✅ Vérifiez le contrat et les charges\n✅ Utilisez notre messagerie pour contacter les annonceurs\n✅ Privilégiez les logements proches du campus",
      suggestions: ["Trouver une colocation", "Contacter un annonceur", "Voir les annonces"],
    };
  }

  if (msg.includes("bonjour") || msg.includes("salut") || msg.includes("hello") || msg.includes("hi")) {
    return {
      text: `Bonjour ! 👋 Je suis l'assistant TalabaTech. Je peux vous aider à :\n\n🏠 Trouver une colocation\n💰 Estimer votre budget\n📋 Publier une annonce\n🤝 Donner des conseils\n\nQue souhaitez-vous faire ?`,
      suggestions: ["Trouver une colocation", "Budget logement", "Publier une annonce"],
    };
  }

  if (msg.includes("merci") || msg.includes("super") || msg.includes("parfait")) {
    return {
      text: "De rien ! 😊 N'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider à trouver le logement idéal !",
      suggestions: ["Autre question", "Retour à l'accueil"],
    };
  }

  if (msg.includes("filtrer") || msg.includes("filtre") || msg.includes("< 700") || msg.includes("studio")) {
    return {
      text: "🔍 Pour filtrer les annonces, rendez-vous dans l'onglet \"Annonces\" et utilisez les filtres par :\n\n• Type (Colocation, Studio, Appartement)\n• Prix (min - max)\n• Localisation\n• Équipements\n\nVous pouvez aussi me demander directement !",
      suggestions: ["Voir les annonces", "Colocations disponibles", "Retour"],
    };
  }

  return {
    text: "Je comprends votre demande ! 🤔 Pour mieux vous aider, pouvez-vous préciser ce que vous recherchez ? Je peux vous aider avec la recherche de logement, les colocations, le budget, ou la publication d'annonces.",
    suggestions: ["Trouver une colocation", "Budget logement", "Publier une annonce", "Conseils"],
  };
}

export default function Chatbot() {
  const navigate = useNavigate();
  const { userName } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Bonjour ${userName} ! 👋\nJe suis votre assistant TalabaTech. Comment puis-je vous aider aujourd'hui ?`,
      sender: "bot",
      time: getTime(),
      suggestions: ["Trouver une colocation", "Budget logement", "Publier une annonce", "Conseils colocation"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: response.text,
        sender: "bot",
        time: getTime(),
        suggestions: response.suggestions,
        cards: response.cards,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: `Bonjour ${userName} ! 👋\nJe suis votre assistant TalabaTech. Comment puis-je vous aider aujourd'hui ?`,
        sender: "bot",
        time: getTime(),
        suggestions: ["Trouver une colocation", "Budget logement", "Publier une annonce", "Conseils colocation"],
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 pt-6 pb-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate("/app")} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <ArrowLeft size={18} className="text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 relative">
                <Bot size={22} className="text-white" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-blue-600" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base">TalabaTech Bot</h1>
                <p className="text-blue-200 text-xs flex items-center space-x-1">
                  <Sparkles size={10} />
                  <span>Assistant intelligent</span>
                </p>
              </div>
            </div>
          </div>
          <button onClick={resetChat} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <RotateCcw size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Quick Questions (show only at start) */}
      {messages.length <= 1 && (
        <div className="px-5 py-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Questions fréquentes</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-left hover:shadow-md hover:border-blue-200 transition-all"
              >
                <p className="text-xs font-medium text-slate-700">{q}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${msg.sender === "user" ? "order-1" : "order-2"}`}>
              {/* Avatar */}
              <div className={`flex items-end space-x-2 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === "bot" ? "bg-blue-100" : "bg-slate-200"
                }`}>
                  {msg.sender === "bot" ? (
                    <Bot size={14} className="text-blue-600" />
                  ) : (
                    <User size={14} className="text-slate-600" />
                  )}
                </div>

                <div>
                  {/* Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-white text-slate-800 shadow-sm border border-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>

                  {/* Housing Cards */}
                  {msg.cards && (
                    <div className="mt-3 space-y-2">
                      {msg.cards.map((card, i) => (
                        <div key={i} onClick={() => navigate("/app/announcements")} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow">
                          <img src={`https://images.unsplash.com/${card.image}`} alt={card.title} className="w-20 h-20 object-cover" />
                          <div className="p-2.5 flex-1">
                            <p className="text-xs font-bold text-slate-800 mb-0.5">{card.title}</p>
                            <p className="text-[10px] text-slate-500 flex items-center"><MapPin size={9} className="mr-0.5" />{card.location}</p>
                            <div className="flex items-center justify-between mt-1.5">
                              <span className="text-xs font-bold text-blue-600">{card.price}</span>
                              <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">{card.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-semibold border border-blue-100 hover:bg-blue-100 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-right text-slate-400" : "text-slate-400"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot size={14} className="text-blue-600" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 shadow-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="w-full bg-gray-50 text-slate-900 placeholder-slate-400 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center shadow-md disabled:opacity-40 disabled:shadow-none hover:bg-blue-700 transition-colors"
          >
            <Send size={18} className="text-white ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
