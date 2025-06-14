import { cn } from "@/lib/utils"
import gsap from "gsap";
import { Gift } from "lucide-react";
import { useEffect, useRef } from "react";
import Star from "./Star";

const WhyJoin = () => {
    const rightImageRef = useRef(null);
    const leftImageRef = useRef(null);
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });
        tl.to(
            [rightImageRef.current, leftImageRef.current],
            {
                rotation: 360,
                duration: 8,
                transformOrigin: "50% 50%",
            },
            0
        );

        tl.to(
            [rightImageRef.current, leftImageRef.current],
            {
                filter: "brightness(1.2) sepia(1) hue-rotate(-10deg) saturate(3) contrast(1.2)",
                duration: 4,
            },
            0
        ).to(
            [rightImageRef.current, leftImageRef.current],
            {
                filter: "brightness(1) sepia(0) hue-rotate(0deg) saturate(1) contrast(1)",
                duration: 4,
            },
            4
        );

        tl.to(
            cardRef.current,
            {
                borderColor: "#ffffff",
                duration: 4,
            },
            0
        ).to(
            cardRef.current,
            {
                borderColor: "#D1A27A",
                duration: 4,
            },
            4
        );

        tl.to(
            textRef.current,
            {
                color: "#ffffff",
                duration: 4,
            },
            0
        ).to(
            textRef.current,
            {
                color: "#D1A27A",
                duration: 4,
            },
            4
        );
    }, []);

    return (
        <section 
            className={`flex flex-col mt-16 mb-5 w-full h-fit px-4 sm:px-6 md:px-8 box-border`}
            ref={sectionRef}
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-20 w-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl">Why Join?</h2>
                <div className="hidden md:block">
                    <Star
                        width="w-1"
                        height="h-15"
                        shouldRotate={false}
                        className={`${cn("dark:bg-[#ffe5cf] bg-black")}`}
                    />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    Unlocking <span className={cn("dark:text-[#e2b489] text-[#d1a77d]")}>The Menu's</span> Perks
                </h3>
            </div>

            {/* Main Content Grid */}
            <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-[35%_30%_30%] gap-5">
                {/* Left Column */}
                <div className="h-full flex flex-col gap-5">
                    <div className={`w-full flex flex-col md:flex-row h-fit justify-between p-4 border-2 rounded-md ${cn("dark:border-[#e2b489] border-black")}`}>
                        <div className="mb-4 md:mb-0">
                            <p className={`text-xl font-semibold mb-4 ${cn("dark:text-[#e2b489] text-[#d1a77d]")}`}>Exclusive Savings</p>
                            <p className="text-sm">Save up to</p>
                            <p className="text-4xl sm:text-5xl font-bold text-[#B3903B] mb-2">25%</p>
                            <p className="text-sm">
                                on vendor services and products through <br className="hidden sm:block" /> exclusive platform deals
                            </p>
                        </div>
                        <div>
                            <img 
                                src="/images/coins.avif" 
                                alt="coins" 
                                className="w-32 h-32 sm:w-40 sm:h-40 md:w-46 md:h-46 object-contain" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <div className="bg-[#D1A27A] relative overflow-hidden text-black p-3 py-4 rounded-md w-full sm:w-64 h-60 flex flex-col justify-between">
                            <div>
                                <p className="text-xl sm:text-2xl font-semibold">1 in 5 users</p>
                                <p className="text-base sm:text-lg">wins a giveaway prize<br />every quarter.</p>
                            </div>
                            <div className="self-end absolute -bottom-8 -right-8">
                                <Gift size={120} className="sm:size-[180px]" />
                            </div>
                        </div>

                        <div
                            ref={cardRef}
                            className="bg-black border-2 border-[#D1A27A] relative p-3 py-4 rounded-md w-full sm:w-64 h-60 flex flex-col justify-between overflow-hidden transition-colors"
                        >
                            <div ref={textRef} className="text-[#D1A27A]">
                                <p className="text-xl sm:text-2xl font-semibold">Win</p>
                                <p className="text-base sm:text-lg">interactive Rewards</p>
                            </div>

                            {/* Right wheel */}
                            <div
                                ref={rightImageRef}
                                className="absolute -bottom-[8%] -right-[8%] w-20 h-20 sm:w-28 sm:h-28"
                            >
                                <img
                                    src="images/joinUsWheel.avif"
                                    alt="Wheel"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Left wheel */}
                            <div
                                ref={leftImageRef}
                                className="absolute -bottom-[8%] -left-[8%] w-16 h-16 sm:w-20 sm:h-20"
                            >
                                <img
                                    src="images/joinUsWheel.avif"
                                    alt="Wheel"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column (Image) - Hidden on mobile */}
                <div className="hidden lg:block relative border-[#e2b489] border-[3px] h-full text-center rounded-md overflow-hidden">
                    <img
                        src="/images/joinus.avif"
                        alt="Join Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                {/* Right Column - Hidden on mobile */}
                <div className="hidden lg:block h-full">
                    <div className={`bg-[#e2b489] sticky top-20 w-full p-2 h-fit rounded-md text-black`}>
                        <p className="text-2xl md:text-3xl">For</p>
                        <p className="text-5xl md:text-6xl lg:text-7xl">Users</p>
                    </div>
                </div>
            </div>

            {/* Mobile-only elements */}
            <div className="lg:hidden mt-6 flex flex-col items-center gap-4">
                <div className="relative w-full h-64 border-[#e2b489] border-[3px] rounded-md overflow-hidden">
                    <img
                        src="/images/joinus.avif"
                        alt="Join Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>
                <div className={`bg-[#e2b489] w-full p-4 rounded-md text-black text-center`}>
                    <p className="text-3xl">For</p>
                    <p className="text-6xl">Users</p>
                </div>
            </div>
        </section>
    )
}

export default WhyJoin;