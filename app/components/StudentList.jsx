'use client';

import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Search from './Search';

const StudentList = ({ students }) => {
    const router = useRouter();
    const pathname = usePathname()
    const [alertMessage, setAlertMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`/api/student/${id}`);
            router.refresh();  // รีเฟรชข้อมูลหลังจากลบสำเร็จ
        } catch (error) {
            console.log('error', error);
        }
    };

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.stId.toString().includes(searchTerm)
    );

    return (
        <div className='p-5 rounded-[20px] bg-[#1D1D41]'>
            <div className='p-3 '>
                <div className='flex justify-between'>
                    {/* <div className='capitalize font-semibold text-[1.75rem]'>{pathname.split('/').pop()}</div> */}
                    <div className='capitalize font-semibold text-[1.75rem]'>ข้อมูลนักศึกษา</div>
                    <div className="flex gap-5 ">
                        <Link href={'/dashboard/student/add'}>
                            <button className="add">
                                <p className='px-2'>เพิ่มข้อมูลนักศึกษา</p>
                            </button>
                        </Link>
                        <Search onSearch={setSearchTerm}/>
                    </div>
                </div>
                <table className="w-full mt-10">
                    <thead className='text-base font-medium text-[#AEABD8]'>
                        <tr>
                            <td className="p-2">ลำดับ</td>
                            <td className="p-2">รหัสนักศึกษา</td>
                            <td className="p-2">ชื่อ - สกุล</td>
                            <td className="p-2">เบอร์โทร</td>
                            <td className="p-2">ประเภท</td>
                            <td className="p-2">ตัวเลือก</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {filteredStudents.map((student, index) => (
                            <tr key={student.id} className='text-[#FFFFFF]'>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{student.stId}</td>
                                <td className="p-2">{student.name}</td>
                                <td className="p-2">{student.tel}</td>
                                <td className="p-2">{student.type}</td>
                                <td className=" flex items-center p-2 gap-3">
                                    <Link href={`/dashboard/student/edit/${student.id}`}>
                                        {/* <button className="edit">
                                        <p>แก้ไข</p>
                                    </button> */}
                                        <RiEditFill />
                                    </Link>
                                    <button onClick={() => deleteStudent(student.id)}>
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

export default StudentList;
