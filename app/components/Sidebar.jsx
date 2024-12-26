"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
    BiSolidDashboard,
    BiSolidReport,
    BiSolidPieChartAlt2
} from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";

const menu = [
    {
        title: "หน้าหลัก",
        href: "/dashboard",
        icon: BiSolidDashboard
    },
    {
        title: "ข้อมูลนักศึกษา",
        href: "/dashboard/student",
        icon: FaUserGroup,
        pathAdd: "/dashboard/student/add",
        pathEdit: "/dashboard/student/edit",
    },
    {
        title: "ข้อมูลการฝึกงาน",
        href: "/dashboard/internship",
        icon: HiOfficeBuilding,
        pathAdd: "/dashboard/internship/add",
        pathEdit: "/dashboard/internship/edit",
    },
    {
        title: "ข้อมูลบริษัท",
        href: "/dashboard/organization",
        icon: HiOfficeBuilding,
        pathAdd: "/dashboard/organization/add",
        pathEdit: "/dashboard/organization/edit",
    },
];

const Sidebar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (status === "unauthenticated") {
        router.replace("/");
        return null; // ถ้าไม่ได้รับ session ให้ return ออกไปเลย
    }

    const renderMenu = useMemo(() => {
        return menu.map((item) => {
            const isEditPage =
                item.pathEdit && new RegExp(`${item.pathEdit}/\\d+$`).test(pathname);
            const isActive =
                pathname === item.href || pathname === item.pathAdd || isEditPage;

            return (
                <Link key={item.title} href={item.href} className="flex">
                    <li
                        className={`${isActive
                                ? "text-white font-medium bg-[#6359E9]"
                                : "hover:text-[#6359E9] text-[#FFFFFF]"
                            } w-full rounded-lg flex items-center gap-5 p-3 cursor-pointer text-base mx-8 lg:mx-5 my-1`}
                    >
                        <span className="text-2xl">
                            {React.createElement(item.icon)}
                        </span>
                        <span lang="en">{item.title}</span>
                    </li>
                </Link>
            );
        });
    }, [pathname]);

    return (
        status === "authenticated" &&
        session.user && (
            <>
                {/* Hamburger Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed top-5 left-10 z-50 text-white text-3xl bg-[#1D1D41] rounded-lg"
                >
                    {isSidebarOpen ? <MdClose /> : <MdMenu />}
                </button>

                {/* Sidebar */}
                <div
                    className={`fixed left-0 z-40 w-64 h-screen bg-[#1D1D41] py-5 transition-transform 
                    transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 lg:block`}
                >
                    <div className="flex flex-col justify-between h-full pt-5">
                        <ul>{renderMenu}</ul>
                        <div className="p-5 flex items-center justify-center">
                            <div className="relative">
                                <div
                                    className="flex items-center gap-5 cursor-pointer"
                                    onClick={() =>
                                        setIsDropdownOpen((prev) => !prev)
                                    }
                                >
                                    <img
                                        src={session.user.image}
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full border"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold">
                                            {session.user.name}
                                        </span>
                                    </div>
                                    <MdKeyboardArrowDown className="text-white" />
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 -mt-5 bg-red-500 rounded-lg shadow-lg cursor-pointer">
                                        <ul className="py-2 px-4">
                                            <li
                                                onClick={() =>
                                                    signOut({ callbackUrl: "/" })
                                                }
                                                className="hover:bg-red-400 text-white px-4 py-2 rounded"
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
            </>
        )
    );
};

export default Sidebar;
