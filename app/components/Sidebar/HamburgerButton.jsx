import React from "react";
import { MdMenu, MdClose } from "react-icons/md";

const HamburgerButton = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-5 left-10 z-50 text-white text-3xl bg-[#1D1D41] rounded-lg"
        >
            {isSidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
    );
};

export default HamburgerButton;
