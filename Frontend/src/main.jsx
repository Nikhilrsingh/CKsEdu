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
import Resources from './JSX/Components/Resources';
import CommunityPage from './JSX/Pages/CommunityPage';
import CertificationsPage from './JSX/Pages/CertificationsPage';
import TermsOfServicePage from './JSX/Pages/TermsOfServicePage';
import PrivacyPolicyPage from './JSX/Pages/PrivacyPolicyPage';
import HelpCentrePage from './JSX/Pages/HelpCentrePage';
import ContactUsPage from './JSX/Pages/ContactUsPage';


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
      {
        path: "resources",
        element: <Resources />,
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
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/certifications",
    element: <CertificationsPage />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfServicePage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/help-centre",
    element: <HelpCentrePage />,
  },
  {
    path: "/contact-us",
    element: <ContactUsPage />,
  },
]);
ReactDom.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthContextProvider>
);
