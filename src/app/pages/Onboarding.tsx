import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Home, Search, MessageSquare } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Find Student Housing",
    description: "Browse verified apartments, studios, and shared rooms near your university, all within your budget.",
    icon: Home,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Search & Filter Easily",
    description: "Filter housing by type, location, and price. Find offers from providers or roommate requests from students.",
    icon: Search,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 3,
    title: "Housing Assistant",
    description: "Need help? Our chatbot answers all your housing questions — prices, locations, tips, and more!",
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-6 justify-between safe-area-pb">
      <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className={`w-64 h-64 rounded-full flex items-center justify-center mb-10 ${slides[currentSlide].color} bg-opacity-30`}>
              <div className={`w-48 h-48 rounded-full flex items-center justify-center ${slides[currentSlide].color}`}>
                {(() => {
                  const Icon = slides[currentSlide].icon;
                  return <Icon size={80} />;
                })()}
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-4 px-4 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-slate-500 text-lg px-6 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex justify-center mb-8 space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center shadow-lg active:scale-[0.98] transition-transform"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="ml-2" />
        </button>
        
        {currentSlide < slides.length - 1 && (
          <button 
            onClick={() => navigate("/auth")}
            className="w-full text-slate-500 font-medium mt-4 py-2"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}