import { Outlet } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { SignedIn } from "@clerk/clerk-react";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-white text-black  flex flex-1">
        <SignedIn>
          <SideBar />
        </SignedIn>
        {/* <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}> */}
        <main className="p-4 flex-1 ">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
