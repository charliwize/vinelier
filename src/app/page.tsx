"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { antonio, sfProDisplay } from './fonts'
import Image from 'next/image'
import { BandaidsIcon, BowlFoodIcon, ChartLineUpIcon, EnvelopeIcon, InstagramLogoIcon, LinkedinLogoIcon, QrCodeIcon } from '@phosphor-icons/react'
import MobileMenuBar from './Components/MobileMenuBar'
import { useMenu } from './context/MenuContext'
import { useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis, type LenisRef } from 'lenis/react'
import { LenisOptions } from 'lenis'
import SplitType from 'split-type';
import NewsletterPopUp from './Components/NewletterPopUp'
import Link from 'next/link'
import Stats from 'stats.js';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const instagramLink = "https://www.instagram.com/vineliers"
  const businessEmail = "partners@vinelier.com"
  const linkdeinLink = "https://www.linkedin.com/company/vinelier/"
  const partnerWithUsFormLink = "https://form.typeform.com/to/TdOtzuVn"

  const { isOpen } = useMenu()
  const [stickyTextOpacity, setStickyTextOpacity] = useState(1);
  const [activeMenu, setActiveMenu] = useState('home')
  const [isActiveNewsLetterPopUp, setIsActiveNewsLetterPopUp] = useState(false)

  const sectionIds = ['home','about','restaurant','contact'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // find the entry that’s currently most visible
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveMenu(visible.target.id);
        }
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveMenu]);


  // The ReactLenis ref gives us an object whose `.lenis` property is the Lenis instance
  const lenisRef = useRef<LenisRef | null>(null)

  useEffect(() => {
    const update = (time: number) => {
      // GSAP's time is in seconds; Lenis.raf expects milliseconds
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  // Disable Lenis's built‑in RAF since we drive it via GSAP
  const lenisOptions: LenisOptions = { autoRaf: false }

  

  // useEffect(() => {
  //   const stats = new Stats();
  //   stats.showPanel(0);              // 0: fps
  //   document.body.appendChild(stats.dom);

  //   function animate() {
  //     stats.begin();
  //     // nothing—just measuring
  //     stats.end();
  //     requestAnimationFrame(animate);
  //   }
  //   requestAnimationFrame(animate);

  //   return () => {
  //     document.body.removeChild(stats.dom);
  //   };
  // }, []);

  useGSAP(() => {
    // 4️⃣ Create one ScrollTrigger per .parallax element
    gsap.utils.toArray<HTMLElement>('.parallax').forEach((el) => {
      const speedAttr = el.dataset.speed
      const speed = speedAttr ? parseFloat(speedAttr) : 1

      gsap.to(el, {
        y: () => (1 - speed) * window.innerHeight,  // if speed<1 => moves down, >1 => moves up faster
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller: window,       // use the proxied scroller
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          // markers:true
        },
      })
    })
  }, [])

  useGSAP(() => {
    // Page entrance animations
    const tl = gsap.timeline();
    
    // Navbar entrance
    tl.to('.navbar-entrance', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    })
    // Hero title entrance
    .to('.hero-title', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    // Hero subtitle entrance
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')
    // Hero image entrance
    .to('.hero-image', {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.6');

    // Set initial states
    gsap.set('.hero-title', { y: 30 });
    gsap.set('.hero-subtitle', { y: 20 });
    gsap.set('.hero-image', { scale: 0.95 });

    ScrollTrigger.create({
      trigger: '.sticking-text',
      start: '40% bottom',
      end: '60% top',
      scroller: window, // use the proxied scroller
      // markers: true,

      onUpdate: (self) => {

        const p = self.progress;   // 0 up to 1

        let opacity: number;
        if (p <= 0.3) {
          // map 0→0.5 to 1→0.8
          opacity = gsap.utils.mapRange(0, 0.3, 1, 0.3, p);
        } else {
          // map 0.5→1 to 0.8→0.3
          opacity = gsap.utils.mapRange(0.3, 1, 0.3, 0.2, p);
        }
        setStickyTextOpacity(opacity);
      }
    })
    
    const split = new SplitType('.scroll-reveal-text', {
    types: 'lines,chars',
    tagName: 'span'
    });

    const mm = gsap.matchMedia();

    // ✅ Desktop
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        split.chars,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.scroll-reveal-text-container',
            start: '10% 60%',
            end: '20% 0%',
            scrub: true,
            // markers: true,
          },
        }
      );
    });
    

    // ✅ Mobile
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        split.chars,
        { opacity: 0.2, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.scroll-reveal-text-container',
            start: '20% 85%',
            end: '10% 10%',
            scrub: true,
            // markers: true,
          },
        }
      );
    });

    // Section reveal animations
    gsap.utils.toArray<HTMLElement>(".reveal-on-scroll").forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      split.revert();
      mm.revert();
    };
  });
  
  

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef}>
    <main className='w-[100dvw] min-h-[100dvh] '>
      <div className={`${isActiveNewsLetterPopUp ? 'opacity-100 pointer-events-auto': "opacity-0 pointer-events-none"} fixed top-0 left-0 w-full h-full z-50 transition-all duration-300`}>
        <NewsletterPopUp isActiveNewsLetterPopUp={isActiveNewsLetterPopUp} setIsActiveNewsLetterPopUp={setIsActiveNewsLetterPopUp} />
      </div>
      <menu className={`z-40 transition-all duration-500 bg-[#515151]/50 backdrop-blur-lg fixed top-0 left-0  ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <MobileMenuBar lenisRef = {lenisRef} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </menu>
      <div className='fixed top-0 mb-auto left-0 w-full z-30 navbar-entrance opacity-0'>
        <Navbar lenisRef = {lenisRef} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>

      <section id='home' className={`sec1 home px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[20px] flex flex-col w-full justify-center pt-[100px] sm:pt-[120px] md:pt-[140px] lg:pt-[160px] xl:pt-[180px] gap-[20px] overflow-hidden`}>
        <div className='flex flex-col text-center gap-[20px]'>

          <h1 className={`hero-title opacity-0 px-[20px] text-[48px] sm:text-[60px] md:text-[75px] lg:text-[90px] xl:text-[110px] font-bold text-center -z-10 text-[#1C1F1D] ${antonio.className} tracking-[-0.43] leading-[1.3] md:leading-[1.2] xl:leading-[1.1]`}>
            Discover Food by your Cravings, <br /> Not Just the Place.
          </h1>

          <h2 className={`hero-subtitle opacity-0 text-[#444444] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] ${sfProDisplay.className}`}>
            Reimagining how people explore, experience, and enjoy food, one plate at a time.
          </h2>

        </div>
        <div className='hero-image opacity-0 w-full relative my-[20px] rounded-2xl overflow-hidden group '>
          <Image 
            src={`/Images/sec1_image_food_2.png`}
            width={1920}
            height={1080}
            quality={80}
            className='object-cover rounded-3xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-auto px-0 group-hover:scale-105 transition-all duration-700'
            alt='Food Image'
            priority
          />
          
        </div>
      </section>

      <section id='about' className='sec2 about scroll-reveal-text-container bg-[#3746B5] flex w-full pt-[100px] sm:pt-[120px] md:pt-[140px] lg:pt-[160px] pb-[60px] sm:pb-[70px] md:pb-[80px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] justify-center items-center'>
        <div className='gap-[150px] sm:gap-[200px] md:gap-[250px] lg:gap-[300px] xl:gap-[360px] flex flex-col text-center'>
          <h1 className={`scroll-reveal-text uppercase inline whitespace-pre-wrap text-white font-bold text-center text-[40px] sm:text-[55px] md:text-[70px] lg:text-[90px] xl:text-[110px] ${antonio.className}`}>
            Vinelier is the first dish-first dining platform where you discover restaurants through the food you crave 
          </h1>
          <p className='text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] text-white text-center'>Designed for the local food scene. Let&apos;s make discovering food more delicious — and local restaurants more visible.</p>
        </div>

      </section>

      <section className={`sec3 reveal-on-scroll bg-[#FAFAFA] flex flex-col-reverse lg:flex-row justify-around w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[40px] 2xl:px-[100px] py-[40px] sm:py-[50px] md:py-[60px] lg:py-[70px] xl:py-[80px] ${sfProDisplay.className}`}>
        <div className='flex flex-col w-full lg:w-1/2 p-[10px] sm:p-[15px] md:p-[20px] lg:p-[30px] xl:p-[40px] justify-center'>
          <h4 className='font-bold text-[#A5A8B0] uppercase text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] mb-[8px] mt-[32px] lg:mt-0'>
            For Food lovers
          </h4>
          <h2 className='text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] leading-[1.6] md:leading-[1.4] lg:leading-[1.3] xl:leading-[1.2]'>
            From (what is available?) to <br /> <span className='font-bold'>“What do I want to eat?”</span>
          </h2>
          <h3 className='text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] text-[#444444] mt-[16px] leading-[1.5]'>
            Ever feel hungry and craving to eat a specific dish but unsure where to go? No worries. We’ve got you. At Vinelier, we make finding your next favorite meal as easy as scrolling your feed — then heading straight to the restaurant.
          </h3>

          <button onClick={()=>{setIsActiveNewsLetterPopUp(true)}} className='group relative w-fit cursor-pointer mt-[40px] overflow-hidden rounded-full'>
            <span className='relative z-10 block text-[16px] font-semibold text-white bg-[#041DD9] px-[24px] py-[12px] rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg'>
              Join our waitlist
            </span>
            {/* Animated background */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#041DD9] via-[#0628FF] to-[#041DD9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-110'></div>
          </button>
          
        </div>
        <div className='w-full lg:w-1/2 h-full relative group '>
          <div className='overflow-hidden rounded-2xl mx-[10px] lg:mx-0 transform transition-all duration-500 '>
            <Image 
              src={`/Images/sec3_image_food.png`}
              width={650}
              height={830}
              quality={80}
              className='object-cover w-full transition-all duration-700 group-hover:scale-110'
              alt='Food Image'
            />
            
          </div>
        </div>
        
      </section>

      <section id='restaurant' className={`sec4 restaurant reveal-on-scroll bg-[#FAFAFA] flex flex-col-reverse lg:flex-row justify-around w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[40px] 2xl:px-[100px] py-[40px] sm:py-[50px] md:py-[60px] lg:py-[70px] xl:py-[80px] ${sfProDisplay.className}`}>
        <div className='flex flex-col w-full lg:w-1/2 p-[10px] sm:p-[15px] md:p-[20px] lg:p-[30px] xl:p-[40px] justify-center'>
          <h4 className='font-bold text-[#A5A8B0] uppercase text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] mb-[8px] mt-[32px] lg:mt-0'>
            For Restaurants
          </h4>
          <h2 className='w-full lg:w-[450px] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-bold tracking-[-0.6] lg:tracking-[-1.3] xl:tracking-[-1.6] leading-[1.2]'>
            Increased visibility to <br />locals actively looking for what you serve
          </h2>
          <h3 className='text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] text-[#444444] mt-[16px] leading-[1.5]'>
            Showcase your best dishes to hungry foodies who already want what you cook. With us you get:
          </h3>

          <ul className='text-[18px] sm:text-[18px] md:text-[19px] lg:text-[19px] xl:text-[20px] font-medium text-[#444444] gap-[24px] flex flex-col mt-[24px]'>
            <li className='group flex items-center gap-[8px] cursor-pointer transition-all duration-300 hover:text-[#041DD9] hover:translate-x-2'>
              <QrCodeIcon size={28} className='transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#041DD9]' />
              Visual Menu with QR Integration
            </li>
            <li className='group flex items-center gap-[8px] cursor-pointer transition-all duration-300 hover:text-[#041DD9] hover:translate-x-2'>
              <BowlFoodIcon size={28} className='transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:text-[#041DD9]' />
              Dish-Based Discovery
            </li>
            <li className='group flex items-center gap-[8px] cursor-pointer transition-all duration-300 hover:text-[#041DD9] hover:translate-x-2'>
              <BandaidsIcon size={28} className='transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-[#041DD9]' />
              Smart Pairings = Higher Sales
            </li>
            <li className='group flex items-center gap-[8px] cursor-pointer transition-all duration-300 hover:text-[#041DD9] hover:translate-x-2'>
              <ChartLineUpIcon size={28} className='transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-[#041DD9]' />
              Actionable Insights
            </li>
          </ul>

          <Link href={partnerWithUsFormLink} target=' '>
            <button className='group relative w-fit mt-[40px] cursor-pointer overflow-hidden rounded-full'>
              <span className='relative z-10 block text-[16px] font-semibold text-white bg-[#041DD9] px-[24px] py-[12px] rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:bg-[#0628FF]'>
                Partner with us
              </span>
              {/* Ripple effect */}
              <div className='absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-600 ease-out'></div>
            </button>
          </Link>

        </div>

        <div className='w-full lg:w-1/2 h-full relative group '>
          <div className='overflow-hidden rounded-2xl mx-[10px] lg:mx-0 transform transition-all duration-500  '>
            <Image 
              src={`/Images/sec4_image_rest.png`}
              width={650}
              height={830}
              quality={80}
              className='object-cover w-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-105'
              alt='Restaurant Image'
            />
            {/* Restaurant-themed overlay */}
            <div className='absolute inset-0 bg-gradient-to-bl from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          </div>
        </div>
      </section>

      

      <section id="sticking-text" className='sticking-text relative sec5 w-full flex justify-center h-[200vh] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[15px]'>
        <div className='w-full h-full pt-[300px]  max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[510px] text-center flex flex-col gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[35px] xl:gap-[40px]'>

          <div style={{opacity:stickyTextOpacity}} className='sticky top-[50%] -translate-y-1/2 -z-10 flex flex-col gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[35px] xl:gap-[40px]'>
            <h2 className=' text-[36px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[56px] tracking-[-1.82] font-medium text-center leading-[1.1]'>
              Built to help make food <br />discovery simple
            </h2>
            <p className='text-[16px] text-[#444444] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px]'>Vinelier helps you discover meals the way your brain, and your cravings work — visually, deliciously, and intuitively.</p>
          </div>

        </div>

        
        <div className=' absolute left-0 top-0 w-screen h-[200vh] overflow-hidden'>

            <div data-speed="1.2" className="parallax group absolute top-[100vh] scale-70 sm:scale-100 left-[8vw] w-[200px] mx-auto cursor-pointer">
              <div className="relative transform transition-all duration-300 group-hover:scale-125 group-hover:z-50 group-hover:rotate-3">
                <Image
                  src="/Images/resimg-0.png"
                  alt="Delicious Pasta"
                  width={200}
                  height={200}
                  className="object-cover z-20 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                />
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <div className="bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Delicious Pasta
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              </div>
            </div>
            <div data-speed="1.8" className="parallax group absolute -z-20 scale-70 sm:scale-100 right-[16vw] top-[100vh] w-[200px] mx-auto cursor-pointer">
              <div className="relative transform transition-all duration-300 group-hover:scale-125 group-hover:z-50 group-hover:-rotate-2">
                <Image
                  src="/Images/resimg-1.png"
                  alt="Fresh Salad"
                  width={200}
                  height={200}
                  className="object-cover z-20 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                />
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <div className="bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Fresh Salad
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              </div>
            </div>
            <div data-speed="1.5" className="parallax group absolute left-[40vw] scale-70 sm:scale-100 top-[80vh] w-[200px] mx-auto cursor-pointer">
              <div className="relative transform transition-all duration-300 group-hover:scale-125 group-hover:z-50 group-hover:rotate-1">
                <Image
                  src="/Images/resimg-2.png"
                  alt="Gourmet Burger"
                  width={200}
                  height={200}
                  className="object-cover z-20 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                />
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <div className="bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Gourmet Burger
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              </div>
            </div>
            <div data-speed="2.3" className="parallax group absolute left-[30vw] scale-70 sm:scale-100 top-[120vh] w-[200px] mx-auto cursor-pointer">
              <div className="relative transform transition-all duration-300 group-hover:scale-125 group-hover:z-50 group-hover:-rotate-3">
                <Image
                  src="/Images/resimg-3.png"
                  alt="Artisan Pizza"
                  width={200}
                  height={200}
                  className="object-cover z-20 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                />
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <div className="bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Artisan Pizza
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              </div>
            </div>
            <div data-speed="1.9" className="parallax absolute opacity-80 scale-70 sm:scale-100 right-[10vw] top-[130vh] w-[200px] mx-auto">
              <Image
                
                src="/Images/resimg-4.png"
                alt="Parallax Image"
                width={200}
                height={200}
                className="object-cover z-20 rounded-lg"
              />
            </div>
            <div data-speed="1.7" className="parallax absolute -z-20 scale-70 sm:scale-100 right-[45vw] top-[150vh] w-[200px] mx-auto">
              <Image
                
                src="/Images/resimg-5.png"
                alt="Parallax Image"
                width={200}
                height={200}
                className="object-cover z-20 rounded-lg"
              />
            </div>
            <div data-speed="2.5" className="parallax absolute scale-70 sm:scale-100 right-[5vw] top-[180vh] sm:top-[170vh]  w-[200px] mx-auto">
              <Image
                
                src="/Images/resimg-6.png"
                alt="Parallax Image"
                width={200}
                height={200}
                className="object-cover z-20 rounded-lg"
              />
            </div>
            <div data-speed="2.8" className="parallax absolute scale-70 sm:scale-100 left-[1vw] sm:left-[12vw] top-[170vh] sm:top-[180vh] w-[200px] mx-auto">
              <Image
                
                src="/Images/resimg-7.png"
                alt="Parallax Image"
                width={200}
                height={200}
                className="object-cover z-20 rounded-lg"
              />
            </div>
            <div data-speed="3" className="parallax absolute scale-70 sm:scale-100 right-[1vw] sm:right-[25vw] top-[160vh] sm:top-[175vh] w-[200px] mx-auto">
              <Image
                
                src="/Images/resimg-8.png"
                alt="Parallax Image"
                width={200}
                height={200}
                className="object-cover z-20 rounded-lg"
              />
            </div>
     
        </div>
         

      </section>

      <section className='sec6 reveal-on-scroll w-full h-[50vh] flex flex-col gap-[30px] sm:gap-[35px] md:gap-[40px] lg:gap-[45px] xl:gap-[50px] justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[15px]'>
        <div className='w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[510px] text-center flex flex-col gap-[16px]'>
          <h2 className='text-[40px] sm:text-[44px] md:text-[48px] lg:text-[52px] xl:text-[56px] tracking-[-1.4] font-medium text-center leading-[1.1]'>
            Claim your Spot
          </h2>
          <p className='text-[16px] text-[#444444] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] leading-[1.5]'>Be among the first 30 restaurants to partner with us and get exclusive early-bird benefits and featured visibility.</p>
        </div>

        <Link href={partnerWithUsFormLink} target=' '>
        <button className='group relative w-fit cursor-pointer overflow-hidden rounded-full transform transition-transform duration-300 hover:scale-105'>
            <span className='relative z-10 block text-[16px] font-semibold text-white bg-[#041DD9] px-[24px] py-[12px] rounded-full transition-all duration-300 group-hover:bg-[#0628FF] group-hover:shadow-xl'>
              Partner with us
            </span>
            {/* Sliding background */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#0628FF] to-[#041DD9] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full'></div>
        </button>
        </Link>

      </section>

      <footer id='contact' className={`w-full contact h-fit bg-[#3746B5] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[140px] pb-[40px] gap-[50px] sm:gap-[75px] md:gap-[100px] lg:gap-[150px] xl:gap-[200px] flex flex-col ${sfProDisplay.className}`}>
        <div className='w-full pt-[60px] sm:pt-[65px] md:pt-[70px] lg:pt-[75px] xl:pt-[80px] flex flex-col gap-[20px]'>
          <h1 className='font-medium text-[40px] sm:text-[44px] md:text-[48px] lg:text-[52px] xl:text-[56px] text-white text-center'>
            Contact Us
          </h1>
          <div className='flex justify-center items-center gap-[16px]'>
            <Link href={instagramLink} target=' ' className='group relative'>
              <InstagramLogoIcon 
                size={28} 
                weight='fill' 
                className='text-white cursor-pointer p-4 box-content outline-1 outline-white/20 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:-translate-y-1 group-hover:shadow-lg' 
              />
            </Link>
            <Link href={`mailto:${businessEmail}`} target=' ' className='group relative'>
              <EnvelopeIcon 
                size={28} 
                weight='fill' 
                className='text-white cursor-pointer p-4 box-content outline-1 outline-white/20 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-400 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:rotate-12' 
              />
            </Link>
            <Link href={linkdeinLink} target=' ' className='group relative'>
              <LinkedinLogoIcon 
                size={28} 
                weight='fill' 
                className='text-white cursor-pointer p-4 box-content outline-1 outline-white/20 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:-translate-y-1 group-hover:shadow-lg' 
              />
            </Link>
          </div>
        </div>
        <div className='justify-between flex flex-col-reverse sm:flex-row items-center w-full text-[14px] text-white/60 gap-[10px] sm:gap-0'>
          <p className=''>© 2025 Vinelier. All Rights Reserved.</p>
          <div className='flex gap-[30px] justify-center'>
            <Link href={`/privacy-policy`}><p className=''>Privacy policy</p></Link>
            {/* <p className=''>Terms of Service</p> */}
          </div>
        </div>
      </footer>

    </main>
    </ReactLenis>
  )
}

export default Home