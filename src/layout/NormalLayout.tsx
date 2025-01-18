import { Outlet } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, display: "flex" }}>
        <SideBar />
        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
