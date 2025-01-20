import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // For routing in react-router-dom
import sideBarItems from "@/constants"; // Import sidebar items
import SideBarItem from "./SideBarItem"; // Import SideBarItem component
import { AnimatedTooltip } from "@/components/ui/AnimatedToolTip"; // Import AnimatedTooltip component
import { Link } from "react-router-dom";
const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isCompact, setIsCompact] = useState(false);

  const handleResize = () => {
    setIsCompact(window.innerWidth <= 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="sticky  top-0 left-0  bg-dark-1 px-1 flex flex-col w-fit py-6 gap-3 sm:max-w-[85px] lg:max-w-[264px] max-h-screen max-sm:hidden">
      {sideBarItems.map((item, index) => (
        <Link to={item.route} key={item.route} className="relative group">
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
                className={`${
                  pathname === item.route ? "bg-gray-700" : ""
                }hover:bg-gray-700 p-4 rounded-lg transition-colors`}
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
      ))}
    </aside>
  );
};

export default Sidebar;
