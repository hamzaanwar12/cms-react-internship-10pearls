import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setLogin, setUser, UserState } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CompleteSignupPage: React.FC = () => {
  const { user, isSignedIn } = useUser(); // Get user data from Clerk
  const navigate = useNavigate(); // Corrected typo
  const dispatch = useDispatch(); // Redux dispatch
  const prevuser: UserState = useSelector(
    (state: RootState) => state.userState
  ); // Get user data from Redux


  console.log("User:", user); // Log user data to the console
  console.log("User State:", prevuser); // Log user state to the console

  
  useEffect(() => {
    const registerUser = async () => {
      if (isSignedIn && user && prevuser.user == null) {
        const newUser = {
          id: user.id, // Clerk's user ID
          username: user.username || `${user.firstName} ${user.lastName}`, // Full name
          email: user.primaryEmailAddress?.emailAddress || "", // Email
        };

        console.log("New User:", newUser); // Log new user data to the console

        try {
          // Send user data to the backend
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/users/create`, // Backend endpoint
            newUser,
            { headers: { "Content-Type": "application/json" } }
          );

          // Assuming the response returns the user data
          const result = response.data;
          console.log("User created in backend:", result.data); // Log backend response to the console

          // Update Redux state with new user data
          dispatch(setUser(result.data)); // Store user data in Redux
          dispatch(setLogin(true)); // Set login status to true

          // Navigate to home page after successful user creation
          navigate("/");
        } catch (error: any) {
          console.error("Error creating user in backend:", error.message);
        }
      }
    };
    if (isSignedIn && user && prevuser.user == null) {
      registerUser(); // Call the registerUser function to create user
    }
  }, []);

  return (
    <main className="pt-[2rem] flex h-screen w-full items-center justify-center">
      <h1>Setting up your account...</h1>
    </main>
  );
};

export default CompleteSignupPage;
