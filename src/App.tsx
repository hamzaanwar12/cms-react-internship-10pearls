import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { useUserManagement } from "@/hooks/user-ManagementHook";
import AppRoutes from "./routes/AppRoutes";
import Loader from "@/components/Loader";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
const App = () => {
  const { fetchUser } = useUserManagement();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const { isSignedIn, user } = useUser();
  console.log("User:", currentUser);
  console.log("user SignEd : ", isSignedIn, user);
  useEffect(() => {
    fetchUser(); // Only fetch the user if needed
  }, [isSignedIn, user, currentUser]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
