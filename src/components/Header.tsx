// src/components/NavBar.tsx
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // Importing Shadcn Button component
import logo from "@/assets/icons/logo.png"; // Update path for Vite

const Header = () => {
  return (
    <nav className="h-[50px] flex p-[10px] bg-dark-1 w-full border-b border-gray-600 justify-between items-center">
      {/* Logo and Home Link */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="TouchBase"
          height={35}
          width={35}
          title="TouchBase"
        />
        <h2 className="text-white text-2xl font-bold ">TouchBase</h2>
      </Link>

      {/* Desktop Navigation */}

      <div className="flex gap-5  items-center">
        <SignedOut>
          <Link to="/sign-in">
            <Button
              variant="outline"
              className=" bg-transparent  hover:bg-white hover:text-black"
            >
              Sign In
            </Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <MobileNav />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
