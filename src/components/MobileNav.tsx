import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sideBarAdminItems, sideBarUserItems } from "@/constants"; // Import sidebar items
import logo from "@/assets/icons/logo.png"; // Update path for Vite

import hamburger from "@/assets/icons/hamburger.svg";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/store/userSlice";

const MobileNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname; // Current route
  const userCurrState: UserState = useSelector(
    (state: RootState) => state.userState
  );
  const sideBarItems =
    userCurrState.user?.role == "ADMIN" ? sideBarAdminItems : sideBarUserItems;

  return (
    <section className="md:hidden">
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
          className="bg-dark-1 min-w-[250px] px-1 flex flex-1 flex-col w-fit py-6 gap-5 min-h-screen"
        >
          {/* Header with Logo */}
          <SheetTitle>
            <Link to="/" className="flex items-center gap-1">
              <img
                src={logo} // Static asset for Vite
                height={35}
                width={35}
                alt="Recky Room"
              />
              <h2 className="text-[26px] text-white font-bold">TouchBase</h2>
            </Link>
          </SheetTitle>

          {/* Sidebar Links */}
          <div className="flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
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
                        size: 30, // Adjust icon size
                      })}
                      <p className="text-2xl font-semibold  text-white">
                        {item.title}
                      </p>
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
