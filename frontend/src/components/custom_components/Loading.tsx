import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loading = ({ onComplete }: { onComplete: () => void }) => {
    const [showImages, setShowImages] = useState(false); // start as false
    const img1Ref = useRef<HTMLImageElement>(null);
    const curve2ref = useRef<HTMLDivElement>(null);
    const curve1ref = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);
    const [isBeingScaled, setIsBeingScaled] = useState<boolean>(false);
    useEffect(() => {
        const tl = gsap.timeline();

        // Step 1: Animate wheel rotation
        if (wheelRef.current) {
            tl.to(wheelRef.current, {
                rotation: 360,
                duration: 1,
                ease: "linear",
            });
        }

        // Step 2: Animate curves in sequence
        if (curve1ref.current && curve2ref.current) {
            gsap.fromTo(
                curve1ref.current,
                {
                    opacity: 0,
                    clipPath: "inset(0% 0 90% 0)",
                },
                {
                    opacity: 1,
                    duration: 1,
                    clipPath: "inset(0% 0 0% 0)",
                    ease: "power1.inOut",
                }
            )
            gsap.fromTo(
                curve2ref.current,
                {
                    opacity: 0,
                    clipPath: "inset(0% 0 90% 0)",
                },
                {
                    opacity: 1,
                    duration: 1,
                    clipPath: "inset(0% 0 0% 0)",
                    ease: "power1.inOut",
                    onComplete: () => setShowImages(true),
                }
            );
        }
    }, []);

    useEffect(() => {
        if (showImages) {
            const tl = gsap.timeline();

            // Step 3: Fade in both images
            tl.fromTo(
                ".fade-images img",
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.inOut",
                }
            );


            gsap.to(img1Ref.current, {
                scale: 5,
                opacity: 0,
                duration: 1,
                delay: 3,
                ease: "power1.inOut",
                onStart: () => setIsBeingScaled(true),
                onComplete: () => {
                    setShowImages(false);
                    onComplete(); 
                },
            });
            tl.fromTo(
                img1Ref.current,
                {
                    opacity: 0,
                    y: "100%",
                    visibility: "hidden",
                },
                {
                    opacity: 1,
                    y: "0%",
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power3.out",
                }
            );

        }
    }, [showImages]);

    return (
        <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden">
            {!showImages && (
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-30 h-48 ml-1">
                        <div
                            ref={curve1ref}
                            className="absolute w-48 h-48 rounded-full border-6 border-transparent border-r-[#E3B98D] border-b-[#E3B98D] transform rotate-[-45deg]"
                        ></div>
                    </div>

                    <div ref={wheelRef} className="relative z-10 ml-16">
                        <div className="relative w-32 h-32">
                            {/* Central circle */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 border-6 border-[#E3b98D] rounded-full" />
                            </div>

                            {/* Orbital circles */}
                            {[...Array(8)].map((_, i) => {
                                const angle = (i * 45) * (Math.PI / 180);
                                const radius = 60;
                                const x = radius * Math.cos(angle);
                                const y = radius * Math.sin(angle);
                                return (
                                    <div
                                        key={i}
                                        className="absolute w-6 h-6 border-4 border-[#E3b98D] rounded-full"
                                        style={{
                                            top: `calc(50% + ${y}px - 12px)`,
                                            left: `calc(50% + ${x}px - 12px)`,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="absolute w-30 h-48 mr-1">
                        <div
                            ref={curve2ref}
                            className="absolute w-48 h-48 rounded-full border-6 border-transparent border-l-[#E3B98D] border-b-[#E3B98D] transform rotate-45"
                        ></div>
                    </div>
                </div>
            )}

            {showImages && (
                <div className="absolute w-90 h-90 flex flex-col items-center justify-center text-white z-20 fade-images">
                    <img
                        ref={img1Ref}
                        src="/images/wheel.avif"
                        alt="Completed"
                        className="w-full h-full object-contain"
                    />
                    <img

                        src="/images/text.avif"
                        alt="Completed"
                        className={`w-full h-full object-contain ${isBeingScaled ? "hidden" : "block"}`}
                    />
                </div>
            )}
        </div>
    );

};

export default Loading;
