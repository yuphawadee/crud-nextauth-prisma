import Link from "next/link";
import React from "react";

const MenuItem = ({ item, isActive }) => {
    return (
        <Link href={item.href} className="flex">
            <li
                className={`${
                    isActive
                        ? "text-white font-medium bg-[#6359E9]"
                        : "hover:text-[#6359E9] text-[#FFFFFF]"
                } w-full rounded-lg flex items-center gap-5 p-3 cursor-pointer text-base mx-8 lg:mx-5 my-1`}
            >
                <span className="text-2xl">{React.createElement(item.icon)}</span>
                <span lang="en">{item.title}</span>
            </li>
        </Link>
    );
};

export default MenuItem;
