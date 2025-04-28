import React from 'react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import ThemeLogo from '@/components/logo/ThemeLogo'

const Logosession = () => {
  return (
    <div className='flex items-center justify-between w-full'>
        <ThemeLogo href="/" />
        <ThemeToggle />
    </div>
  )
}

export default Logosession