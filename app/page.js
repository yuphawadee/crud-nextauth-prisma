'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LuUser } from "react-icons/lu";
import { BiLock } from "react-icons/bi";

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // เพิ่ม state สำหรับ loading
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('กรุณา Login ก่อนเข้าใช้งาน')
  const [showAlert, setShowAlert] = useState(false)
  
  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      setMessage(message)
      setShowAlert(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showAlert])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // เคลียร์ error ก่อน submit
    setLoading(true) // ตั้ง loading เป็น true
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        setError(result.error) // ตั้งค่า error ถ้ามี
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง') // กรณีจับ error โดยตรง
    } finally {
      // setLoading(false) // ตั้ง loading เป็น false หลังจากเสร็จสิ้น
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {showAlert && (
        <div className="alert w-[450px]">
          <div className="flex items-center rounded p-4 mb-4 text-base bg-red-100 text-red-500" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">กรุณาเข้าสู่ระบบเพื่อเริ่มใช้งาน!</span>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#03014C] p-10 rounded shadow-[0_4px_20px_rgba(83,129,248,0.3)] w-[450px] h-[500px] flex flex-col justify-center items-center gap-8"
      >
        <div className='text-center flex flex-col gap-3'>
          <h1 className='text-3xl font-bold text-[#03014C]'>เข้าสู่ระบบ</h1>
          <p className='text-base'>ระบบสารสนเทศเพื่อจัดการข้อมูลฝึกงาน/สหกิจ </p>
        </div>
        <div className="w-full flex gap-5 border border-[#8180A5] px-3 py-4 rounded">
          <LuUser className='text-2xl' />
          <input
            id="email"
            type="email"
            value={email}
            placeholder='กรุณากรอกอีเมล'
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent focus:outline-none placeholder-[rgba(3,1,76,0.6)] font-semibold"
            disabled={loading} // ปิด input ขณะกำลังโหลด
          />
        </div>
        <div className="w-full flex gap-5 border border-[#8180A5] px-3 py-4 rounded">
          <BiLock className='text-2xl' />
          <input
            id="password"
            type="password"
            value={password}
            placeholder='กรุณากรอกรหัสผ่าน'
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-transparent focus:outline-none placeholder-[rgba(3,1,76,0.6)] font-semibold"
            disabled={loading} // ปิด input ขณะกำลังโหลด
          />
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error} {/* แสดงข้อความข้อผิดพลาด */}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-4 rounded mb-4 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
            }`}
          disabled={loading} // ปิดปุ่มขณะกำลังโหลด
        >
          {loading ? 'กำลังโหลด...' : 'เข้าสู่ระบบ'} {/* เปลี่ยนข้อความปุ่ม */}
        </button>
      </form>
    </div>
  )
}
