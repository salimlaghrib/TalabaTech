import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, Calendar as CalendarIcon, Users, MessageCircle, Share2, Heart, Ticket } from "lucide-react";

const eventsData: Record<string, {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  description: string;
  organizer: { name: string; avatar: string };
  attendees: { count: number; avatars: string[] };
}> = {
  "1": {
    id: 1,
    title: "University Welcome Party",
    date: "Oct 15, 2024",
    time: "20:00 - 23:00",
    location: "Campus Main Hall, FST Errachidia",
    price: "Free",
    image: "photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    description: "Rejoignez-nous pour la grande soirée de bienvenue universitaire! Rencontrez de nouveaux étudiants, profitez de la musique live, des jeux et de la nourriture gratuite. C'est l'occasion parfaite pour se faire de nouveaux amis et découvrir les clubs et associations du campus.",
    organizer: { name: "Club Culturel FST", avatar: "photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" },
    attendees: {
      count: 42,
      avatars: [
        "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
        "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      ],
    },
  },
  "2": {
    id: 2,
    title: "Coding Workshop",
    date: "Oct 18, 2024",
    time: "14:00 - 17:00",
    location: "FST Lab 3, Building B",
    price: "Free",
    image: "photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Atelier de programmation ouvert à tous les niveaux. Nous allons travailler sur des projets pratiques en Python et JavaScript. Apportez votre laptop avec VS Code installé. Des mentors seront disponibles pour vous aider.",
    organizer: { name: "Prof. Khaled", avatar: "photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" },
    attendees: {
      count: 28,
      avatars: [
        "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
      ],
    },
  },
  "3": {
    id: 3,
    title: "Hiking Trip to Oasis",
    date: "Oct 22, 2024",
    time: "08:00 - 18:00",
    location: "Meeting Point: City Gate, Errachidia",
    price: "50 MAD",
    image: "photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    description: "Randonnée d'une journée vers l'oasis. Transport organisé depuis la porte de la ville. N'oubliez pas d'apporter de l'eau, de la crème solaire et des chaussures de marche. Le déjeuner est inclus dans le prix.",
    organizer: { name: "Club Nature FST", avatar: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
    attendees: {
      count: 15,
      avatars: [
        "photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      ],
    },
  },
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData[id || "1"] || eventsData["1"];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative h-72">
        <img
          src={`https://images.unsplash.com/${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex space-x-3">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Date badge */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-red-500 text-xs font-bold uppercase">{event.date.split(" ")[0]}</span>
          <span className="text-2xl font-black text-slate-900">{event.date.split(" ")[1].replace(",", "")}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 -mt-4 relative bg-white rounded-t-3xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h1>

        <div className="flex flex-col space-y-3 mb-6 py-4 border-b border-gray-100">
          <div className="flex items-center text-sm text-slate-600">
            <CalendarIcon size={16} className="mr-3 text-blue-500" />
            {event.date}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock size={16} className="mr-3 text-blue-500" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <MapPin size={16} className="mr-3 text-blue-500" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Ticket size={16} className="mr-3 text-blue-500" />
            <span className="font-bold text-blue-600">{event.price}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">About</h2>
          <p className="text-slate-500 leading-relaxed text-sm">{event.description}</p>
        </div>

        {/* Organizer */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Organizer</h2>
          <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <img
              src={`https://images.unsplash.com/${event.organizer.avatar}`}
              alt={event.organizer.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <div className="font-bold text-slate-900">{event.organizer.name}</div>
              <div className="text-xs text-slate-400">Organizer</div>
            </div>
          </div>
        </div>

        {/* Attendees */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Attendees</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {event.attendees.avatars.map((avatar, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${avatar}`}
                    alt="Attendee"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <span className="ml-3 text-sm font-medium text-slate-600">
                +{event.attendees.count - 3} others
              </span>
            </div>
            <div className="flex items-center text-blue-600">
              <Users size={18} className="mr-1" />
              <span className="text-sm font-bold">{event.attendees.count}</span>
            </div>
          </div>
        </div>

        {/* Group Chat Banner */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/app/chatroom/${event.id}?type=event`)}
            className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-colors group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900">Event Group Chat</div>
                <div className="text-xs text-slate-500">
                  Chat with {event.attendees.count} participants
                </div>
              </div>
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold group-hover:bg-blue-700 transition-colors">
              Open
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 pb-safe z-40 flex space-x-3">
        <button
          onClick={() => navigate(`/app/chatroom/${event.id}?type=event`)}
          className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors"
        >
          <MessageCircle size={18} />
          <span>Group Chat</span>
        </button>
        <button className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg hover:bg-slate-800 transition-colors">
          <Ticket size={18} />
          <span>Join Event</span>
        </button>
      </div>
    </div>
  );
}

function Clock({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
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
