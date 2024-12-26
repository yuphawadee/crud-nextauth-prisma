"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation"; // ใช้ usePathname แทน window.location.pathname
import { menu } from "./Menu";
import MenuItem from "./MenuItem";
import { signOut, useSession } from "next-auth/react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = ({ isSidebarOpen }) => {
    const { data: session, status } = useSession();
    const pathname = usePathname(); // ดึง path ปัจจุบัน
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); 
    const buttonRef = useRef(null); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false); // ปิด dropdown
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderMenu = useMemo(() => {
        return menu.map((item) => {
            const isEditPage =
                item.pathEdit && new RegExp(`${item.pathEdit}/\\d+$`).test(pathname);
            const isActive =
                pathname === item.href || pathname === item.pathAdd || isEditPage;

            return <MenuItem key={item.title} item={item} isActive={isActive} />;
        });
    }, [pathname]); // เพิ่ม dependency pathname เพื่อให้ useMemo ทำงานใหม่เมื่อ pathname เปลี่ยน

    return (
        <div
            className={`fixed left-0 z-40 w-64 h-screen bg-[#1D1D41] py-5 transition-transform 
            transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:block`} // lg:block แสดงตลอดในขนาดใหญ่
        >
            <div className="flex flex-col justify-between h-full pt-5">
                <ul>{renderMenu}</ul>
                <div className="p-5 flex items-center justify-center">
                    <div className="relative h-16">
                        <div
                        ref={buttonRef}
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() =>
                                setIsDropdownOpen((prev) => !prev)
                            }
                        >
                            {/* <img
                                src={session.user.image}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full border"
                            /> */}
                            <div className="flex flex-col">
                                <span className="text-lg font-bold">
                                    {session.user.name}
                                </span>
                            </div>
                            <MdKeyboardArrowDown className="text-white" />
                        </div>
                        {isDropdownOpen && (
                            <div 
                            ref={dropdownRef}
                            className="absolute bg-red-500 rounded-lg shadow-lg cursor-pointer w-[210px] left-1/2 top-1/2 transform -translate-x-1/2 mt-2"
                            >
                                <ul className="hover:bg-red-400 text-white rounded text-base px-10 py-3">
                                    <li
                                        onClick={() =>
                                            signOut({ callbackUrl: "/" })
                                        }
                                        className="text-center"
                                    >
                                        Sign Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
