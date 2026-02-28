import { createBrowserRouter } from "react-router";
import { createElement } from "react";
import Layout from "./layout";
import Splash from "./pages/Splash";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import AddAnnouncement from "./pages/AddAnnouncement";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Chatbot from "./pages/Chatbot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(Splash),
  },
  {
    path: "/auth",
    element: createElement(Auth),
  },
  {
    path: "/app",
    element: createElement(Layout),
    children: [
      {
        index: true,
        element: createElement(Home),
      },
      {
        path: "announcements",
        element: createElement(Announcements),
      },
      {
        path: "announcements/:id",
        element: createElement(AnnouncementDetail),
      },
      {
        path: "add",
        element: createElement(AddAnnouncement),
      },
      {
        path: "chatbot",
        element: createElement(Chatbot),
      },
      {
        path: "chat",
        element: createElement(Chat),
      },
      {
        path: "chat/:id",
        element: createElement(ChatRoom),
      },
      {
        path: "profile",
        element: createElement(Profile),
      },
    ],
  },
]);
