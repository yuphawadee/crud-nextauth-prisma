import React from 'react'
import { getInternshipWithCount, getStudentCount } from '../request/Request'

const page = async () => {
  const studentCount = await getStudentCount()
  const { internshipCount, cooperativeCount, passedCount, failedCount } = await getInternshipWithCount()

  return (
    <div className='p-10'>
      <div className='rounded-[20px] bg-[#1D1D41] p-8'>
      <h1 className='font-semibold text-[1.75rem]'>ระบบสารสนเทศเพื่อจัดการข้อมูลฝึกงาน/สหกิจ</h1>
      <div className='pt-5 text-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='p-6 rounded-[20px] bg-[#27264E] text-white shadow-lg'>
            <p className='font-medium mb-3'>จำนวนนักศึกษา</p>
            <p className='text-xl font-bold'>{studentCount} คน</p>
          </div>
          <div className='p-6 rounded-[20px] bg-[#27264E] text-white shadow-lg'>
            <p className='font-medium mb-3'>ฝึกงาน</p>
            <p className='text-xl font-bold'>{internshipCount + cooperativeCount} คน</p>
          </div>
          <div className='p-6 rounded-[20px] bg-[#27264E] text-white shadow-lg'>
            <p className='font-medium mb-3'>นักศึกษาที่ผ่านฝึกงาน/สหกิจ</p>
            <p className='text-xl font-bold'>{passedCount} คน</p>
          </div>
          <div className='p-6 rounded-[20px] bg-[#27264E] text-white shadow-lg'>
            <p className='font-medium mb-3'>นักศึกษาที่ไม่ผ่านฝึกงาน/สหกิจ</p>
            <p className='text-xl font-bold'>{failedCount} คน</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default page
