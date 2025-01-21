// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser, UserState,setStatus } from "@/store/userSlice";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import Loader from "@/components/Loader";
import { RootState } from "./store/store";

const App = () => {
  const { user, isSignedIn } = useUser(); // Clerk's user data
  const dispatch = useDispatch();
  const currentUserState: UserState = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    console.log("User:", user);
    console.log("User State:", currentUserState);
    const fetchUser = async () => {
      if (isSignedIn && user && currentUserState.user == null) {
        try {
          // Fetch the user data from the backend using Clerk user ID
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/users/get-userById/${
              user.id
            }`,
            { headers: { "Content-Type": "application/json" } }
          );

          const backendUser = response.data.data; 
          // console.log("User fetched from backend:", backendUser);
          dispatch(setUser(backendUser));
          dispatch(setLogin(true));
          dispatch(setStatus('success'));
        } catch (error: any) {
          console.error("Error fetching user from backend:", error.message);
        }
      }
    };

    fetchUser();
  }, [isSignedIn, user, dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
