import { Search, MoreVertical, Send } from "lucide-react";

export default function Chat() {
  const conversations = [
    {
      id: 1,
      name: "Ahmed K.",
      lastMessage: "Is the apartment still available?",
      time: "10:30 AM",
      unread: 2,
      avatar: "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      online: true,
    },
    {
      id: 2,
      name: "Sara M.",
      lastMessage: "Sure, I can meet you at the campus.",
      time: "Yesterday",
      unread: 0,
      avatar: "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      online: false,
    },
    {
      id: 3,
      name: "Quick Wash Service",
      lastMessage: "Your laundry is ready for pickup!",
      time: "Yesterday",
      unread: 0,
      avatar: "photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80",
      online: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col pb-20">
      <div className="p-6 pb-2 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <button>
            <MoreVertical size={24} className="text-slate-400" />
          </button>
        </div>
        
        <div className="relative mb-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-2xl border-none outline-none text-sm focus:bg-gray-100 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <div key={chat.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0">
            <div className="relative mr-4">
              <img
                src={`https://images.unsplash.com/${chat.avatar}`}
                alt={chat.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-100"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-900 text-sm">{chat.name}</h3>
                <span className="text-xs text-slate-400">{chat.time}</span>
              </div>
              <p className={`text-sm truncate ${chat.unread > 0 ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>
                {chat.lastMessage}
              </p>
            </div>
            
            {chat.unread > 0 && (
              <div className="ml-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{chat.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}