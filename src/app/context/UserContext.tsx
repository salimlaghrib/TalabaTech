import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "student" | "provider";
export type ApprovalStatus = "pending" | "approved" | "rejected";

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  approvalStatus: ApprovalStatus;
  setApprovalStatus: (status: ApprovalStatus) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  role: "student",
  setRole: () => {},
  userName: "Student",
  setUserName: () => {},
  approvalStatus: "pending",
  setApprovalStatus: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("student");
  const [userName, setUserName] = useState("Student");
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>("pending");

  const logout = () => {
    setRole("student");
    setUserName("Student");
    setApprovalStatus("pending");
  };

  return (
    <UserContext.Provider
      value={{
        role, setRole,
        userName, setUserName,
        approvalStatus, setApprovalStatus,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
