import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User, Chrome, GraduationCap, ArrowLeft, Home, Zap, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { useUser } from "../context/UserContext";
import logo from "@/public/logo_TalabaTech.png";

type Step = "choose-role" | "auth-form";

export default function Auth() {
  const navigate = useNavigate();
  const { setRole, setApprovalStatus, setUserName } = useUser();
  const [step, setStep] = useState<Step>("choose-role");
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"student" | "provider">("student");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");

  /* ─── Step 1: Choose Role ─── */
  if (step === "choose-role") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col justify-center p-6">
        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <img src={logo} alt="TalabaTech" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to TalabaTech</h1>
            <p className="text-slate-500">Choose your profile type to get started</p>
          </motion.div>

          {/* Quick Test Accounts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Zap size={16} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-800">Quick Test Login</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setRole("student");
                  setUserName("Amine Student");
                  setApprovalStatus("pending");
                  navigate("/app");
                }}
                className="w-full flex items-center space-x-3 bg-white rounded-xl p-3 border border-amber-100 hover:border-blue-300 transition-all text-left"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">Amine Student</div>
                  <div className="text-[11px] text-slate-400">amine@student.ma • Student</div>
                </div>
              </button>
              <button
                onClick={() => {
                  setRole("provider");
                  setUserName("Hassan Housing");
                  setApprovalStatus("approved");
                  navigate("/app");
                }}
                className="w-full flex items-center space-x-3 bg-white rounded-xl p-3 border border-amber-100 hover:border-green-300 transition-all text-left"
              >
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <Home size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">Hassan Housing</div>
                  <div className="text-[11px] text-slate-400">hassan@provider.ma • Housing Provider (Approved)</div>
                </div>
              </button>
              <button
                onClick={() => {
                  setRole("provider");
                  setUserName("Omar Pending");
                  setApprovalStatus("pending");
                  navigate("/app");
                }}
                className="w-full flex items-center space-x-3 bg-white rounded-xl p-3 border border-amber-100 hover:border-yellow-300 transition-all text-left"
              >
                <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Home size={18} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">Omar Pending</div>
                  <div className="text-[11px] text-slate-400">omar@provider.ma • Housing Provider (Pending)</div>
                </div>
              </button>
            </div>
          </motion.div>

          <p className="text-center text-xs text-slate-400 mb-4">Or create your own account</p>

          <div className="space-y-4">
            {/* Student Card */}
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => { setUserType("student"); setStep("auth-form"); }}
              className="w-full bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md text-left flex items-center space-x-5"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <GraduationCap size={32} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Browse housing, find roommates, and connect with other students
                </p>
              </div>
            </motion.button>

            {/* Housing Provider Card */}
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => { setUserType("provider"); setStep("auth-form"); }}
              className="w-full bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-300 transition-all shadow-sm hover:shadow-md text-left flex items-center space-x-5"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Home size={32} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Housing Provider</h3>
                <p className="text-sm text-slate-500 mt-1">
                  List your properties, manage listings, and respond to students
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Step 2: Login / Register Form ─── */
  const roleLabel = userType === "provider" ? "Housing Provider" : "Student";
  const roleColor = userType === "provider" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700";
  const roleIcon = userType === "provider" ? <Home size={14} /> : <GraduationCap size={14} />;
  const btnColor = userType === "provider" ? "bg-green-600 hover:bg-green-700" : "bg-slate-900 hover:bg-slate-800";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6">
      <div className="max-w-md mx-auto w-full">
        {/* Back button */}
        <button
          onClick={() => setStep("choose-role")}
          className="flex items-center space-x-1 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Change role</span>
        </button>

        <div className="text-center mb-6">
          <span className={`inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 ${roleColor}`}>
            {roleIcon}
            <span>{roleLabel}</span>
          </span>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-slate-500">
            {isLogin ? "Sign in to continue" : userType === "provider" ? "Register as a housing provider" : "Join the student community"}
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          setRole(userType);
          setUserName(formName || (userType === "student" ? "Student" : "Provider"));
          if (userType === "provider" && !isLogin) {
            setApprovalStatus("pending");
          } else if (userType === "provider" && isLogin) {
            setApprovalStatus("approved");
          }
          navigate("/app");
        }} className="space-y-4">
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="w-full bg-white pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            {isLogin && (
              <button type="button" className="text-sm text-blue-600 font-medium hover:underline">
                Forgot Password?
              </button>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 ${btnColor}`}
          >
            <span>{isLogin ? "Sign In" : "Sign Up"}</span>
            {roleIcon}
          </button>

          {userType === "provider" && !isLogin && (
            <p className="text-center text-xs text-slate-400 mt-2">
              Your account will be reviewed by an admin before activation
            </p>
          )}
        </form>

        <div className="mt-8 mb-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-50 text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { setRole(userType); setUserName(formName || (userType === "student" ? "Student" : "Provider")); navigate("/app"); }}
          className="w-full bg-white border border-gray-200 text-slate-700 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <Chrome size={20} className="text-red-500" />
          <span>Google</span>
        </button>

        <p className="mt-8 text-center text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
