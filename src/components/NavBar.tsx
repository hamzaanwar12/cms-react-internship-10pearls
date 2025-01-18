// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import logo from "/icons/logo.svg"; // Update path for Vite

const NavBar: React.FC = () => {
  return (
    <nav className="flex-between bg-dark-1 px-6 py-6 w-full">
      {/* Logo and Title */}
      <Link to="/" className="flex items-center">
        <img
          src={logo} // Use the imported logo from Vite's static assets
          alt="Recky Room"
          height={50}
          width={50}
          style={{ height: "50px", width: "50px" }} // Inline styles for dimensions
        />
        <h2 className="max-sm:hidden ml-3 text-2xl text-white font-bold">
          Recky Room
        </h2>
      </Link>

      {/* Navigation Actions */}
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
