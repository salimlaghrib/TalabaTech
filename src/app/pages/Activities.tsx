import { ArrowLeft, Calendar, MapPin, Ticket, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function Activities() {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      title: "University Welcome Party",
      date: "Oct 15, 2024",
      time: "20:00",
      location: "Campus Main Hall",
      price: "Free",
      image: "photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Coding Workshop",
      date: "Oct 18, 2024",
      time: "14:00",
      location: "FST Lab 3",
      price: "Free",
      image: "photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Hiking Trip to Oasis",
      date: "Oct 22, 2024",
      time: "08:00",
      location: "Meeting Point: City Gate",
      price: "50 MAD",
      image: "photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 pb-24">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 bg-white rounded-full shadow-sm border border-gray-200"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Student Activities</h1>
      </div>

      <div className="space-y-6">
        {activities.map((event) => (
          <div key={event.id} onClick={() => navigate(`/app/events/${event.id}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
            <div className="h-40 overflow-hidden relative">
              <img
                src={`https://images.unsplash.com/${event.image}`}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 flex flex-col items-center shadow-sm">
                <span className="text-red-500 uppercase">{event.date.split(" ")[0]}</span>
                <span className="text-lg">{event.date.split(" ")[1].replace(",", "")}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
              
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-500">
                  <ClockIcon className="w-4 h-4 mr-2 text-slate-400" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  {event.location}
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="font-bold text-blue-600">{event.price}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/app/chatroom/${event.id}?type=event`); }}
                    className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <MessageCircle size={14} />
                    <span>Chat</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/app/events/${event.id}`); }}
                    className="flex items-center space-x-1 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    <Ticket size={14} />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}