'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    status === 'authenticated' && session.user && (
      <div className="pt-10 pb-5 px-10 flex justify-end">
        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer px-3 py-1 rounded-md bg-[#27264E]"
            onClick={() =>
              setIsDropdownOpen((prev) => !prev)
            }
          >
            <div className="flex flex-col">
              <span className="text-base font-semibold">
                {session.user.name}
              </span>
            </div>
            <MdKeyboardArrowDown className="text-white" />
          </div>
          {isDropdownOpen && (
            <div className="absolute -right-5 bg-red-500 rounded-lg shadow-lg cursor-pointer">
              <ul className="py-2 px-4">
                <li
                  onClick={() =>
                    signOut({ callbackUrl: "/" })
                  }
                  className="hover:bg-red-400 text-white px-4 py-2 rounded"
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default Navbar
