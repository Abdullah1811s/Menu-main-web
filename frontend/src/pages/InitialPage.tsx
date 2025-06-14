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
            <nav className='w-full p-5'>
                <img
                    src="/images/Logo.png"
                    alt="Logo"
                    className="h-8 sm:h-10 md:h-13 w-auto object-contain transition-transform duration-300 cursor-pointer brightness-110 contrast-110"
                />
            </nav>

            <section className='relative w-full mt-1 h-full'>


                <div ref={dollarREf} className="absolute top-22 left-74 mb-6 flex items-center gap-3 bg-[#1e1e1e] rounded-2xl px-3 py-2 w-fit h-fit shadow-sm">
                    <p className="text-4xl">💸</p>
                </div>
                <div ref={
                    clapREf
                } className="absolute top-[72%] left-54 flex items-center gap-3 bg-[#1e1e1e] rounded-2xl px-3 py-2 w-fit h-fit shadow-sm">
                    <p className="text-4xl">👋</p>
                </div>
                <div ref={celebREf} className="absolute bottom-32 right-32 flex items-center gap-3 bg-[#1e1e1e] rounded-2xl px-3 py-2 w-fit h-fit shadow-sm">
                    <p className="text-4xl">🎉</p>
                </div>



                {/* Top right section */}
                <div ref={div1REf} className="absolute top-4 right-4 flex items-center gap-2 max-w-xs z-20">

                    <p className="text-sm text-white bg-[#1e1e1e] rounded-2xl px-3 py-2 w-fit h-fit shadow-sm">
                        I have made so many more sales after <br />signing up with the menu
                    </p>
                    <p className="w-[42px] h-[42px] flex justify-center items-center bg-[#1e1e1e] text-white rounded-full text-xl">
                        A
                    </p>
                </div>

                {/* Center section with join options and buttons */}
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="p-4 flex flex-col items-center gap-10">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl text-center">
                            Join The MENU as
                        </h1>

                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
                            {options.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => setSelectedOption(option.id)}
                                    className={`group w-56 sm:w-60 md:w-64 h-60 sm:h-64 md:h-66 flex flex-col items-center justify-center text-center border cursor-pointer px-4 py-6 transition-all duration-500 border-[#dda87c] hover:bg-[#836750] rounded-sm text-[#dda87c] hover:text-black ${selectedOption === option.id ? 'bg-[#dda87c] text-black' : 'hover:bg-[#1e1e1e]'
                                        }`}
                                >
                                    <img
                                        src={option.imgSrc}
                                        alt={option.heading}
                                        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 mb-4 transition-all duration-200 
    group-hover:scale-105 group-hover:filter group-hover:grayscale group-hover:brightness-0
    ${selectedOption === option.id ? "grayscale brightness-0" : ""}
  `}
                                    />

                                    <p className="text-lg sm:text-xl md:text-2xl font-medium">
                                        {option.heading}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center flex-col gap-3">
                        <button
                            onClick={handleContinue}
                            className="text-white px-6 py-2 rounded bg-[#523d2b] transition-all duration-200 w-80 text-lg sm:text-xl font-bold hover:bg-[#dda87c] hover:text-black"
                        >
                            Continue
                        </button>

                        <button
                            onClick={handleContinueAsGuest}
                            className="text-[#8b6b50] underline text-sm sm:text-base cursor-pointer"
                        >
                            Continue as guest
                        </button>
                    </div>
                </div>

                {/* Star section at bottom right */}
                <div className="absolute bottom-0 right-0 m-4 flex gap-24">
                    <Star height="h-14" width="w-1" />
                    <Star width="w-1" height="h-24" />
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
