import { createBrowserRouter, Navigate } from "react-router";
import { Splash } from "./components/screens/Splash";
import { Onboarding } from "./components/screens/Onboarding";
import { Login } from "./components/screens/Login";
import { Register } from "./components/screens/Register";
import { MobileLayout } from "./components/layout/MobileLayout";
import { HomeDashboard } from "./components/screens/HomeDashboard";
import { HousingList } from "./components/screens/HousingList";
import { HousingDetail } from "./components/screens/HousingDetail";
import { Restaurants } from "./components/screens/Restaurants";
import { Laundry } from "./components/screens/Laundry";
import { Marketplace } from "./components/screens/Marketplace";
import { ChatList } from "./components/screens/ChatList";
import { ChatDetail } from "./components/screens/ChatDetail";
import { Profile } from "./components/screens/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/app",
    Component: MobileLayout,
    children: [
      { index: true, element: <Navigate to="/app/home" replace /> },
      { path: "home", Component: HomeDashboard },
      { path: "housing", Component: HousingList },
      { path: "housing/:id", Component: HousingDetail },
      { path: "restaurants", Component: Restaurants },
      { path: "laundry", Component: Laundry },
      { path: "marketplace", Component: Marketplace },
      { path: "chat", Component: ChatList },
      { path: "chat/:id", Component: ChatDetail },
      { path: "profile", Component: Profile },
    ],
  },
]);
