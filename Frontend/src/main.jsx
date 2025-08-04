// import { StrictMode } from 'react'
// import ReactDom from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import './index.css'
// import App from './App.jsx'
// import LoginPage from './JSX/Pages/LoginPage';
// import SignUpPage from './JSX/Pages/SignUpPage';
// import LandingPage from './JSX/Pages/LandingPage';
// import AuthContextProvider from './JSX/Context/AuthContextProvider';
// import { ThemeProvider } from './JSX/Context/ThemeContext';
// import ProtectedRoute from './JSX/Components/Protection/ProtectedRoute';
// import EmailVerification from './JSX/Components/EmailVerification';
// import StudentDashboard from './JSX/Components/StudentDashboard';
// import StudentProfile from './JSX/Components/StudentProfile';
// import Mentoring from './JSX/Components/Mentoring';
// import AiAssist from './JSX/Components/AiAssist';
// import Resources from './JSX/Components/Resources';
// import CommunityPage from './JSX/Pages/CommunityPage';
// import CertificationsPage from './JSX/Pages/CertificationsPage';
// import TermsOfServicePage from './JSX/Pages/TermsOfServicePage';
// import PrivacyPolicyPage from './JSX/Pages/PrivacyPolicyPage';
// import HelpCentrePage from './JSX/Pages/HelpCentrePage';
// import ContactUsPage from './JSX/Pages/ContactUsPage';

// // toast
// import { Toaster } from 'react-hot-toast';
// import ResetPassword from './JSX/Components/ResetPassword';
// import NotFoundPage from './JSX/Components/NotFoundPage';
// import QuizzesPage from './JSX/Pages/QuizzesPage';
// import LeaderboardPage from './JSX/Pages/LeaderboardPage';


// import EmailLayout from './JSX//Components/EmailLayout';
// import Inbox from './JSX/Components/InboxList';
// import Sent from './JSX/Components/SentList';
// import Compose from './JSX/Components/ComposeMail';

// const router = createBrowserRouter([
//   {
//     path: "/app",
//     element: (
//       <ProtectedRoute>
//         <App />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <StudentDashboard />,
//       },
//       {
//         path: "profile",
//         element: <StudentProfile />,
//       },
//       {
//         path: "mentoring",
//         element: <Mentoring />,
//       },
//       {
//         path: "ai-assist",
//         element: <AiAssist />,
//       },
//       {
//         path: "resources",
//         element: <Resources />,
//       },
//       {
//         path: "quizzes",
//         element: <QuizzesPage />,
//       },
//       {
//         path: "leaderboard",
//         element: <LeaderboardPage />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <LandingPage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignUpPage />,
//   },
//   {
//     path: "/verify-email",
//     element: <EmailVerification />,
//   },
//   {
//     path: "/community",
//     element: <CommunityPage />,
//   },
//   {
//     path: "/certifications",
//     element: <CertificationsPage />,
//   },
//   {
//     path: "/terms-of-service",
//     element: <TermsOfServicePage />,
//   },
//   {
//     path: "/privacy-policy",
//     element: <PrivacyPolicyPage />,
//   },
//   {
//     path: "/help-centre",
//     element: <HelpCentrePage />,
//   },
//   {
//     path: "/contact-us",
//     element: <ContactUsPage />,
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPassword />,
//   },
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   },
//     {
//       path: "email",
//       element: <EmailLayout />,
//       children: [
//         { path: "inbox", element: <Inbox /> },
//         { path: "sent", element: <Sent /> },
//         { path: "compose", element: <Compose /> },
//       ],
//     },
// ]);
// ReactDom.createRoot(document.getElementById("root")).render(
//   <AuthContextProvider>
//     <ThemeProvider>
//       <RouterProvider router={router} />
//       <Toaster />
//     </ThemeProvider>
//   </AuthContextProvider>
// );
import { StrictMode } from 'react';
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import App from './App.jsx';
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
import ResetPassword from './JSX/Components/ResetPassword';
import NotFoundPage from './JSX/Components/NotFoundPage';
import QuizzesPage from './JSX/Pages/QuizzesPage';
import LeaderboardPage from './JSX/Pages/LeaderboardPage';
import { Toaster } from 'react-hot-toast';

// Email components
import EmailLayout from './JSX/Components/EmailLayout';
import Inbox from './JSX/Components/Inbox';
import Sent from './JSX/Components/Sent';
import ComposeEmail from "./JSX/Components/ComposeMail";

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
      {
        path: "quizzes",
        element: <QuizzesPage />,
      },
      {
        path: "leaderboard",
        element: <LeaderboardPage />,
      },

{
  path: "/app/email",
  element: <EmailLayout />, // provides left/right layout and context
  children: [
    {
      path: "inbox",
      element: <Inbox /> // handles selection + rendering
    },
    {
      path: "sent",
      element: <Sent /> // same structure as Inbox.jsx
    },
    {
      path: "compose",
      element: <ComposeEmail />
    }
  ]
}

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
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>
);
