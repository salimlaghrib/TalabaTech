import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { Mail, Lock, User, Phone, Eye, EyeOff, GraduationCap, Building2 } from "lucide-react";

type AuthMode = "login" | "register";

export default function Auth() {
  const navigate = useNavigate();
  const { setRole, setUserName, setApprovalStatus } = useUser();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "provider">("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {
    setRole(selectedRole);
    setUserName(form.name || (selectedRole === "student" ? "Étudiant" : "Prestataire"));
    setApprovalStatus("approved");
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 pt-14 pb-10 rounded-b-3xl">
        <div className="flex justify-center mb-4">
          <img src="/logo_TalabaTech.png" alt="TalabaTech" className="h-14 w-auto brightness-0 invert" />
        </div>
        <h1 className="text-white text-2xl font-bold text-center">
          {mode === "login" ? "Bon retour !" : "Créer un compte"}
        </h1>
        <p className="text-blue-200 text-sm text-center mt-1">
          {mode === "login" ? "Connectez-vous pour continuer" : "Rejoignez la communauté étudiante"}
        </p>
      </div>

      <div className="flex-1 px-6 py-6 -mt-4">
        {/* Role Selection (register only) */}
        {mode === "register" && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Je suis</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedRole("student")}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedRole === "student"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <GraduationCap size={28} className={selectedRole === "student" ? "text-blue-600" : "text-gray-400"} />
                <span className={`text-sm font-bold mt-2 ${selectedRole === "student" ? "text-blue-600" : "text-slate-600"}`}>Étudiant</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Chercher / proposer coloc</span>
              </button>
              <button
                onClick={() => setSelectedRole("provider")}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedRole === "provider"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Building2 size={28} className={selectedRole === "provider" ? "text-blue-600" : "text-gray-400"} />
                <span className={`text-sm font-bold mt-2 ${selectedRole === "provider" ? "text-blue-600" : "text-slate-600"}`}>Prestataire</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Proposer un logement</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Nom complet</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-50 pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-50 pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              />
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Téléphone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="06 XX XX XX XX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-gray-50 pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Mot de passe</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-gray-50 pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Confirmer mot de passe</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full bg-gray-50 pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {mode === "login" && (
          <div className="flex justify-end mt-2">
            <button className="text-blue-600 text-xs font-semibold">Mot de passe oublié ?</button>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm mt-5 hover:bg-blue-700 transition-colors shadow-lg"
        >
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </button>

        {/* Toggle mode */}
        <p className="text-center text-sm text-slate-500 mt-4">
          {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-600 font-semibold ml-1"
          >
            {mode === "login" ? "S'inscrire" : "Se connecter"}
          </button>
        </p>

        {/* ── Comptes de test ── */}
        <div className="mt-8 pt-5 border-t border-gray-200">
          <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Connexion rapide (test)</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setRole("student");
                setUserName("Youssef B.");
                setApprovalStatus("approved");
                navigate("/app");
              }}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="text-sm font-bold text-blue-700">Étudiant</span>
              <span className="text-[10px] text-blue-400 mt-0.5">youssef@test.com</span>
            </button>
            <button
              onClick={() => {
                setRole("provider");
                setUserName("ImmoPlus");
                setApprovalStatus("approved");
                navigate("/app");
              }}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                <Building2 size={22} className="text-white" />
              </div>
              <span className="text-sm font-bold text-purple-700">Prestataire</span>
              <span className="text-[10px] text-purple-400 mt-0.5">immoplus@test.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
