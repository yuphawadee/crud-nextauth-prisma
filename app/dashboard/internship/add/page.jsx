'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const [students, setStudents] = useState([]);  // เก็บข้อมูลนักศึกษา
    const [year, setYear] = useState('');
    const [stId, setStId] = useState('');  // เลือก stId จาก dropdown
    const [comId, setComId] = useState('');
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const router = useRouter();
    const [organizations, setOrganizations] = useState([]);
    const [internships, setInternships] = useState([]); // เก็บข้อมูล internship

    // ดึงข้อมูลนักศึกษาจาก API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/student');  // เปลี่ยนเป็น API ของคุณ
                setStudents(response.data);  // สมมติว่า response.data เป็น array ของนักศึกษา
            } catch (error) {
                console.log('Error fetching students', error);
            }
        };

        const fetchOrganizations = async () => {
            try {
                const response = await axios.get('/api/organization');  // เปลี่ยนเป็น API ของคุณ
                setOrganizations(response.data);  // สมมติว่า response.data เป็น array ขององค์กร
            } catch (error) {
                console.log('Error fetching organizations', error);
            }
        };

        const fetchInternships = async () => {
            try {
                const response = await axios.get('/api/internship');  // เปลี่ยนเป็น API ของคุณ
                setInternships(response.data);  // สมมติว่า response.data เป็น array ของ internship
            } catch (error) {
                console.log('Error fetching internships', error);
            }
        };

        fetchStudents();
        fetchOrganizations();
        fetchInternships();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!year || !stId || !comId || !type || !status) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        // ตรวจสอบว่า stId ที่เลือกมีอยู่ใน internship แล้วหรือไม่
        const isStIdExistInInternship = internships.some(internship => internship.stId === stId);
        if (isStIdExistInInternship) {
            alert('รหัสนักศึกษานี้มีข้อมูลอยู่ในระบบแล้ว');
            return;
        }

        try {
            // บันทึกข้อมูล internship ใหม่
            await axios.post('/api/internship', {
                year,
                stId,
                comId,
                type,
                desc,
                status
            });
            router.push('/dashboard/internship'); // ถ้าบันทึกสำเร็จจะเด้งไปที่หน้า dashboard
        } catch (error) {
            console.log('Error', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div className='p-10'>
            <div className='border border-slate-500 rounded-lg p-5'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-5'>
                    <div className='flex items-center gap-3'>
                        <p className='w-[15%]'>ปีที่ฝึก</p>
                        <input
                            type="number"
                            name="year"
                            value={year}
                            onChange={(e) => { setYear(e.target.value) }}
                            className='inputBox w-6/12'
                        />
                    </div>

                    {/* Select dropdown สำหรับเลือก stId */}
                    <div className='flex items-center gap-3'>
                        <p className='w-[15%]'>รหัสนักศึกษา</p>
                        <select
                            name="stId"
                            value={stId}
                            onChange={(e) => setStId(e.target.value)}
                            className='inputBox w-6/12'
                        >
                            <option value="" disabled>โปรดเลือก</option>
                            {students.map(student => (
                                <option key={student.stId} value={student.stId} className='text-black'>
                                    {student.stId} {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex items-center gap-3'>
                        <p className='w-[15%]'>รหัสบริษัท</p>
                        <select
                            name="comId"
                            value={comId}
                            onChange={(e) => setComId(e.target.value)}
                            className='inputBox w-6/12'
                        >
                            <option value="" disabled>โปรดเลือก</option>
                            {organizations.map(item => (
                                <option key={item.comId} value={item.comId} className='text-black'>
                                    {item.comId} ({item.name})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='w-[15%]'>ประเภท</p>
                        <select
                            name="type"
                            className='inputBox w-6/12'
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                        >
                            <option value="" disabled>โปรดเลือก</option>
                            <option value="ฝึกงาน" className='text-black'>ฝึกงาน</option>
                            <option value="สหกิจ" className='text-black'>สหกิจ</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='w-[15%]'>ตำแหน่ง</p>
                        <input
                            type="text"
                            name=""
                            className='inputBox w-6/12'
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value) }}
                        />
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='w-[15%]'>สถานะ</p>
                        <select
                            name="status"
                            className='inputBox w-6/12'
                            value={status}
                            onChange={(e) => { setStatus(e.target.value) }}
                        >
                            <option value="" disabled>โปรดเลือก</option>
                            <option value="ผ่าน" className='text-black'>ผ่าน</option>
                            <option value="ไม่ผ่าน" className='text-black'>ไม่ผ่าน</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-3 pt-10'>
                        <button type="submit" className='add'>บันทึก</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page;
