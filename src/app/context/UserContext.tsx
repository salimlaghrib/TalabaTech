import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserRole = "student" | "provider";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type AnnouncementType = "search-coloc" | "offer-room" | "provider-listing";

export interface Announcement {
  id: number;
  type: AnnouncementType;
  title: string;
  description: string;
  city: string;
  price: string;
  housingType: string;
  image: string;
  authorName: string;
  authorImage: string;
  phone?: string;
  posted: string;
  tags: string[];
  gender?: string;
  views: number;
  status: "active" | "paused";
  // housing fields
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  furnished?: boolean;
  currentRoommates?: number;
  maxRoommates?: number;
  availableFrom?: string;
  // search-coloc fields
  university?: string;
  studyField?: string;
  duration?: string;
  bio?: string;
}

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  approvalStatus: ApprovalStatus;
  setApprovalStatus: (status: ApprovalStatus) => void;
  logout: () => void;
  studentAnnouncements: Announcement[];
  providerAnnouncements: Announcement[];
  addAnnouncement: (a: Announcement) => void;
  updateAnnouncement: (a: Announcement) => void;
  deleteAnnouncement: (id: number) => void;
  toggleAnnouncementStatus: (id: number) => void;
}

const defaultCtx: UserContextType = {
  role: "student", setRole: () => {},
  userName: "Student", setUserName: () => {},
  approvalStatus: "pending", setApprovalStatus: () => {},
  logout: () => {},
  studentAnnouncements: [], providerAnnouncements: [],
  addAnnouncement: () => {}, updateAnnouncement: () => {},
  deleteAnnouncement: () => {}, toggleAnnouncementStatus: () => {},
};

const UserContext = createContext<UserContextType>(defaultCtx);

const SESSION_KEY = "talab_session";

function loadSession(): { role: UserRole; userName: string } | null {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const saved = loadSession();
  const [role, setRole] = useState<UserRole>(saved?.role ?? "student");
  const [userName, setUserName] = useState(saved?.userName ?? "Student");
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(saved ? "approved" : "pending");

  // Persist session whenever role or userName changes
  useEffect(() => {
    if (approvalStatus === "approved") {
      try { localStorage.setItem(SESSION_KEY, JSON.stringify({ role, userName })); } catch {}
    }
  }, [role, userName, approvalStatus]);

  const [studentAnnouncements, setStudentAnnouncements] = useState<Announcement[]>([
    { id: 10, type: "search-coloc", title: "Cherche colocation près FST", description: "Étudiant en informatique, calme et sérieux.", city: "Errachidia", price: "800 MAD/mois", housingType: "Chambre", image: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", authorName: "Youssef B.", authorImage: "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", phone: "0600123456", posted: "il y a 2h", tags: ["Wi-Fi", "Non-fumeur", "Calme"], gender: "Homme", views: 23, status: "active", university: "FST Errachidia", studyField: "Informatique", duration: "6 mois minimum", bio: "Étudiant en 3ème année informatique, passionné de code et de sport." },
  ]);

  const [providerAnnouncements, setProviderAnnouncements] = useState<Announcement[]>([
    { id: 20, type: "provider-listing", title: "Appartement F3 meublé centre", description: "Bel appartement de 3 pièces, entièrement meublé.", city: "Errachidia", price: "2000 MAD/mois", housingType: "Appartement", image: "/image1.jpeg", authorName: "ImmoPlus", authorImage: "photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80", phone: "0600567890", posted: "il y a 3j", tags: ["Meublé", "Parking", "AC"], views: 120, status: "active", address: "Centre-ville, Avenue Mohammed V", bedrooms: 3, bathrooms: 1, surface: 95, furnished: true, availableFrom: "Disponible immédiatement" },
    { id: 21, type: "provider-listing", title: "Chambre privée avec balcon", description: "Chambre individuelle dans résidence sécurisée.", city: "Errachidia", price: "1500 MAD/mois", housingType: "Chambre", image: "/image2.jpeg", authorName: "Omar H.", authorImage: "photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", phone: "0600678901", posted: "il y a 5j", tags: ["Sécurisé", "Balcon"], views: 67, status: "paused", address: "Quartier El Massira", bedrooms: 1, bathrooms: 1, surface: 30, furnished: false, availableFrom: "1er Avril 2025" },
  ]);

  const addAnnouncement = (a: Announcement) => {
    if (a.type === "search-coloc" || a.type === "offer-room") {
      setStudentAnnouncements(prev => [a, ...prev]);
    } else {
      setProviderAnnouncements(prev => [a, ...prev]);
    }
  };

  const updateAnnouncement = (updated: Announcement) => {
    if (updated.type === "search-coloc" || updated.type === "offer-room") {
      setStudentAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
    } else {
      setProviderAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
    }
  };

  const deleteAnnouncement = (id: number) => {
    setStudentAnnouncements(prev => prev.filter(a => a.id !== id));
    setProviderAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const toggleAnnouncementStatus = (id: number) => {
    const toggle = (prev: Announcement[]) =>
      prev.map(a => a.id === id ? { ...a, status: a.status === "active" ? "paused" as const : "active" as const } : a);
    setStudentAnnouncements(toggle);
    setProviderAnnouncements(toggle);
  };

  const logout = () => {
    setRole("student");
    setUserName("Student");
    setApprovalStatus("pending");
    try { localStorage.removeItem(SESSION_KEY); } catch {}
  };

  return (
    <UserContext.Provider value={{
      role, setRole,
      userName, setUserName,
      approvalStatus, setApprovalStatus,
      logout,
      studentAnnouncements, providerAnnouncements,
      addAnnouncement, updateAnnouncement,
      deleteAnnouncement, toggleAnnouncementStatus,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
