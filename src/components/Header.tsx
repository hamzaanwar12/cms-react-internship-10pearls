// src/components/NavBar.tsx
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // Importing Shadcn Button component
import logo from "@/assets/icons/logo.png"; // Update path for Vite

const Header = () => {
  return (
    <nav className="flex p-[10px] bg-dark-1 w-full border-b border-gray-600 justify-between items-center">
      {/* Logo and Home Link */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="TouchBase"
          height={25}
          width={25}
          title="TouchBase"
        />
        <h2 className="text-white">TouchBase</h2>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <SignedIn>
          {/* User Button */}
          <UserButton />
        </SignedIn>


        <Link to="/sign-in">
          <Button
            variant="outline"
            className=" bg-transparent  hover:bg-white hover:text-black"
          >
            Sign In
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Header;
