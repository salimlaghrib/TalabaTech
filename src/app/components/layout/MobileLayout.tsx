import { Outlet, NavLink } from "react-router";
import { Home, MessageCircle, Bell, User } from "lucide-react";

export function MobileLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <Outlet />
      </div>
      
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 py-3 px-6 flex justify-between items-center z-50">
        <NavLink 
          to="/app/home" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Home size={24} strokeWidth={isActive ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        
        <NavLink 
          to="/app/chat" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <MessageCircle size={24} strokeWidth={isActive ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Messages</span>
        </NavLink>
        
        <button 
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors"
          onClick={() => alert("Notifications coming soon!")}
        >
          <Bell size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">Alerts</span>
        </button>
        
        <NavLink 
          to="/app/profile" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <User size={24} strokeWidth={isActive ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
