import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/auth"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <img
          src="/logo_TalabaTech.png"
          alt="TalabaTech"
          className="h-24 w-auto brightness-0 invert mb-6"
        />
      </div>
      <h1 className="text-white text-3xl font-bold mb-2">TalabaTech</h1>
      <p className="text-blue-200 text-sm">Colocation étudiante simplifiée</p>
      <div className="mt-10 flex space-x-1.5">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
