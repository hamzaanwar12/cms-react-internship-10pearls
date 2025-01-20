import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompleteSignupPage: React.FC = () => {
  const { user, isSignedIn } = useUser(); // Get user data from Clerk
  const naviagte = useNavigate(); 
  const dispatch = useDispatch(); // Redux dispatch

  console.log("User:", user); // Log user data to the console   
  console.log("Is Signed In:", isSignedIn); // Log whether the user is signed in
  useEffect(() => {
    const registerUser = async () => {
      if (isSignedIn && user) {
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

          console.log("User created in backend:", response.data); // Log backend response to the console
          console.log("User created in backend:", response.data); // Log backend response to the console
          // dispatch(setUser(response.data)); // Update Redux state with new user data


          // Update Redux store
          dispatch(setLogin(true));
          dispatch(setUser(response.data)); // Store backend response in Redux
          naviagte("/"); 

        } catch (error: any) {
          console.error("Error creating user in backend:", error.message);
        }
      }
    };

    registerUser();
  }, [isSignedIn, user, dispatch]);

  return (
    <main className="pt-[2rem] flex h-screen w-full items-center justify-center">
      <h1>Setting up your account...</h1>
    </main>
  );
};

export default CompleteSignupPage;
