import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logo from "@/public/logo_TalabaTech.png";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-30" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10"
      >
        <div className="bg-white p-4 rounded-3xl shadow-xl mb-6 flex items-center justify-center">
          <img src={logo} alt="TalabaTech" className="w-40 h-40 object-contain" />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">TalabaTech</h1>
        <p className="text-slate-500 font-medium text-lg">Errachidia</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </motion.div>
    </div>
  );
}