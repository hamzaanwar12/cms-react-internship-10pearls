import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // For routing in react-router-dom
import { sideBarAdminItems, sideBarUserItems } from "@/constants"; // Import sidebar items
import SideBarItem from "./SideBarItem"; // Import SideBarItem component
import { AnimatedTooltip } from "@/components/ui/AnimatedToolTip"; // Import AnimatedTooltip component
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserState } from "@/store/userSlice";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isCompact, setIsCompact] = useState(false);
  const userCurrState: UserState = useSelector(
    (state: RootState) => state.userState
  );
  const sideBarItems =
    userCurrState.user?.role == "ADMIN" ? sideBarAdminItems : sideBarUserItems;

  const handleResize = () => {
    setIsCompact(window.innerWidth <= 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <aside className=" h-[calc(100vh - 26px)] hidden sm:flex sm:flex-col md:block  sticky  top-0 left-0  bg-dark-1 px-1 lg:px-2  w-fit py-6 gap-3 sm:items-center sm:min-w-[65px] lg:items-start sm:max-w-[90px] lg:max-w-[250px] max-h-screen max-sm:hidden">
    <aside className="h-screen hidden sm:flex sm:flex-col sticky top-[0px] left-0 bg-dark-1 px-1 lg:px-2 py-6 gap-3 sm:items-center lg:items-start sm:w-[65px] lg:w-[250px] max-h-screen max-sm:hidden">
      <div className="flex flex-col  gap-5">
        {sideBarItems.map((item, index) => {
          console.log(
            pathname == item.route
              ? `true for ${item.title}`
              : `false for${item.title}`
          );

          return (
            <Link to={item.route} key={item.route} className="">
              {isCompact ? (
                <AnimatedTooltip
                  items={[
                    {
                      id: index,
                      name: item.title,
                      route: item.route,
                      isActive: pathname === item.route,
                    },
                  ]}
                >
                  <button
                    className={
                      `hover:bg-gray-700 p-4 rounded-lg transition-colors` +
                        pathname ===
                      item.route
                        ? "bg-gray-700"
                        : "bg-transparent"
                    }
                  >
                    <item.icon className="text-white" size={32} />
                  </button>
                </AnimatedTooltip>
              ) : (
                <SideBarItem
                  title={item.title}
                  route={item.route}
                  Icon={item.icon}
                  isActive={pathname === item.route}
                />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
