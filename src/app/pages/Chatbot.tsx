import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  time: string;
}

const botResponses: Record<string, string> = {
  housing: "🏠 In the Housing section you can:\n• Browse housing offers from providers\n• Filter by Offers or Roommates tabs\n• Filter by type: Apartment, Studio, Shared, Private\n• Tap the + button to post a Housing Request or find a Roommate\n\nWould you like tips on finding the best deal?",
  price: "💰 Housing prices in Errachidia typically range from:\n• Shared rooms: 400–700 MAD/mo\n• Studios: 800–1200 MAD/mo\n• Apartments: 1200–2500 MAD/mo\n\nTip: Use the filter tabs in Housing to sort by type and find your budget range!",
  location: "📍 Popular housing areas for students:\n• Near FST Campus — closest to university\n• Hay Mohammadi — affordable neighborhood\n• City Center — more amenities & shops\n• Hay Massira — quiet residential area\n\nCheck the Housing section → each listing shows its location with a 📍 pin!",
  roommate: "👥 Looking for a roommate? You have 2 options:\n\n1️⃣ Browse existing requests: Go to Housing → tap 'Roommates' tab\n2️⃣ Post your own: Tap the + button → 'Find a Roommate'\n\nYou can add your age, study field, lifestyle, and preferred amenities so others can find you!",
  request: "📝 To post a Housing Request:\n1. Go to Housing section\n2. Tap the orange + button\n3. Choose 'Housing Request'\n4. Fill in: title, description, budget, location, features\n5. Add your contact info\n6. Submit!\n\nProviders will see your request and contact you directly.",
  tips: "💡 Tips for finding student housing:\n1. Start searching early (Aug-Sep is peak season)\n2. Use the filter tabs to narrow results\n3. Check listing details — look for Wi-Fi, furnished, etc.\n4. Post a Housing Request so providers contact YOU\n5. Compare prices with similar listings\n6. Consider finding a Roommate to split costs!",
  amenities: "🛋️ Common amenities to look for in listings:\n• Wi-Fi (essential for studies!)\n• Furnished rooms\n• Kitchen access\n• Air conditioning / heating\n• Parking\n• Private bathroom\n\nEach listing shows its amenities. Use the filter tabs (Apartment, Studio, Shared, Private) to narrow down!",
  contract: "📋 Important things about housing contracts:\n• Always get a written contract\n• Check the notice period (usually 1-3 months)\n• Verify what's included in the rent\n• Keep a copy of all documents\n• Take photos of the property condition at move-in\n\nYou can contact providers directly from their listings via Call, Email, or Chat.",
  navigate: "🧭 Here's how to navigate the Housing section:\n\n• Home → Featured Housing listings\n• Housing tab → All listings with filters\n  - All / Offers / Roommates toggle\n  - Type filters: All, Apartment, Studio, Shared, Private\n• + button → Housing Request or Find a Roommate\n• Chatbot (here!) → Ask me anything about housing!",
  help: "I'm your Housing Assistant! 🏠 I can help you with:\n• 🔍 Finding housing — browse listings\n• 💰 Price ranges — budget info\n• 📍 Best locations — areas near campus\n• 👥 Finding roommates — colocation\n• 📝 Posting a request — housing or roommate\n• 💡 Housing tips — advice\n• 🛋️ Amenities — what to look for\n• 📋 Contracts — your rights\n• 🧭 Navigation — how to use the app\n\nJust ask me anything!",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("prix") || lower.includes("cost") || lower.includes("combien") || lower.includes("mad") || lower.includes("budget") || lower.includes("cher") || lower.includes("cheap")) {
    return botResponses.price;
  }
  if (lower.includes("location") || lower.includes("where") || lower.includes("area") || lower.includes("quartier") || lower.includes("zone") || lower.includes("campus") || lower.includes("fst") || lower.includes("neighborhood") || lower.includes("où")) {
    return botResponses.location;
  }
  if (lower.includes("roommate") || lower.includes("coloc") || lower.includes("partage") || lower.includes("share") || lower.includes("together")) {
    return botResponses.roommate;
  }
  if (lower.includes("request") || lower.includes("demande") || lower.includes("post") || lower.includes("publier") || lower.includes("cherche") || lower.includes("besoin")) {
    return botResponses.request;
  }
  if (lower.includes("tip") || lower.includes("conseil") || lower.includes("advice") || lower.includes("recommend") || lower.includes("suggest")) {
    return botResponses.tips;
  }
  if (lower.includes("amenity") || lower.includes("amenities") || lower.includes("wifi") || lower.includes("furnished") || lower.includes("meublé") || lower.includes("kitchen") || lower.includes("equip")) {
    return botResponses.amenities;
  }
  if (lower.includes("contract") || lower.includes("contrat") || lower.includes("bail") || lower.includes("lease") || lower.includes("rights") || lower.includes("droit") || lower.includes("legal")) {
    return botResponses.contract;
  }
  if (lower.includes("navigate") || lower.includes("how") || lower.includes("comment") || lower.includes("use") || lower.includes("utiliser") || lower.includes("interface") || lower.includes("where") || lower.includes("find") || lower.includes("trouver")) {
    return botResponses.navigate;
  }
  if (lower.includes("housing") || lower.includes("logement") || lower.includes("apartment") || lower.includes("maison") || lower.includes("studio") || lower.includes("room") || lower.includes("chambre") || lower.includes("louer") || lower.includes("rent")) {
    return botResponses.housing;
  }
  if (lower.includes("help") || lower.includes("aide") || lower.includes("bonjour") || lower.includes("hi") || lower.includes("hello") || lower.includes("salut") || lower.includes("menu")) {
    return botResponses.help;
  }
  return "I'm specialized in housing! 🏠 Try asking me about:\n• Browse listings & filters\n• Prices & budgets\n• Best locations near campus\n• Finding a roommate\n• Posting a housing request\n• Amenities to look for\n• Contracts & rights\n\nOr type 'help' to see all topics!";
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 I'm your Housing Assistant. I can help you find the perfect student housing — prices, locations, roommates, tips, and more! Ask me anything about housing! 🏠",
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot thinking delay
    setTimeout(() => {
      const botMsg: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const quickActions = ["Housing", "Prices", "Locations", "Roommates", "Tips"];

  return (
    <div className="bg-white min-h-screen flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center space-x-3 shadow-md">
        <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Bot size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg">Housing Assistant</h1>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-white/80 text-xs">Always online</span>
          </div>
        </div>
        <div className="ml-auto">
          <Sparkles size={20} className="text-white/60" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
            {msg.isBot && (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <Bot size={16} className="text-blue-600" />
              </div>
            )}
            <div className="max-w-[80%]">
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.isBot
                    ? "bg-white text-slate-800 border border-gray-100 rounded-bl-md shadow-sm"
                    : "bg-blue-600 text-white rounded-br-md"
                }`}
              >
                {msg.text}
              </div>
              <span className={`text-[10px] text-slate-400 mt-1 block ${msg.isBot ? "" : "text-right"}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-white border-t border-gray-50 flex space-x-2 overflow-x-auto scrollbar-hide">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => {
                setInput(action);
                setTimeout(() => {
                  const userMsg: Message = {
                    id: messages.length + 1,
                    text: action,
                    isBot: false,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  };
                  setMessages((prev) => [...prev, userMsg]);
                  setTimeout(() => {
                    const botMsg: Message = {
                      id: messages.length + 2,
                      text: getBotResponse(action),
                      isBot: true,
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    };
                    setMessages((prev) => [...prev, botMsg]);
                  }, 800);
                  setInput("");
                }, 100);
              }}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold whitespace-nowrap border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-100 p-3 px-4 flex items-center space-x-2 pb-safe">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about housing..."
          className="flex-1 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 outline-none text-sm focus:border-blue-200 focus:bg-white transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 bg-blue-600 rounded-full text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
