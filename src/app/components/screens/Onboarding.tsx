import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Utensils, Users, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const slides = [
  {
    title: "Find Student Housing Easily",
    desc: "Discover affordable and convenient housing options near your campus.",
    icon: <Home className="w-12 h-12 text-white" />,
    image: "https://images.unsplash.com/photo-1579632151052-92f741fb9b79?auto=format&fit=crop&q=80&w=1080",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Affordable Meals & Services",
    desc: "Find the best student-friendly restaurants, laundry, and services around you.",
    icon: <Utensils className="w-12 h-12 text-white" />,
    image: "https://images.unsplash.com/photo-1759269106058-a52e5ac35e01?auto=format&fit=crop&q=80&w=1080",
    color: "from-teal-500 to-emerald-600"
  },
  {
    title: "Join the Student Community",
    desc: "Connect with other students, buy/sell items, and make the most of your uni life.",
    icon: <Users className="w-12 h-12 text-white" />,
    image: "https://images.unsplash.com/photo-1770970534456-5b19c6a1d3b8?auto=format&fit=crop&q=80&w=1080",
    color: "from-violet-500 to-purple-600"
  }
];

export function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${slides[current].color} opacity-90 z-10`} />
            <img 
              src={slides[current].image} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-12 px-6 text-white text-center">
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
           <motion.div
             key={`icon-${current}`}
             initial={{ scale: 0.5, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="bg-white/20 backdrop-blur-md p-6 rounded-full mb-8 shadow-xl border border-white/30"
           >
             {slides[current].icon}
           </motion.div>
        </div>

        <div className="mb-12 max-w-sm mx-auto">
          <motion.h2
            key={`title-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold mb-4 leading-tight"
          >
            {slides[current].title}
          </motion.h2>
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 leading-relaxed"
          >
            {slides[current].desc}
          </motion.p>
        </div>

        <div className="flex items-center justify-between w-full max-w-xs mx-auto">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="bg-white text-gray-900 rounded-full p-4 shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center font-bold"
          >
            {current === slides.length - 1 ? "Get Started" : <ArrowRight size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
