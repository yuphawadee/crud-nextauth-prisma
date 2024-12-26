'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const { id } = React.use(params)
    const [comId, setComId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [coordinator, setCoordinator] = useState('')
    const [tel, setTel] = useState('')

    const router = useRouter()

    const fetchOrganization = async (id) => {
        try {
            const response = await axios.get(`/api/organization/${id}`)
            setComId(response.data.comId)
            setName(response.data.name)
            setAddress(response.data.address)
            setCoordinator(response.data.coordinator)
            setTel(response.data.tel)

        } catch (error) {
            console.log('error',error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchOrganization(id)
        }
    }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.put(`/api/organization/${id}`, {
                comId,
                name,
                address,
                coordinator,
                tel
            })
            router.push('/dashboard/organization')     //ถ้าบันทึกสำเร็จจะเด้งไปที่หน้า student
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
                    <p className='w-[15%]'>รหัสบริษัท</p>
                    <input
                        type="text"
                        name=""
                        value={comId}
                        onChange={(e) => { setComId(e.target.value) }}
                        className='inputBox w-6/12' />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='w-[15%]'>ชื่อบริษัท</p>
                    <input
                        type="text"
                        name=""
                        className='inputBox w-6/12 '
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='w-[15%]'>ที่อยู่</p>
                    <textarea
                        // type="text"
                        name=""
                        className='inputBox w-6/12 '
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='w-[15%]'>ผู้ประสานงาน</p>
                    <input
                        type="text"
                        name=""
                        className='inputBox w-6/12 '
                        value={coordinator}
                        onChange={(e) => { setCoordinator(e.target.value) }}
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <p className='w-[15%]'>เบอร์โทร</p>
                    <input
                        type="text"
                        name=""
                        className='inputBox w-6/12 '
                        value={tel}
                        onChange={(e) => { setTel(e.target.value) }}
                    />
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

export default page