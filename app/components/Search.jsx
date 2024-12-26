import { CiSearch } from "react-icons/ci";
import React from 'react';

const Search = ({ onSearch }) => {
    return (
        <div className='flex items-center gap-5 z-20'>
            <div className='flex items-center gap-2 bg-[#27264E] p-2 py-3 px-3 h-[38px] rounded-lg'>
                <input
                    type="text"
                    placeholder='Search'
                    className="bg-transparent focus:outline-none text-sm text-[#AEABD8]"
                    onChange={(e) => onSearch(e.target.value)} // ส่งค่าการค้นหาไปยัง parent
                />
                <CiSearch className="text-xl text-[#AEABD8]" />
            </div>
        </div>
    );
};

export default Search;
