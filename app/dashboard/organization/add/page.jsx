'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const [comId, setComId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [coordinator, setCoordinator] = useState('')
    const [tel, setTel] = useState('')
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const validateFields = () => {
        const newErrors = {}
        if (!comId.trim()) newErrors.comId = 'กรุณากรอกรหัสบริษัท'
        if (!name.trim()) newErrors.name = 'กรุณากรอกชื่อบริษัท'
        if (!address.trim()) newErrors.address = 'กรุณากรอกที่อยู่'
        if (!coordinator.trim()) newErrors.coordinator = 'กรุณากรอกชื่อผู้ประสานงาน'
        if (!tel.trim()) newErrors.tel = 'กรุณากรอกเบอร์โทร'
        return newErrors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const validationErrors = validateFields()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            // ส่งข้อมูลไปที่ API
            const response = await axios.post('/api/organization', {
                comId,
                name,
                address,
                coordinator,
                tel
            })

            // ถ้าสร้างข้อมูลสำเร็จ ให้ไปที่หน้าอื่น
            router.push('/dashboard/organization')
        } catch (error) {
            // ถ้าเกิดข้อผิดพลาดจาก API
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.error
                // อัพเดตข้อผิดพลาดสำหรับ comId หรือ name
                if (errorMessage.includes('รหัสบริษัทนี้ซ้ำในระบบ')) {
                    setErrors({ ...validationErrors, comId: errorMessage })
                } else if (errorMessage.includes('ชื่อบริษัทนี้ซ้ำในระบบ')) {
                    setErrors({ ...validationErrors, name: errorMessage })
                } else {
                    setErrors({ ...validationErrors, apiError: 'เกิดข้อผิดพลาดบางอย่าง' })
                }
            } else {
                setErrors({ ...validationErrors, apiError: 'เกิดข้อผิดพลาดบางอย่าง' })
            }
        }
    }

    return (
        <div className="p-10">
            <div className="border border-slate-500 rounded-lg p-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
                    {[ 
                        { label: 'รหัสบริษัท', value: comId, setValue: setComId, error: errors.comId }, 
                        { label: 'ชื่อบริษัท', value: name, setValue: setName, error: errors.name },
                        { label: 'ที่อยู่', value: address, setValue: setAddress, error: errors.address, textarea: true },
                        { label: 'ผู้ประสานงาน', value: coordinator, setValue: setCoordinator, error: errors.coordinator },
                        { label: 'เบอร์โทร', value: tel, setValue: setTel, error: errors.tel }
                    ].map((field, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <p className="w-[15%]">{field.label}</p>
                                {field.textarea ? (
                                    <textarea
                                        className="inputBox w-6/12"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.setValue(e.target.value)
                                            setErrors((prev) => ({ ...prev, [field.label]: '' }))
                                        }}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="inputBox w-6/12"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.setValue(e.target.value)
                                            setErrors((prev) => ({ ...prev, [field.label]: '' }))
                                        }}
                                    />
                                )}
                            </div>
                            {field.error && <p className="text-red-500">{field.error}</p>}
                        </div>
                    ))}
                    <div className="flex items-center gap-3 pt-10">
                        <button type="submit" className="add">
                            บันทึก
                        </button>
                    </div>
                    {/* แสดงข้อผิดพลาดจาก API */}
                    {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}
                </form>
            </div>
        </div>
    )
}

export default Page
