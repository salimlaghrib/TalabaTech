import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("talab_session");
    const timer = setTimeout(() => navigate(isLoggedIn ? "/app" : "/auth"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
          <img
            src="/logo_TalabaTech.png"
            alt="TalabaTech"
            className="h-24 w-auto"
          />
        </div>
      </div>
      <p className="text-blue-200 text-sm">Colocation étudiante simplifiée</p>
      <div className="mt-10 flex space-x-1.5">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
