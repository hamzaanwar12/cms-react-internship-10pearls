// src/routes/AuthenticatedRoutes.tsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashBoardLayout from '../layout/AdminDashBaordLayout'; // Ensure this path is correct
import { SignedIn } from '@clerk/clerk-react';
import PageNotFound from '@/pages/PageNotFound';

const Home = lazy(() => import('../pages/Home'));
// const About = lazy(() => import('../pages/About'));
const CompleteSignupPage = lazy(() => import('@/pages/auth/CompleteSignUpPage'));
const AuthenticatedRoutes = () => {
  return (
    <SignedIn>
      <Routes>
        <Route path="/" element={<AdminDashBoardLayout />}>
          <Route index element={<Home />} />
          <Route path="complete-signup" element={<CompleteSignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </SignedIn>
  );
};

export default AuthenticatedRoutes;
