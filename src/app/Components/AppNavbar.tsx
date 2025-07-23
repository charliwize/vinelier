import Image from 'next/image'
import React from 'react'

const AppNavbar = () => {
  return (
    <div>
        <div className='flex items-center gap-1 px-[10px] py-[10px]'>

        
        <Image
          src="/Logo/Wine.svg"
          alt="Vinelier Logo"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <h1>Vinelier</h1>
        </div>
    </div>
  )
}

export default AppNavbar