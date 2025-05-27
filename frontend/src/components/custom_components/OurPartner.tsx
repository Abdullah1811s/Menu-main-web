"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

interface PartnerInterface {
    img: string
    name: string
    terms: string
}

const OurPartner = () => {
    const [partners, setPartners] = useState<PartnerInterface[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const namesContainerRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const mockPartners: PartnerInterface[] = [
            {
                img: "https://via.placeholder.com/150?text=One",
                name: "Partner One is",
                terms: "Term 1",
            },
            {
                img: "https://via.placeholder.com/150?text=Two",
                name: "Partner Two",
                terms: "Term 2",
            },
            {
                img: "https://via.placeholder.com/150?text=Three",
                name: "Partner Three",
                terms: "Term 3",
            },
            {
                img: "https://via.placeholder.com/150?text=Four",
                name: "Partner Four",
                terms: "Term 4",
            },
            {
                img: "https://via.placeholder.com/150?text=Five",
                name: "Partner Five",
                terms: "Term 5",
            },
        ]
        setPartners(mockPartners)
    }, [])

    useEffect(() => {
        if (partners.length === 0) return

        const moveToNextPartner = () => {
            const nextIndex = (currentIndex + 1) % partners.length

            if (namesContainerRef.current) {
                const nameElements = Array.from(namesContainerRef.current.children)

                gsap.to(nameElements, {
                    y: -60,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setCurrentIndex(nextIndex)
                        if (namesContainerRef.current?.firstChild) {
                            namesContainerRef.current.appendChild(namesContainerRef.current.firstChild)
                        }
                        gsap.set(nameElements, { y: 0 })
                    },
                })
            }
        }

        intervalRef.current = setInterval(moveToNextPartner, 3000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [partners, currentIndex])

    return (
        <section className="flex flex-col mt-28 mb-28 w-full px-4 py-6 box-border bg-black">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6">Our Partner</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                {/* Terms Column */}
                <div className="flex justify-center">
                    {partners.length > 0 && (
                        <div className=" text-2xl sm:text-3xl md:text-4xl mt-4 md:mt-8">
                            {partners[currentIndex].terms}
                        </div>
                    )}
                </div>

                {/* Names Column */}
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden flex items-center justify-center">
                    <div ref={namesContainerRef} className="absolute space-y-4">
                        {partners.map((p, idx) => (
                            <div
                                key={idx}
                                className={`text-xl sm:text-3xl md:text-5xl cursor-pointer transition-colors duration-300 ${idx === currentIndex
                                    ? "text-[#d1a77d] font-bold"
                                    : "text-white"
                                    }`}
                            >
                                {p.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Column */}
                <div className="flex justify-center ">
                    {partners.length > 0 && (
                        <img
                            src={partners[currentIndex].img || "/placeholder.svg"}
                            alt={partners[currentIndex].name}
                            className="max-h-[60px] sm:max-h-[70px] md:max-h-[80px] object-contain"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default OurPartner
