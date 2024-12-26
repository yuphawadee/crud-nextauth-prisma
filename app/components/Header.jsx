'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathname = usePathname()
  return (
    <div className='capitalize font-semibold text-[1.75rem] pb-8'>{pathname.split('/').pop()}</div>
  )
}

export default Header