// import React from "react";
// import Sidebar from "../components/Sidebar";

// export default function Layout({ children }) {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="hidden lg:block flex-initial w-64">
//         <Sidebar />
//       </div>

//       {/* Sidebar สำหรับหน้าจอเล็ก */}
//       <div className="block lg:hidden absolute inset-0">
//         <Sidebar />
//       </div>
 
//       {/* Main Content */}
//       <div className="flex-1 pt-8 lg:pt-0">
//         {children}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import HamburgerButton from "../components/Sidebar/HamburgerButton";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed lg:relative w-64 lg:translate-x-0 z-40 flex-initial h-full bg-[#1D1D41] transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:block`}
            >
                <Sidebar isSidebarOpen={isSidebarOpen} />
            </div>

            {/* Hamburger Button */}
            <div className="lg:hidden fixed z-50">
                <HamburgerButton
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* <Navbar /> */}
                <div className="lg:p-0 pt-5">
                {children}
                </div>
                </div>
        </div>
    );
};

export default DashboardLayout;
