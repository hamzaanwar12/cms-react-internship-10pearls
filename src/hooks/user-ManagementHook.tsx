// src/hooks/useUserManagement.ts
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLogin} from "@/store/userSlice";
import axios from "axios";
import { RootState } from "@/store/store";

export const useUserManagement = () => {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.userState.user);

  // Function to register a new user in the database
  const registerUser = async () => {
    if (isSignedIn && user && !currentUser) {
      const newUser = {
        id: user.id,
        username: user.username || `${user.firstName} ${user.lastName}`,
        email: user.primaryEmailAddress?.emailAddress || "",
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/create`,
          newUser,
          { headers: { "Content-Type": "application/json" } }
        );
        dispatch(setUser(response.data.data));
        dispatch(setLogin(true));
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  // Function to fetch an existing user from the database
  const fetchUser = async () => {
    if (isSignedIn && user && !currentUser) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/get-userById/${user.id}`,
          { headers: { "Content-Type": "application/json" } }
        );
        dispatch(setUser(response.data.data));
        dispatch(setLogin(true));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  return { registerUser, fetchUser };
};
