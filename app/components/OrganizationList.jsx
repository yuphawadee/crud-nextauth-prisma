'use client';

import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Search from './Search';

const OrganizationList = ({ organizations }) => {
    const router = useRouter();
    const pathname = usePathname()
    const [alertMessage, setAlertMessage] = useState('');

    const deleteOrganization = async (id) => {
        try {
            await axios.delete(`/api/organization/${id}`);
            // setAlertMessage('Delete Successful!');
            // setTimeout(() => {
            //     setAlertMessage(''); // ลบข้อความ alert หลังจาก 3 วินาที
            // }, 3000);
            router.refresh();  // รีเฟรชข้อมูลหลังจากลบสำเร็จ
        } catch (error) {
            // setAlertMessage('Error: Failed to delete student');
            // setTimeout(() => {
            //     setAlertMessage(''); // ลบข้อความ alert หลังจาก 3 วินาที
            // }, 3000);
            console.log('error', error);
        }
    };

    return (
        <div className='p-5 rounded-[20px] bg-[#1D1D41]'>
            {/* {alertMessage && (
                <div className="mt-2 mx-2 bg-teal-500 text-sm text-white rounded-lg p-4 z-20" role="alert">
                    <span className="font-bold">{alertMessage}</span>
                </div>
            )} */}
            {/* <div className="mt-2 mx-2 bg-teal-500 text-sm text-white rounded-lg p-4" role="alert">
                    <span className="font-bold">123</span>
                </div> */}
            <div className='p-3 '>
                <div className='flex justify-between'>
                    <div className='capitalize font-semibold text-[1.75rem]'>ข้อมูลบริษัท</div>
                    <div className="flex gap-5 ">
                        <Link href={'/dashboard/organization/add'}>
                            <button className="add">
                                <p className='px-2'>เพิ่มข้อมูลบริษัท</p>
                            </button>
                        </Link>
                        <Search />
                    </div>
                </div>
                <table className="w-full mt-10">
                    <thead className='text-base font-medium text-[#AEABD8]'>
                        <tr>
                            <td className="p-5 ">ลำดับ</td>
                            <td className="p-5">รหัสบริษัท</td>
                            <td className="p-5">ชื่อบริษัท</td>
                            <td className="p-5">ที่อยู่</td>
                            <td className="p-5 ">ชื่อผู้ประสานงาน</td>
                            <td className="p-5 ">เบอร์โทร</td>
                            <td className="p-5">ตัวเลือก</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {organizations.map((item, index) => (
                            <tr key={item.id} >
                                <td className="p-5">{index + 1}</td>
                                <td className="p-5">{item.comId}</td>
                                <td className="p-5">{item.name}</td>
                                <td className="p-5">{item.address}</td>
                                <td className="p-5">{item.coordinator}</td>
                                <td className="p-5">{item.tel}</td>
                                <td className="p-5 flex items-center gap-3">
                                    <Link href={`/dashboard/organization/edit/${item.id}`}>
                                        {/* <button className="edit">แก้ไข</button> */}
                                        <RiEditFill />
                                    </Link>
                                    <button onClick={() => deleteOrganization(item.id)}>
                                    <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrganizationList;
