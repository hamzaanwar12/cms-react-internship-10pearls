import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import sideBarItems from "@/constants";
import logo from "@/assets/icons/logo.png"; // Update path for Vite

import hamburger from "@/assets/icons/hamburger.svg";

const MobileNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname; // Current route

  return (
    <section className="md:hidden max-w-[270px]">
      <Sheet>
        {/* Trigger Button */}
        <SheetTrigger asChild>
          <img
            src={hamburger} // Static asset for Vite
            height={50}
            width={50}
            alt="Menu"
            style={{ cursor: "pointer" }}
          />
        </SheetTrigger>

        {/* Drawer/Sidebar Content */}
        <SheetContent
          side="left"
          className="bg-dark-1 px-1 flex flex-1 flex-col w-fit py-6 gap-5 min-h-screen"
        >
          {/* Header with Logo */}
          <SheetTitle>
            <Link to="/" className="flex items-center gap-1">
              <img
                src={logo} // Static asset for Vite
                height={25}
                width={25}
                alt="Recky Room"
              />
              <h2 className="text-[26px] text-white font-bold">TouchBase</h2>
            </Link>
          </SheetTitle>

          {/* Sidebar Links */}
          <div className="flex h-[calc(100vh-90px)] flex-col justify-between overflow-y-auto">
            <section className="pt-14 flex flex-col h-full gap-5">
              {sideBarItems.map((item) => {
                const isActive = pathname === item.route; // Check active route

                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      to={item.route}
                      className={`flex gap-4 items-center p-4 rounded-lg w-full max-w-60 hover:bg-blue-link ${
                        isActive ? "bg-blue-link" : "bg-black-1"
                      }`}
                    >
                      {/* Render icon dynamically */}
                      {React.createElement(item.icon, {
                        className: "text-white",
                        size: 25, // Adjust icon size
                      })}
                      <p className="font-semibold text-white">{item.title}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
