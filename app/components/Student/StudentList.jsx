'use client'
import Link from 'next/link';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Search from '../Search';
import { useState } from 'react';
import { deleteStudent } from './StudentActions';

const StudentList = ({ students }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.stId.toString().includes(searchTerm)
    )
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));


    return (
        <div className='p-5 rounded-[20px] bg-[#1D1D41]'>
            <div className='p-3'>
                <div className='flex justify-between'>
                    <div className='capitalize font-semibold text-[1.75rem]'>ข้อมูลนักศึกษา</div>
                    <div className="flex gap-5">
                        <Link href={'/dashboard/student/add'}>
                            <button className="add">
                                <p className='px-2'>เพิ่มข้อมูลนักศึกษา</p>
                            </button>
                        </Link>
                        <Search onSearch={setSearchTerm} />
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
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={student.id} className='text-[#FFFFFF]'>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{student.stId}</td>
                                <td className="p-2">{student.name}</td>
                                <td className="p-2">{student.tel}</td>
                                <td className="p-2">{student.type}</td>
                                <td className="flex items-center p-2 gap-3">
                                    <Link href={`/dashboard/student/edit/${student.id}`}>
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
