import React from "react";
import { Link } from "react-router-dom"; // Using react-router-dom for routing in Vite
import { IconType } from "react-icons"; // For using icons from react-icons

interface SideBarItemProps {
  title: string;
  route: string;
  isActive: boolean;
  Icon: IconType; // Icon component from react-icons
}

const SideBarItem: React.FC<SideBarItemProps> = ({ title, route, isActive, Icon }) => {
  return (
    <Link
      to={route} // `to` for react-router-dom
      className={`hover:bg-gray-700 px-5 py-4 flex text-white items-center justify-start rounded-lg transition-colors ${
        isActive ? "bg-gray-700 " : "bg-dark-1"
      }`}
      aria-label={title} // Accessibility improvement
    >
      <Icon className="text-white" size={26} /> {/* Render the Icon */}
      <h1 className="hidden text-2xl ml-3">{title}</h1>
    </Link>
  );
};

export default SideBarItem;
