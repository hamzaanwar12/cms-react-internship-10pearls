// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import logo from "@/assets/icons/logo.png"; // Update path for Vite

const Header = () => {
  return (
    <nav className="flex p-[10px] bg-dark-1  w-full  border-b-gray-600 ">
      <Link to="/" className="flex w-full items-center gap-2">
        <img
          src={logo}
          alt="TouchBase"
          height={25}
          width={25}
          title="TouchBase"
        />
        <h2>TouchBase</h2>
      </Link>

      <div className="md:hidden flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Header;
