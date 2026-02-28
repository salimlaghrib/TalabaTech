import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, GraduationCap } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'provider'>('student');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/app');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-500">Join the TalabaTech community</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              userType === 'student' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            <GraduationCap size={24} />
            <span className="font-medium text-sm">Student</span>
          </button>
          <button
            type="button"
            onClick={() => setUserType('provider')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              userType === 'provider' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            <Briefcase size={24} />
            <span className="font-medium text-sm">Service Provider</span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 bg-white p-6 rounded-2xl shadow-xl border border-gray-100/50 backdrop-blur-sm">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" id="terms" className="mt-1 rounded text-blue-600 focus:ring-blue-500" required />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
