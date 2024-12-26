import { BiSolidDashboard } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { HiOfficeBuilding } from "react-icons/hi";

export const menu = [
    {
        title: "หน้าหลัก",
        href: "/dashboard",
        icon: BiSolidDashboard,
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
