import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
  return (
    <main className="pt-[2rem] flex h-screen w-full items-center justify-center">
      <SignUp
        
        signInUrl={"/sign-in"} // Sign-in URL for users
        // signInFallbackRedirectUrl={"/dashboard"} // Fallback redirect after Sign In
        fallbackRedirectUrl={"/complete-signup"} // Redirect to this page after Sign Up
      />
    </main>
  );
};

export default SignUpPage;
