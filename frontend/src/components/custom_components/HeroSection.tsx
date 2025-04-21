import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "@/components/theme-provider"
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

import Star from './Star';


const HeroSection = () => {
    
    const { theme, setTheme } = useTheme()
    const [shouldRotate, setShouldRotate] = useState<boolean>(false);
    const darkModeBtnRef = useRef<HTMLButtonElement>(null);
    const imgRef1 = useRef<HTMLImageElement>(null);
    const imgRef2 = useRef<HTMLImageElement>(null);
    const text1Ref = useRef<HTMLParagraphElement>(null)
    const text2Ref = useRef<HTMLParagraphElement>(null)
    const [exploreRotate, setExploreRotate] = useState<boolean>(false);
    const cardRef1 = useRef<HTMLDivElement>(null)
    const cardRef2 = useRef<HTMLDivElement>(null)
    
    //gsap animation
    useEffect(() => {
        console.log("fetching");

        if (darkModeBtnRef.current) {

            gsap.to(darkModeBtnRef.current, {
                rotation: 360,
                repeat: -1,
                yoyo: true,
                duration: 5,
                ease: "linear",
            })
        }
        if (imgRef1.current) {
            gsap.fromTo(
                imgRef1.current,
                {
                    opacity: 0,
                    clipPath: 'inset(0 95% 0 0)',
                },
                {
                    opacity: 1,

                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.2,
                    ease: 'power2.out'
                }
            );

        }
        if (imgRef2.current) {
            gsap.fromTo(imgRef2.current,
                {
                    opacity: 0,
                    clipPath: 'inset(0 50% 0 50%)',
                },
                {
                    opacity: 1,
                    clipPath: 'inset(0 0% 0 0%)', 
                    duration: 1,
                    ease: "power1.inOut"
                }
            )
        }
        if (text1Ref.current) {
            gsap.fromTo(text1Ref.current, {
                z: -60,
                scale: 0.8,
                opacity: 0,
            },
                {
                    z: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                })
        }
        if (cardRef1.current && cardRef2.current) {

            gsap.fromTo(
                cardRef1.current,
                {
                    opacity: 0,
                    x: -50,
                    clipPath: 'inset(0 90% 0 0)',
                },
                {
                    opacity: 1,
                    x: 0,
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1,
                    ease: 'power2.out',
                }
            )
            gsap.fromTo(
                cardRef2.current,
                {
                    opacity: 0,
                    x: -50,
                    clipPath: 'inset(0 90% 0 0)',
                },
                {
                    opacity: 1,
                    x: 0,
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1,
                    ease: 'power2.out',
                },

            );
        }
        if (text2Ref.current) {
            gsap.fromTo(text2Ref.current, {
                opacity: 0,
                clipPath: 'inset(0 0 0 90%)',
            }, {
                opacity: 1,
                duration: 1,
                clipPath: 'inset(0 0% 0 0%)',
                ease: "power1.inOut",
            })
        }

    }, [])

    const handleDarkModeBtn = () => {
        setShouldRotate(prev => !prev);
        if (theme === "dark")
            setTheme("light")
        else
            setTheme("dark");
    }

    const rotateStar = () => {
        setExploreRotate(prev => !prev);
    }

    return (
        <section className="flex flex-col mt-5 mb-5 w-full  h-fit  px-4 sm:px-0 " aria-label="hero section">

            <div className='flex flex-col  lg:flex-row items-center justify-between'>
                <div className="p-4 w-full lg:w-auto flex  flex-col items-start justify-start">
                    <h1 className="text-3xl md:text-4xl lg:text-4xl">Revolutionizing how</h1>

                    <div className="flex flex-col sm:flex-row sm:gap-6 lg:gap-12 items-baseline sm:items-center">
                        <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Vendors</p>
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-12">
                            <Button
                                onClick={handleDarkModeBtn}
                                className={`bg-transparent shadow-none border-none hover:bg-transparent hover:shadow-none hover:border-none transition-transform duration-500 hover:scale-105 hidden sm:block`}
                                ref={darkModeBtnRef}
                            >
                                <Star width='w-1' height='h-20' shouldRotate={shouldRotate} className={`${cn("dark:bg-[#ffe5cf] bg-black")}`} />
                            </Button>
                            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Connect</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-3 mt-3">
                        <img
                            ref={imgRef1}
                            src="/images/heroVendor.avif"
                            alt="Vendor illustration"
                            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-auto lg:h-auto"
                        />
                        <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">& Grow</p>
                    </div>

                    <div className="flex w-full lg:w-[80%] mt-3 lg:items-center justify-between">
                        <p
                            ref={text1Ref}
                            className={`w-full text-[#373737] lg:w-[65%] text-sm sm:text-base md:text-lg ${cn("dark:text-[#c0c0c0]")}`}>
                            Step into a curated digital space where your membership means more. Real-time
                            competitions. Dynamic vendor tools. Instant rewards.<br />Everything you need —
                            built into one powerful platform.
                        </p>

                        <button
                            className={`group bg-transparent relative border rounded px-6 py-3  transition-transform duration-500 hover:scale-95 hidden sm:flex items-center justify-center text-xl font-medium z-10 overflow-hidden hover:bg-black  ${cn("dark:border-[#e2b489] dark:hover:text-black dark:hover:bg-[#e2b489] border-black hover:text-white ")}`}
                            onMouseEnter={rotateStar}

                        >
                            <span className="z-10">Explore Now</span>

                            {/* Half-visible stars */}
                            <div className="absolute bottom-[1px] right-[3px] z-0 ">
                                <Star width="w-[3px]" height="h-10" rotations={[97, 50, -60, -20]} className={`${cn("dark:group-hover:bg-black group-hover:bg-white")}`} shouldRotate={exploreRotate} />
                            </div>
                            <div className="absolute bottom-[-2px] right-10 z-0">
                                <Star width="w-[3px]" height="h-7" rotations={[-10, -60, 40, 90]} className={`${cn("dark:group-hover:bg-black group-hover:bg-white")}`} shouldRotate={exploreRotate} />
                            </div>
                        </button>

                    </div>
                </div>

                <div className="relative w-[200px] h-[250px] sm:w-[250px] sm:h-[300px] lg:w-[300px] lg:h-[350px] bg-gradient-to-br from-beige-200 to-beige-300 hidden lg:block mt-8 lg:mt-0">
                  
                    <div className="absolute top-4 left-4">
                        <Star width="w-[4px]" height="h-9" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>
                    <div className="absolute top-7 left-16 ml-4">
                        <Star width="w-1" height="h-14" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>
                    <div className="absolute top-5  left-32 ml-9">
                        <Star width="w-[4px]" height="h-8" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>
                    <div className="absolute top-5 left-44 ml-13">
                        <Star width="w-[2.8px]" height="h-8" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>

                    {/* Middle cluster */}
                    <div className="absolute top-22 left-20 ml-22">
                        <Star width="w-[6px]" height="h-14" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>
                    <div className="absolute top-21 left-40 ml-18">
                        <Star width="w-[3.7px]" height="h-8" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>

                    {/* Bottom right trail */}
                    <div className="absolute top-35 left-48 ml-11">
                        <Star width="w-[3.7px]" height="h-8" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>
                    <div className="absolute top-49 left-52 ml-8">
                        <Star width="w-[3.6px]" height="h-8" rotations={[-10, -60, 40, 85]} shouldRotate={shouldRotate} />
                    </div>
                </div>
            </div>

            <div className=" mt-10 flex flex-col md:flex-row justify-between gap-4  px-4">
                <div className="flex flex-col md:flex-row gap-4 md:w-1/2 mt-auto">
                    <div
                        ref={cardRef1}
                        className={`w-full md:w-1/2 p-4 border-2 rounded-xl bg-opacity-80 flex flex-col justify-between h-32 ${cn("dark:border-[#ffdfbe] border-black")}`}>
                        <p className={`text-base leading-snug ${cn("dark:text-[#fff7f0] text-black")} `}>
                            More Customers,<br />
                            more exposure, 0% commission
                        </p>
                        <Link to="#" className="self-end text-sm text-[#976941]">
                            For Partners
                        </Link>
                    </div>
                    <div
                        ref={cardRef2}
                        className={`w-full md:w-1/2 p-4 border-2 rounded-xl bg-opacity-80 flex flex-col justify-between h-32 ${cn("dark:border-[#ffdfbe] border-black")}`}>
                        <p className={`text-base leading-snug ${cn("dark:text-[#fff7f0] text-black")} `}>
                            Earn up to 30%<br />
                            commission promoting The Menu.
                        </p>
                        <Link to="#" className="self-end text-sm text-[#976941]">
                            For Affiliates
                        </Link>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="flex flex-col items-end justify-end text-right">
                        <p
                            ref={text2Ref}
                            className={` text-sm md:text-base mb-2 ${cn("dark:text-[#B4B4B4] text-black")}`}>
                            Merging competition, commerce, and community into one seamless<br />
                            platform. Whether you're a vendor scaling fast or a user chasing the<br />
                            next win — this is where digital access becomes an experience.
                        </p>
                        <div className="mt-2 w-[80%]">  
                            <img
                                ref={imgRef2}
                                src="/images/heroImg2.avif"
                                alt="hero img 2"
                                className="w-full h-[50%] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </section>

    );
};

export default HeroSection;