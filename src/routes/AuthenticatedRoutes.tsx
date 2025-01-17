// src/routes/AuthenticatedRoutes.tsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashBoardLayout from '../layout/AdminDashBaordLayout'; // Ensure this path is correct
import { SignedIn } from '@clerk/clerk-react';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

const AuthenticatedRoutes = () => {
  return (
    <SignedIn>
      <Routes>
        <Route path="/" element={<AdminDashBoardLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </SignedIn>
  );
};

export default AuthenticatedRoutes;
