import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 text-white p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="bg-white p-4 rounded-full shadow-lg mb-6">
          <GraduationCap size={64} className="text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">TalabaTech</h1>
        <p className="text-lg font-medium opacity-90">Your Student Life Simplified</p>
      </motion.div>
    </div>
  );
}
