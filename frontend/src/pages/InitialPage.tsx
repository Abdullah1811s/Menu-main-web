import Star from '@/components/custom_components/Star';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Intital.css'
import gsap from 'gsap';

const options = [
    {
        id: 1,
        heading: "User (Monthly / Once Off)",
        imgSrc: "/images/userIn.avif",
        url: "/user-sign-up",
        description: "Sign up as an individual user.",
    },
    {
        id: 2,
        heading: "Partner",
        imgSrc: "/images/vendorIn.avif",
        url: "/partner-sign-up",
        description: "Register as a vendor or business partner.",
    },
    {
        id: 3,
        heading: "Affiliate",
        imgSrc: "/images/affiliateIn.avif",
        url: "/affiliate-sign-up",
        description: "Join our affiliate program.",
    },
];

const InitialPage = () => {

    // useEffect(() => {
    //     const token = localStorage.getItem("FUToken");

    //     if (!token) return;

    //     try {
    //         const decoded: TokenPayload = jwtDecode(token);

    //         if (decoded?.id && decoded?.role === 'user') {
    //             navigate(`/user/${decoded.id}`);
    //         }
    //     } catch (err) {
    //         console.error("Invalid token:", err);
    //     }
    // }, [navigate]);

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [, setButtonClicked] = useState(false);
    const dollarREf = useRef<HTMLDivElement>(null)
    const clapREf = useRef<HTMLDivElement>(null)
    const celebREf = useRef<HTMLDivElement>(null)
    const div1REf = useRef<HTMLDivElement>(null)
    const div2REf = useRef<HTMLDivElement>(null)
    const router = useNavigate();
    useEffect(() => {
        const elements = [dollarREf.current, clapREf.current, celebREf.current, div1REf.current, div2REf.current];

        elements.forEach((el, index) => {
            if (el) {
                gsap.fromTo(
                    el,
                    {
                        y: 40,
                        scale: 0.8,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        delay: index * 0.1, // slight stagger for better flow
                        ease: 'power4.out',
                    }
                );
            }
        });
    }, []);



    const handleContinue = () => {
        if (selectedOption !== null) {
            setButtonClicked(true);
            const selected = options.find(option => option.id === selectedOption);
            if (selected) router(selected.url);
        }
    };
    const handleContinueAsGuest = () => {
        router('/landing-page');
    };

    return (
        <main className="w-[90%] mx-auto  flex h-full flex-col items-center">
            <img src="/images/grad.avif" alt="" className="absolute top-0 right-0 rotate-180" />
            <nav className='w-full p-2 sm:p-3 md:p-4 lg:p-5'>
                <img
                    src="/images/Logo.png"
                    alt="Logo"
                    className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-13 w-auto object-contain transition-transform duration-300 cursor-pointer brightness-110 contrast-110"
                />
            </nav>

            <section className='relative w-full mt-1 h-full'>

                {/* Floating emojis - responsive positioning */}
                <div ref={dollarREf} className="absolute top-16 left-8 sm:top-20 sm:left-16 md:top-22 md:left-74 mb-6 flex items-center gap-3 bg-[#1e1e1e] rounded-2xl px-2 py-1 sm:px-3 sm:py-2 w-fit h-fit shadow-sm">
                    <p className="text-2xl sm:text-3xl md:text-4xl">💸</p>
                </div>
                <div ref={clapREf} className="absolute top-[60%] left-4 sm:top-[65%] sm:left-12 md:top-[72%] md:left-54 flex items-center gap-3 bg-[#1e1e1e] rounded-2xl px-2 py-1 sm:px-3 sm:py-2 w-fit h-fit shadow-sm">
                    <p className="text-2xl sm:text-3xl md:text-4xl">👋</p>
                </div>
                <div ref={celebREf} className="absolute bottom-20 right-4 sm:bottom-24 sm:right-8 md:bottom-32 md:right-32 flex items-center gap-3 bg-[#1e1e1e] rounded-2xl px-2 py-1 sm:px-3 sm:py-2 w-fit h-fit shadow-sm">
                    <p className="text-2xl sm:text-3xl md:text-4xl">🎉</p>
                </div>

                {/* Top right section - responsive */}
                <div ref={div1REf} className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2 max-w-[280px] sm:max-w-xs z-20">
                    <p className="text-xs sm:text-sm text-white bg-[#1e1e1e] rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2 w-fit h-fit shadow-sm leading-tight">
                        I have made so many more sales after <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>signing up with the menu
                    </p>
                    <p className="w-8 h-8 sm:w-[42px] sm:h-[42px] flex justify-center items-center bg-[#1e1e1e] text-white rounded-full text-sm sm:text-xl">
                        A
                    </p>
                </div>

                {/* Center section with join options and buttons */}
                <div className="flex flex-col items-center justify-center h-full px-4">
                    <div className="p-2 sm:p-4 flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
                        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                            Join The MENU as
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                            {options.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => setSelectedOption(option.id)}
                                    className={`group w-40 h-44 sm:w-48 sm:h-52 md:w-56 md:h-60 lg:w-60 lg:h-64 xl:w-64 xl:h-66 flex flex-col items-center justify-center text-center border cursor-pointer px-3 py-4 sm:px-4 sm:py-6 transition-all duration-500 border-[#dda87c] hover:bg-[#836750] rounded-sm text-[#dda87c] hover:text-black ${selectedOption === option.id ? 'bg-[#dda87c] text-black' : 'hover:bg-[#1e1e1e]'
                                        }`}
                                >
                                    <img
                                        src={option.imgSrc}
                                        alt={option.heading}
                                        className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-26 xl:h-26 mb-2 sm:mb-4 transition-all duration-200 
    group-hover:scale-105 group-hover:filter group-hover:grayscale group-hover:brightness-0
    ${selectedOption === option.id ? "grayscale brightness-0" : ""}
  `}
                                    />

                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                                        {option.heading}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 flex items-center justify-center flex-col gap-2 sm:gap-3">
                        <button
                            onClick={handleContinue}
                            className="text-white px-4 py-2 sm:px-6 sm:py-2 rounded bg-[#523d2b] transition-all duration-200 w-64 sm:w-72 md:w-80 text-base sm:text-lg md:text-xl font-bold hover:bg-[#dda87c] hover:text-black"
                        >
                            Continue
                        </button>

                        <button
                            onClick={handleContinueAsGuest}
                            className="text-[#8b6b50] underline text-xs sm:text-sm md:text-base cursor-pointer"
                        >
                            Continue as guest
                        </button>
                    </div>
                </div>

                {/* Star section at bottom right - responsive */}
                <div className="absolute bottom-0 right-0 m-2 sm:m-4 flex gap-8 sm:gap-12 md:gap-16 lg:gap-24">
                    <Star height="h-8 sm:h-10 md:h-14" width="w-1" />
                    <Star width="w-1" height="h-12 sm:h-16 md:h-20 lg:h-24" />
                </div>
            </section>

            <div ref={div2REf} className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center gap-2 h-fit ">
                <img
                    src="/images/wheel.png"
                    alt="icon"
                    className="w-[42px] h-[42px] object-contain"
                />
                <p className="text-sm text-white bg-[#1e1e1e] rounded-2xl px-3 py-2 w-fit h-fit shadow-sm">
                    Welcome to The Menu! Here we will pave<br /> your way to victory!
                </p>
            </div>


            <img src="/images/grad.avif" alt="" className="absolute bottom-0 left-0 " />

        </main>

    );
};

export default InitialPage;
