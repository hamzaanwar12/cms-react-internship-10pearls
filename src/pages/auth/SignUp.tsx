import { SignUp } from "@clerk/clerk-react";
export default function SignUpPage() {
  return (
    <main className="pt-[2rem] flex h-screen w-full items-center justify-center">
      <SignUp signInUrl={"/sign-in"} />
    </main>
  );
}
