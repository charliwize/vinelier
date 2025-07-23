import Image from 'next/image'
import React from 'react'
import { sfProDisplay } from '../fonts'
import { ListIcon } from '@phosphor-icons/react'
import { useMenu } from '../context/MenuContext'
import type { RefObject } from 'react'
import type { LenisRef } from 'lenis/react'

type NavbarProps = {
  lenisRef: RefObject<LenisRef | null>
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}
const Navbar = ({ lenisRef, activeMenu, setActiveMenu }: NavbarProps) => {
    const { toggleMenu } = useMenu()
  return (
    <div className='flex px-4 sm:px-5 md:px-6 lg:px-8 xl:px-[20px] py-2 sm:py-3 md:py-4 lg:py-5 xl:py-[20px] justify-between items-center relative w-full overflow-hidden z-10 backdrop-blur-md bg-white/50 md:backdrop-blur-none md:bg-transparent'>

        <div className='z-10 sm:backdrop-blur-none sm:bg-transparent md:backdrop-blur-md md:bg-white/50 rounded-full py-2 px-2 md:px-4'>
            <Image src="/Logo/Logo.svg" priority alt="Logo" width={200} height={45} className='w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]' />
        </div>

        <ListIcon onClick={toggleMenu} size={32} weight='bold' className='text-[#1C1F1D] cursor-pointer block md:hidden ml-auto' />
        <div className='flex justify-center absolute w-full '>
            <div className={`flex items-center ${sfProDisplay.className} bg-[#E2E2E2]/50 rounded-full w-fit justify-center backdrop-blur-md hidden md:flex`}>
                <ul className='flex text-[14px] lg:text-[16px] font-normal uppercase text-[#1C1F1D] p-1'>
                    <li
                    onClick={() => {
                    lenisRef.current?.lenis?.scrollTo('.home', {
                        offset: 0, // optional
                        duration: 1.5, // seconds
                        easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                    })
                        setActiveMenu('home')
                    }}
                     className={`cursor-pointer px-4 lg:px-6 xl:px-[40px] py-[10px] ${activeMenu=="home" ? "bg-[#041DD9]  text-white" : ""} rounded-full  transition-colors duration-300`}>Home</li>

                    <li 
                    onClick={() => {
                    lenisRef.current?.lenis?.scrollTo('.about', {
                        offset: 0, // optional
                        duration: 1.5, // seconds
                        easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                    })
                    setActiveMenu('about')
                    }}
                    className={`cursor-pointer px-4 lg:px-6 xl:px-[40px] py-[10px] ${activeMenu=="about" ? "bg-[#041DD9]  text-white" : ""} rounded-full transition-colors duration-300` }>About</li>
                    {/* <li className='px-4 lg:px-6 xl:px-[40px] py-[10px]'>Features</li> */}

                    <li 
                    onClick={() => {
                    lenisRef.current?.lenis?.scrollTo('.restaurant', {
                        offset: 0, // optional
                        duration: 1.5, // seconds
                        easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                    })
                    setActiveMenu('restaurant')
                    }}
                    className={`cursor-pointer px-4 lg:px-6 xl:px-[40px] py-[10px] ${activeMenu=="restaurant" ? "bg-[#041DD9]  text-white" : ""} rounded-full transition-colors duration-300` }>Restaurant</li>

                    <li 
                    onClick={() => {
                    lenisRef.current?.lenis?.scrollTo('.contact', {
                        offset: 0, // optional
                        duration: 1.5, // seconds
                        easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                    })
                    setActiveMenu('contact')
                    }}
                    className={`cursor-pointer px-4 lg:px-6 xl:px-[40px] py-[10px] ${activeMenu=="contact" ? "bg-[#041DD9]  text-white" : ""} rounded-full transition-colors duration-300` }>Contact</li>
                </ul>
            </div>
        </div>
        <div>
            {/* <h1>cnev</h1> */}
        </div>
    </div>
  )
}

export default Navbar