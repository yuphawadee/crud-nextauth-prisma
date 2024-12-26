'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Search from './Search';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const InternshipList = ({ internships }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filterInternships = internships.filter((internship) =>
            // internship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.stId.toString().includes(searchTerm)
    )
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    

    const deleteInternship = async (id) => {
        try {
            await axios.delete(`/api/internship/${id}`);
            router.refresh();  // รีเฟรชข้อมูลหลังจากลบสำเร็จ
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className='p-5 rounded-[20px] bg-[#1D1D41]'>
                <div className='p-3'>
                <div className='flex justify-between'>
                    <div className='capitalize font-semibold text-[1.75rem]'>ข้อมูลการฝึกงาน</div>
                    <div className="flex gap-5 ">
                        <Link href={'/dashboard/internship/add'}>
                            <button className="add">
                                <p className='px-2'>เพิ่มข้อมูลการฝึกงาน</p>
                            </button>
                        </Link>
                        <Search onSearch={setSearchTerm} />
                    </div>
                </div>
            <table className="w-full mt-10">
                <thead className='text-base font-medium text-[#AEABD8]' >
                    <tr>
                        <td className="p-2 ">ลำดับ</td>
                        <td className="p-2">รหัสนักศึกษา</td>
                        <td className="p-2">ปีที่ฝึก</td>
                        <td className="p-2">รหัสบริษัท</td>
                        <td className="p-2">ประเภทการฝึก</td>
                        <td className="p-2 ">สถานะ</td>
                        <td className="p-2">ตัวเลือก</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {filterInternships.map((internship, index) => (
                        <tr key={internship.id} >
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{internship.stId}</td>
                            <td className="p-2">{internship.year}</td>
                            <td className="p-2">{internship.comId}</td>
                            <td className="p-2">{internship.type}</td>
                            <td className="p-2">{internship.status}</td>
                            <td className="p-2 flex items-center gap-3">
                                <Link href={`/dashboard/internship/edit/${internship.id}`}>
                                    {/* <button className="edit">แก้ไข</button> */}
                                    <RiEditFill />
                                </Link>
                                <button onClick={() => deleteInternship(internship.id)}>
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

export default InternshipList;
