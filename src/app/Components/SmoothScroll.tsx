// components/SmoothScroll.tsx
'use client';
import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: wrapperRef.current!.firstElementChild as HTMLElement,
      smooth: 1,
      effects: true
    });
    return () => smoother.kill();
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div id="smooth-content" style={{ minHeight: '100%', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
