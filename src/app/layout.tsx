import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Bot, User, Building, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "./context/UserContext";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUser();

  const navItems = role === "provider"
    ? [
        { icon: Home, label: "Home", path: "/app" },
        { icon: Building, label: "My Listings", path: "/app/housing" },
        { icon: Bot, label: "Chatbot", path: "/app/chatbot" },
        { icon: User, label: "Profile", path: "/app/profile" },
      ]
    : [
        { icon: Home, label: "Home", path: "/app" },
        { icon: Bot, label: "Chatbot", path: "/app/chatbot" },
        { icon: User, label: "Profile", path: "/app/profile" },
      ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-slate-900 font-sans">
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50 shadow-lg pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/app" && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center space-y-1 w-16"
            >
              <div
                className={classNames(
                  "p-2 rounded-2xl transition-all duration-300",
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={classNames("text-xs font-medium", isActive ? "text-blue-600" : "text-gray-400")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}