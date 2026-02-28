import { createBrowserRouter } from "react-router";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Layout from "./layout";
import Home from "./pages/Home";
import Housing from "./pages/Housing";
import HousingDetail from "./pages/HousingDetail";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/ChatRoom";
import Chatbot from "./pages/Chatbot";
import AddHousing from "./pages/AddHousing";
import AddHousingRequest from "./pages/AddHousingRequest";
import AddRoommateRequest from "./pages/AddRoommateRequest";

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
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "housing", Component: Housing },
      { path: "housing/add", Component: AddHousing },
      { path: "housing/request", Component: AddHousingRequest },
      { path: "housing/roommate", Component: AddRoommateRequest },
      { path: "housing/:id", Component: HousingDetail },
      { path: "chat", Component: Chat },
      { path: "profile", Component: Profile },
      { path: "chatroom/:id", Component: ChatRoom },
      { path: "chatbot", Component: Chatbot },
    ],
  },
]);