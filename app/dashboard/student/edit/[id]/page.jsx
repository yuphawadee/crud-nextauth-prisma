'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Page = ({ params }) => {
    const { id } = React.use(params)
    const [stId, setStId] = useState('')
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [type, setType] = useState('')
    const router = useRouter()

    const fetchStudent = async (id) => {
        try {
            const response = await axios.get(`/api/student/${id}`)
            setStId(response.data.stId)
            setName(response.data.name)
            setTel(response.data.tel)
            setType(response.data.type)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchStudent(id)
        }
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.put(`/api/student/${id}`, {
                stId,
                name,
                tel,
                type
            })
            router.push('/dashboard/student') // ถ้าบันทึกสำเร็จจะเด้งไปที่หน้า student
        } catch (error) {
            console.log('error', error)
            alert('something went wrong')
        }
    }

    return (
        <div className='p-10'>
            <div className='bg-[#1D1D41] p-5 rounded-lg'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-3'>
                <div className='flex items-center gap-3'>
                    <p className='w-[20%] lg:w-[15%]'>รหัสนักศึกษา</p>
                    <input
                        type="number"
                        name="studentId"
                        value={stId}
                        onChange={(e) => { setStId(e.target.value) }}
                        className='inputBox w-full lg:w-6/12' />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='w-[20%] lg:w-[15%]'>ชื่อ</p>
                    <input
                        type="text"
                        name="name"
                        className='inputBox w-full lg:w-6/12 '
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <p className='w-[20%] lg:w-[15%]'>เบอร์โทร</p>
                    <input
                        type="number"
                        name="phoneNumber"
                        className='inputBox w-full lg:w-6/12 '
                        value={tel}
                        onChange={(e) => { setTel(e.target.value) }}
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='w-[20%] lg:w-[15%]'>ประเภท</p>
                    <select name="category" className='inputBox w-full lg:w-6/12'
                        value={type}
                        onChange={(e) => { setType(e.target.value) }}
                    >
                        <option value="" disabled>โปรดเลือก</option>
                        <option value="ปกติ" className='text-black'>ปกติ</option>
                        <option value="เทียบโอน" className='text-black'>เทียบโอน</option>
                    </select>
                </div>
                <div className='flex items-center gap-3 pt-10'>
                    {/* <button type="reset" className='reset'>ล้างข้อมูล</button> */}
                    <button type="submit" className='add'>บันทึก</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Page
