// src/routes/UnauthenticatedRoutes.jsx
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SignedOut } from "@clerk/clerk-react";
import PageNotFound from "@/pages/PageNotFound";


const PublicHome = lazy(() => import("../pages/PublicHome")); // Example public page
const SignIn = lazy(() => import("../pages/auth/SignIn")); // Example public page
const SignUp = lazy(() => import("../pages/auth/SignUp")); // Example public page
const Layout = lazy(() => import("../layout/Layout")); // Example public page
const CompleteSignupPage = lazy(() => import("../pages/auth/CompleteSignUpPage")); // Example public page

const UnauthenticatedRoutes = () => {
  return (
    <SignedOut>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PublicHome />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="complete-signup" element={<CompleteSignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </SignedOut>
  );
};

export default UnauthenticatedRoutes;
