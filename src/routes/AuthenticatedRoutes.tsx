// src/routes/AuthenticatedRoutes.tsx
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import PageNotFound from "@/pages/PageNotFound";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/store/userSlice";

const Layout = lazy(() => import("../layout/Layout")); // Example public page
// const Home = lazy(() => import("../pages/Home"));
const CompleteSignupPage = lazy(
  () => import("@/pages/auth/CompleteSignUpPage")
);

//admin Pages
const AdminDashBoard = lazy(() => import("@/pages/admin/dashborad"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminRecents = lazy(() => import("@/pages/admin/dashborad"));
const AdminProfile = lazy(() => import("@/pages/admin/dashborad"));

//user Pages
const UserDashBoard = lazy(() => import("@/pages/user/dashboard"));
const UserProfile = lazy(() => import("@/pages/user/dashboard"));
const UserRecents = lazy(() => import("@/pages/user/dashboard"));

//common pages
// --> contact Page
const UserContacts = lazy(() => import("@/pages/common/Contacts"));
const AdminContacts = lazy(() => import("@/pages/common/Contacts"));
// --> Activtiy Page
const UserActivity = lazy(() => import("@/pages/common/ActivityLogs"));
const AdminActivity = lazy(() => import("@/pages/common/ActivityLogs"));

const AuthenticatedRoutes = () => {
  const userCurrentState: UserState = useSelector(
    (state: RootState) => state.userState
  ); // Get user data from Redux
  console.log("userCurrentState : ", userCurrentState.user);
  console.log("userCurrentRole : ", userCurrentState.user?.role);

  return (
    <SignedIn>
      <Routes>
        {/* Admin Routes */}
        {userCurrentState.user?.role === "ADMIN" && (
          <Route path="/" element={<Layout />}>
            <Route index element={<AdminDashBoard />} />
            {/* <Route index element={<AdminDashBoard />} /> */}
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="activity" element={<AdminActivity />} />
            <Route path="recents" element={<AdminRecents />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="complete-signup" element={<CompleteSignupPage />} />
            {/* <Route path="logging-in" element={<LoggingIn />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        )}

        {/* User Routes */}
        {userCurrentState.user?.role === "USER" && (
          <Route path="/" element={<Layout />}>
            <Route index element={<UserDashBoard />} />
            <Route path="dashboard" element={<UserDashBoard />} />
            <Route path="contacts" element={<UserContacts />} />
            <Route path="activity" element={<UserActivity />} />
            <Route path="recents" element={<UserRecents />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="complete-signup" element={<CompleteSignupPage />} />
            {/* <Route path="logging-in" element={<LoggingIn />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        )}

        {/* Catch-all for unauthorized roles */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </SignedIn>
  );
};

export default AuthenticatedRoutes;
