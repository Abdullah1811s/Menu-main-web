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
                filter:
                    "brightness(1.2) sepia(1) hue-rotate(-10deg) saturate(3) contrast(1.2)",
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
        <section className={`flex flex-col mt-16 mb-5 w-full h-fit px-2 p-2 box-border `}
            ref={sectionRef}
        >

            <div className="flex text-5xl gap-20 w-full">
                <h2>Why Join?</h2>
                <div>
                    <Star
                        width="w-1"
                        height="h-15"
                        shouldRotate={false}
                        className={`${cn("dark:bg-[#ffe5cf] bg-black")}`}
                    />
                </div>

                <h3>Unlocking <span className={cn("dark:text-[#e2b489] text-[#d1a77d]")}>The Menu’s</span> Perks</h3>
            </div>

            <div className="mt-10 w-full grid grid-cols-[35%_30%_30%] gap-5 ">

                <div className="h-full flex flex-col">

                    <div className={`w-full flex h-fit justify-between p-4 border-2 rounded-md ${cn("dark:border-[#e2b489] border-black")}`}>

                        <div>
                            <p className={`text-xl font-semibold mb-4 ${cn("dark:text-[#e2b489] text-[#d1a77d]")}`}>Exclusive Savings</p>
                            <p className="text-sm">Save up to</p>
                            <p className="text-5xl font-bold text-[#B3903B] mb-2">25%</p>
                            <p className="text-sm">
                                on vendor services and products through <br /> exclusive platform deals
                            </p>
                        </div>

                        <div>
                            <img src="/images/coins.avif" alt="coins.png" className="w-46 h-46   object-contain" />
                        </div>
                    </div>


                    <div className="flex m-7 ml-0 mb-0 w-full gap-x-4 justify-start flex-grow">
                        <div className="bg-[#D1A27A] relative overflow-hidden text-black p-3 py-4 rounded-md w-64 h-60 flex flex-col justify-between">
                            <div>
                                <p className="text-2xl font-semibold">1 in 5 users</p>
                                <p className="text-lg">wins a giveaway prize<br />every quarter.</p>
                            </div>
                            <div className="self-end absolute -bottom-8 -right-8">
                                <Gift size={180} />
                            </div>
                        </div>

                        <div
                            ref={cardRef}
                            className="bg-black border-2 border-[#D1A27A] relative p-3 py-4 rounded-md w-64 h-60 flex flex-col justify-between overflow-hidden transition-colors"
                        >
                            <div ref={textRef} className="text-[#D1A27A]">
                                <p className="text-2xl font-semibold">Win</p>
                                <p className="text-lg">interactive Rewards</p>
                            </div>

                            {/* Right wheel */}
                            <div
                                ref={rightImageRef}
                                className="absolute -bottom-[8%] -right-[8%] w-28 h-28"
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
                                className="absolute -bottom-[8%] -left-[8%] w-20 h-20"
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

                <div className="relative border-[#e2b489] border-[3px] h-full text-center rounded-md overflow-hidden">
                    <img
                        src="/images/joinus.avif"
                        alt="Join Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                <div className="h-full ">
                    <div className={`bg-[#e2b489] sticky top-20  w-70 p-2 h-fit rounded-md text-black`}>
                        <p className="text-3xl">For</p>
                        <p className="text-7xl">Users</p>  {/* Increased text size */}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default WhyJoin;
