'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [stId, setStId] = useState('')
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [type, setType] = useState('')

    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post('/api/student', {
                stId,
                name,
                tel,
                type
            })
            router.push('/dashboard/student')  // ถ้าบันทึกสำเร็จจะเด้งไปที่
        } catch (error) {
            console.log('error', error)
            alert('something went wrong')
        }
    }

    // ฟังก์ชันสำหรับรีเซ็ตค่า state
    const handleReset = () => {
        setStId('')
        setName('')
        setTel('')
        setType('')
    }

    return (
        <div className='p-10'>
            <div className='border border-slate-500 rounded-lg p-5'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-5'>
                    <div className='flex items-center gap-3'>
                        <p className='w-[20%] lg:w-[15%]'>รหัสนักศึกษา</p>
                        <input
                            type="number"
                            name="studentId"
                            value={stId}
                            onChange={(e) => { setStId(e.target.value) }}
                            className='inputBox lg:w-6/12 w-full' />
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='w-[20%] lg:w-[15%]'>ชื่อ</p>
                        <input
                            type="text"
                            name="name"
                            className='inputBox lg:w-6/12 w-full '
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>

                    <div className='flex items-center gap-3'>
                        <p className='w-[20%] lg:w-[15%]'>เบอร์โทร</p>
                        <input
                            type="number"
                            name="phoneNumber"
                            className='inputBox lg:w-6/12 w-full '
                            value={tel}
                            onChange={(e) => { setTel(e.target.value) }}
                        />
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='w-[20%] lg:w-[15%]'>ประเภท</p>
                        <select
                            name="category"
                            className="inputBox lg:w-6/12 w-full"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="" disabled >โปรดเลือก</option>
                            <option value="ปกติ" style={{ color: 'black' }}>ปกติ</option>
                            <option value="เทียบโอน" style={{ color: 'black' }}>เทียบโอน</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-3 pt-10'>
                        {/* <button type="button" className='reset' onClick={handleReset}>ล้างข้อมูล</button> */}
                        <button type="submit" className='add'>บันทึก</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
