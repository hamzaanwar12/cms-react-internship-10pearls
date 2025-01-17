// src/routes/UnauthenticatedRoutes.jsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';

const PublicHome = lazy(() => import('../pages/PublicHome')); // Example public page
const SignIn = lazy(() => import('../pages/auth/SignIn')); // Example public page
const SignUp = lazy(() => import('../pages/auth/SignUp')); // Example public page

const UnauthenticatedRoutes = () => {
  return (
    <SignedOut>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </SignedOut>
  );
};

export default UnauthenticatedRoutes;
