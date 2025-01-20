import { Outlet } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
// import SideBar from "../components/SideBar";
// import { SignedIn } from '@clerk/clerk-react';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="relative flex flex-1">
        {/* <SideBar /> */}
        {/* <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}> */}
        <main className="flex  w-full p-1 ">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
