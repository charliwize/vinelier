"use client"
import { XIcon } from '@phosphor-icons/react'
import React from 'react'
import { useMenu } from '../context/MenuContext'
import type { RefObject } from 'react'
import type { LenisRef } from 'lenis/react'

type NavbarProps = {
    lenisRef: RefObject<LenisRef | null>
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

const MobileMenuBar = ({ lenisRef, activeMenu, setActiveMenu }: NavbarProps) => {
    const { toggleMenu } = useMenu()
    
  return (
    <div className='h-dvh w-dvw flex flex-col gap-10'>
        <XIcon onClick={toggleMenu} size={32} className='text-white absolute top-4 right-4 cursor-pointer' />
        <ul className=' h-full flex flex-col justify-center items-center gap-[20px]'>
            <li 
            onClick={() => {
                lenisRef.current?.lenis?.scrollTo('.home', {
                    offset: 0, // optional
                    duration: 1.5, // seconds
                    easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                })
                toggleMenu()
                setActiveMenu('home')
                
            }}
            className={`text-white text-[20px] font-medium py-2 px-6 border-b border-white/20 ${activeMenu=="home" ? "bg-[#041DD9]  text-white" : ""} transition-colors rounded-full`}>Home</li>
            <li 
            onClick={() => {
                lenisRef.current?.lenis?.scrollTo('.about', {
                    offset: 0, // optional
                    duration: 1.5, // seconds
                    easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                })
                toggleMenu()
                setActiveMenu('about')
                
            }}
            className={`text-white text-[20px] font-medium py-2 px-6 border-b border-white/20 hover:bg-white/10 transition-colors rounded-full ${activeMenu=="about" ? "bg-[#041DD9]  text-white" : ""}`}>About Us</li>
            <li 
            onClick={() => {
                lenisRef.current?.lenis?.scrollTo('.restaurant', {
                    offset: 0, // optional
                    duration: 1.5, // seconds
                    easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                })
                toggleMenu()
                setActiveMenu('restaurant')
                
            }}
            className={`text-white text-[20px] font-medium py-2 px-6 border-b  border-white/20 hover:bg-white/10 transition-colors rounded-full ${activeMenu=="restaurant" ? "bg-[#041DD9]  text-white" : ""}`}>Restaurants</li>
            <li 
            onClick={() => {
                lenisRef.current?.lenis?.scrollTo('.contact', {
                    offset: 0, // optional
                    duration: 1.5, // seconds
                    easing: (t) => 1 - Math.pow(1 - t, 3), // optional
                })
                toggleMenu()
                setActiveMenu('contact')
                
            }}
            className={`text-white text-[20px] font-medium py-2 px-6 border-b border-white/20 hover:bg-white/10 transition-colors rounded-full ${activeMenu=="contact" ? "bg-[#041DD9]  text-white" : ""}`}>Contact</li>
        </ul>
    </div>
  )
}

export default MobileMenuBar