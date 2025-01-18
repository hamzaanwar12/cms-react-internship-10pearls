// Icon imports
import { FaHome } from "react-icons/fa"; // Home icon
import { RiDashboardFill } from "react-icons/ri"; // Dashboard icon
import { IoIosContacts } from "react-icons/io"; // Contacts icon
import { TbLogs } from "react-icons/tb"; // Logs icon
import { FaArrowRightToBracket } from "react-icons/fa6"; // Recents icon
import { GiProgression } from "react-icons/gi"; // Progress icon

// Sidebar items definition
const sideBarItems = [
  {
    title: "Home",
    route: "/",
    icon: FaHome, // Pass the icon as a component, not JSX
  },
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: RiDashboardFill,
  },
  {
    title: "Contacts",
    route: "/contacts",
    icon: IoIosContacts,
  },
  {
    title: "Logs",
    route: "/logs",
    icon: TbLogs,
  },
  {
    title: "Recents",
    route: "/recents",
    icon: FaArrowRightToBracket,
  },
  {
    title: "Progress",
    route: "/progress",
    icon: GiProgression,
  },
];

export default sideBarItems;
