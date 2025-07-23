"use client"
import React, { useState } from 'react'
import { sfProDisplay } from '../fonts'
import { XIcon } from '@phosphor-icons/react'

type NewsLetterPopUpProps = {
  isActiveNewsLetterPopUp: boolean;
  setIsActiveNewsLetterPopUp: (isActive: boolean) => void;
}
const NewsletterPopUp = ({isActiveNewsLetterPopUp,setIsActiveNewsLetterPopUp}:NewsLetterPopUpProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'success'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus('sending')
        setErrorMsg('')
        console.log("Submitting form with", { name, email })
        try {
        const res = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Unknown error')
        setStatus('success')
        setName('')
        setEmail('')
        // wait 2 seconds before closing
        setTimeout(() => {
        setIsActiveNewsLetterPopUp(false)
        setStatus('idle')  // reset status if you want to re‑use the popup later
        }, 2000)
        } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setErrorMsg(message)
        setStatus('error')
        }
    }
  return (
    <div className='absolute bg-black/50 px-8 z-40 w-full h-full flex justify-center items-center'>

        <div className={`max-w-[450px] relative max-h-[580px] bg-white rounded-lg ${sfProDisplay.className} px-[40px] sm:px-[70px] py-[60px] text-center flex flex-col justify-center items-center gap-[20px]`}>
            <XIcon onClick={()=>{setIsActiveNewsLetterPopUp(false)}} size={28} className='text-black absolute top-4 right-4 cursor-pointer' />
            <h2 className='text-[40px]  font-medium tracking-[-1.82] text-[#141212] leading-[1.2]'>
                Be the first to know when we launch
            </h2>
            <p className='text-[16px] text-[#444444] '>Join our Helsinki food revolution—restaurants, showcase your dishes; diners, find your next favorite</p>
            <form onSubmit={handleSubmit} className='flex flex-col w-full  gap-[16px] mt-[10px]'>
                <input 
                value={name} 
                required 
                onChange={e => setName(e.target.value)} 
                type="text" 
                placeholder='Enter Full Name' 
                className='w-full h-[50px] px-[20px] border border-[#D0D0D0] rounded-2xl outline-none focus:border-[#041DD9]' />

                <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder='Enter Email' 
                className='w-full h-[50px] px-[20px] border border-[#D0D0D0] rounded-2xl outline-none focus:border-[#041DD9]' />
                <button 
                type='submit' 
                disabled={status === 'sending'} 
                className='bg-[#041DD9] cursor-pointer font-semibold mt-[20px] text-white py-3 px-8   rounded-full hover:bg-[#030f7b] transition-colors duration-300'>{status === 'sending' ? 'Submitting…' : 'Join our waitlist'}</button>

                {status === 'error' && <p className="text-red-600 mt-2">{errorMsg}</p>}
                {status === 'success' && <p className="text-green-600 mt-2">Thank you for subscribing!</p>}
            </form>
        </div>

    </div>
  )
}

export default NewsletterPopUp