// // src/routes/AuthenticatedRoutes.tsx
// import { lazy, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { SignedIn } from "@clerk/clerk-react";
// import PageNotFound from "@/pages/PageNotFound";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { setLogin, setUser, UserState } from "@/store/userSlice";
// import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// const Layout = lazy(() => import("../layout/Layout")); // Example public page
// // const Home = lazy(() => import("../pages/Home"));
// const CompleteSignupPage = lazy(
//   () => import("@/pages/auth/CompleteSignUpPage")
// );

// //admin Pages
// const AdminDashBoard = lazy(() => import("@/pages/admin/dashborad"));
// const AdminUsers = lazy(() => import("@/pages/admin/Users"));
// const AdminRecents = lazy(() => import("@/pages/admin/dashborad"));
// const AdminProfile = lazy(() => import("@/pages/admin/dashborad"));

// //user Pages
// const UserDashBoard = lazy(() => import("@/pages/user/dashboard"));
// const UserProfile = lazy(() => import("@/pages/user/dashboard"));
// const UserRecents = lazy(() => import("@/pages/user/dashboard"));

// //common pages
// // --> contact Page
// const UserContacts = lazy(() => import("@/pages/common/Contacts"));
// const AdminContacts = lazy(() => import("@/pages/common/Contacts"));
// // --> Activtiy Page
// const UserActivity = lazy(() => import("@/pages/common/ActivityLogs"));
// const AdminActivity = lazy(() => import("@/pages/common/ActivityLogs"));

// const AuthenticatedRoutes = () => {
//   const userCurrentState: UserState = useSelector(
//     (state: RootState) => state.userState
//   ); // Get user data from Redux
//   // const { user, isSignedIn } = useUser();
//   console.log("userCurrentState : ", userCurrentState.user);
//   console.log("userCurrentRole : ", userCurrentState.user?.role);

//   const { user, isSignedIn } = useUser(); // Get user data from Clerk
//   const navigate = useNavigate(); // Corrected typo
//   const dispatch = useDispatch(); // Redux dispatch
//   const prevuser: UserState = useSelector(
//     (state: RootState) => state.userState
//   ); // Get user data from Redux

//   console.log("User:", user); // Log user data to the console
//   console.log("User State:", prevuser); // Log user state to the console

//   useEffect(() => {
//     const registerUser = async () => {
//       if (isSignedIn && user && prevuser.user == null) {
//         const newUser = {
//           id: user.id, // Clerk's user ID
//           username: user.username || `${user.firstName} ${user.lastName}`, // Full name
//           email: user.primaryEmailAddress?.emailAddress || "", // Email
//         };

//         console.log("New User:", newUser); // Log new user data to the console

//         try {
//           // Send user data to the backend
//           const response = await axios.post(
//             `${import.meta.env.VITE_API_BASE_URL}/users/create`, // Backend endpoint
//             newUser,
//             { headers: { "Content-Type": "application/json" } }
//           );

//           // Assuming the response returns the user data
//           const result = response.data;
//           console.log("User created in backend:", result.data); // Log backend response to the console

//           // Update Redux state with new user data
//           dispatch(setUser(result.data)); // Store user data in Redux
//           dispatch(setLogin(true)); // Set login status to true

//           // Navigate to home page after successful user creation
//           navigate("/");
//         } catch (error) {
//           console.error("Error creating user in backend:", error);
//         }
//       }
//     };
//     if (isSignedIn && user && prevuser.user == null) {
//       registerUser(); // Call the registerUser function to create user
//     }
//   }, []);

//   console.log("userin AuthenticatedRoutes : ", user);
//   return (
//     <SignedIn>
//       <Routes>
//         {/* Admin Routes */}
//         {userCurrentState.user?.role === "ADMIN" && (
//           <Route path="/" element={<Layout />}>
//             <Route index element={<AdminDashBoard />} />
//             {/* <Route index element={<AdminDashBoard />} /> */}
//             <Route path="dashboard" element={<AdminDashBoard />} />
//             <Route path="contacts" element={<AdminContacts />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="activity" element={<AdminActivity />} />
//             <Route path="recents" element={<AdminRecents />} />
//             <Route path="profile" element={<AdminProfile />} />
//             <Route path="complete-signup" element={<CompleteSignupPage />} />
//             {/* <Route path="logging-in" element={<LoggingIn />} /> */}
//             <Route path="*" element={<PageNotFound />} />
//           </Route>
//         )}

//         {/* User Routes */}
//         {userCurrentState.user?.role === "USER" && (
//           <Route path="/" element={<Layout />}>
//             <Route index element={<UserDashBoard />} />
//             <Route path="dashboard" element={<UserDashBoard />} />
//             <Route path="contacts" element={<UserContacts />} />
//             <Route path="activity" element={<UserActivity />} />
//             <Route path="recents" element={<UserRecents />} />
//             <Route path="profile" element={<UserProfile />} />
//             <Route path="complete-signup" element={<CompleteSignupPage />} />
//             {/* <Route path="logging-in" element={<LoggingIn />} /> */}
//             <Route path="*" element={<PageNotFound />} />
//           </Route>
//         )}

//         {/* Catch-all for unauthorized roles */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </SignedIn>
//   );
// };

// export default AuthenticatedRoutes;
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import PageNotFound from "@/pages/PageNotFound";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Layout = React.lazy(() => import("../layout/Layout"));

// Admin Pages
const AdminDashBoard = React.lazy(() => import("@/pages/admin/dashborad"));
const AdminUsers = React.lazy(() => import("@/pages/admin/Users"));

// User Pages
const UserDashBoard = React.lazy(() => import("@/pages/user/dashboard"));
const UserContacts = React.lazy(() => import("@/pages/common/Contacts"));

//commonpages
const AdminContacts = React.lazy(() => import("@/pages/common/Contacts"));
const AdminActivity = React.lazy(() => import("@/pages/common/ActivityLogs"));
const UserActivity = React.lazy(() => import("@/pages/common/ActivityLogs"));
const AddContact = React.lazy(() => import("@/pages/common/AddContact"));
// const AdminRecents = React.lazy(() => import("@/pages/common/Recents"));

const AuthenticatedRoutes = () => {
  const userCurrentState = useSelector((state: RootState) => state.userState);

  
  return (
    <SignedIn>
      <Routes>
        {userCurrentState.user?.role === "ADMIN" && (
          <Route path="/" element={<Layout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="activity" element={<AdminActivity />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="add-contact" element={<AddContact />} />
            {/* <Route path="recent" element={<AdminRecents />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        )}
        {userCurrentState.user?.role === "USER" && (
          <Route path="/" element={<Layout />}>
            <Route index element={<UserDashBoard />} />
            <Route path="contacts" element={<UserContacts />} />
            <Route path="activity" element={<UserActivity />} />
            <Route path="add-contact" element={<AddContact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </SignedIn>
  );
};

export default AuthenticatedRoutes;
