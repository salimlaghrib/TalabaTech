import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Search, Bot, MessageCircle, User } from "lucide-react";
import { useUser } from "./context/UserContext";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUser();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/app" },
    { icon: Search, label: "Annonces", path: "/app/announcements" },
    { icon: Bot, label: "Chatbot", path: "/app/chatbot", isCenter: true },
    { icon: MessageCircle, label: "Messages", path: "/app/chat" },
    { icon: User, label: "Profil", path: "/app/profile" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-slate-900 font-sans max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50 shadow-lg max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.path.includes("?")
            ? location.pathname === item.path.split("?")[0]
            : location.pathname === item.path || (item.path !== "/app" && location.pathname.startsWith(item.path));

          if (item.isCenter) {
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <item.icon size={26} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-semibold text-blue-600 mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center space-y-0.5 w-14"
            >
              <div
                className={classNames(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={classNames("text-[10px] font-medium", isActive ? "text-blue-600" : "text-gray-400")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}