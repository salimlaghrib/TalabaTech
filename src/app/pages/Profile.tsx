import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Edit2, Home, Briefcase, GraduationCap, Clock, CheckCircle, XCircle, Building, Eye, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

/* ════════════════════════════════════════════════════
   PROVIDER PROFILE
   ════════════════════════════════════════════════════ */
function ProviderProfile() {
  const navigate = useNavigate();
  const { userName, approvalStatus, logout } = useUser();

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Edit2 size={18} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-green-400 to-blue-400 mb-4">
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white">{userName}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
              <Home size={12} />
              <span>Housing Provider</span>
            </span>
            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${
              approvalStatus === "approved" ? "bg-green-400/30 text-green-100"
              : approvalStatus === "pending" ? "bg-yellow-400/30 text-yellow-100"
              : "bg-red-400/30 text-red-100"
            }`}>
              {approvalStatus === "approved" && <CheckCircle size={12} />}
              {approvalStatus === "pending" && <Clock size={12} />}
              {approvalStatus === "rejected" && <XCircle size={12} />}
              <span>{approvalStatus === "approved" ? "Approved" : approvalStatus === "pending" ? "Pending" : "Rejected"}</span>
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-4 w-full justify-center mt-6">
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl px-6 py-3">
            <div className="text-xl font-bold text-white">3</div>
            <div className="text-xs text-blue-200 font-medium">Listings</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl px-6 py-3">
            <div className="text-xl font-bold text-white">285</div>
            <div className="text-xs text-blue-200 font-medium">Views</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl px-6 py-3">
            <div className="text-xl font-bold text-white">12</div>
            <div className="text-xs text-blue-200 font-medium">Inquiries</div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Pending / Rejected Banner */}
        {approvalStatus === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <p className="text-xs text-yellow-700 text-center font-medium">
              ⏳ Your account is under review. You'll be able to add listings once approved.
            </p>
          </div>
        )}
        {approvalStatus === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-xs text-red-700 text-center font-medium">
              ❌ Your provider request was rejected. Contact support for more info.
            </p>
          </div>
        )}

        {/* Quick Actions for approved */}
        {approvalStatus === "approved" && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate("/app/housing/add")}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center space-y-2 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plus size={22} className="text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Add Listing</span>
              </button>
              <button
                onClick={() => navigate("/app/housing")}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center space-y-2 hover:border-green-200 hover:bg-green-50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Building size={22} className="text-green-600" />
                </div>
                <span className="text-xs font-semibold text-slate-700">My Listings</span>
              </button>
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">Account</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {[
              { icon: User, label: "Personal Information", value: "Complete" },
              { icon: Bell, label: "Notifications", value: "On" },
              { icon: Settings, label: "App Settings", value: "" },
              { icon: HelpCircle, label: "Help & Support", value: "" },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${index !== 3 ? "border-b border-gray-50" : ""}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-slate-600"><item.icon size={20} /></div>
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.value && <span className="text-xs font-medium text-slate-400">{item.value}</span>}
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { logout(); navigate("/auth"); }}
            className="w-full bg-white text-red-500 font-bold p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center space-x-2 mt-6 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
          <div className="text-center mt-6 mb-8">
            <p className="text-xs text-slate-300">TalabaTech v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   STUDENT PROFILE
   ════════════════════════════════════════════════════ */
function StudentProfile() {
  const navigate = useNavigate();
  const { userName, logout } = useUser();

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm border-b border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Edit2 size={18} className="text-slate-600" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-green-400 mb-4">
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              <GraduationCap size={12} />
              <span>Student</span>
            </span>
            <span className="text-slate-400 text-sm">Computer Science • Year 2</span>
          </div>

          <div className="flex space-x-8 w-full justify-center border-t border-gray-100 pt-6 mt-2">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">4.8</div>
              <div className="text-xs text-slate-400 font-medium">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">12</div>
              <div className="text-xs text-slate-400 font-medium">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">3</div>
              <div className="text-xs text-slate-400 font-medium">Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">Account</h3>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {[
            { icon: User, label: "Personal Information", value: "Complete" },
            { icon: Bell, label: "Notifications", value: "On" },
            { icon: Settings, label: "App Settings", value: "" },
            { icon: HelpCircle, label: "Help & Support", value: "" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${index !== 3 ? "border-b border-gray-50" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg text-slate-600"><item.icon size={20} /></div>
                <span className="font-medium text-slate-700">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.value && <span className="text-xs font-medium text-slate-400">{item.value}</span>}
                <ChevronRight size={18} className="text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { logout(); navigate("/auth"); }}
          className="w-full bg-white text-red-500 font-bold p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center space-x-2 mt-6 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
        <div className="text-center mt-6 mb-8">
          <p className="text-xs text-slate-300">TalabaTech v1.0.0</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════════════ */
export default function Profile() {
  const { role } = useUser();

  if (role === "provider") {
    return <ProviderProfile />;
  }

  return <StudentProfile />;
}
