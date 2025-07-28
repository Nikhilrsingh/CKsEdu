import { StrictMode } from 'react'
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import LoginPage from './JSX/Pages/LoginPage';
import SignUpPage from './JSX/Pages/SignUpPage';
import LandingPage from './JSX/Pages/LandingPage';
import AuthContextProvider from './JSX/Context/AuthContextProvider';
import { ThemeProvider } from './JSX/Context/ThemeContext';
import ProtectedRoute from './JSX/Components/Protection/ProtectedRoute';
import EmailVerification from './JSX/Components/EmailVerification';
import StudentDashboard from './JSX/Components/StudentDashboard';
import StudentProfile from './JSX/Components/StudentProfile';
import Mentoring from './JSX/Components/Mentoring';
import AiAssist from './JSX/Components/AiAssist';


const router = createBrowserRouter([
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: "profile",
        element: <StudentProfile />,
      },
      {
        path: "mentoring",
        element: <Mentoring />,
      },
      {
        path: "ai-assist",
        element: <AiAssist />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/verify-email",
    element: <EmailVerification />,
  },
]);
ReactDom.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthContextProvider>
);
