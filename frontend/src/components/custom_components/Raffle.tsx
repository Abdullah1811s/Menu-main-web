import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import './Raffle.css'

gsap.registerPlugin(ScrollTrigger)

interface Winner {
  name: string
  prize: string
  value: string
}

export default function Raffle() {
  const [winner, setWinner] = useState<string | null>("this is demo version")
  const [loading, setLoading] = useState(true)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const nameRef = useRef<HTMLHeadingElement | null>(null)
useEffect(() => {
  if (!cardRef.current) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardRef.current,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  tl.fromTo(
    cardRef.current,
    {
      opacity: 0,
      scaleY: 0.5,
      width: "16rem", // Tailwind max-w-md (~256px)
      transformOrigin: "top center",
    },
    {
      opacity: 1,
      scaleY: 1,
      width: "28rem", // Make it more rectangular (~448px)
      duration: 1.2,
      ease: "power3.out",
    }
  )

  if (nameRef.current) {
    gsap.fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: nameRef.current,
          start: "top 90%",
        },
      }
    )
  }
}, [loading])


  return (
    <div className="flex justify-center items-center min-h-[300px] p-4">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-black border  border-[#d2a076] rounded-md overflow-hidden glow-box transition-all"
      >
        <div className="relative flex flex-col items-center p-6 text-center">
          {/* Glowing Logo */}
          <div className="absolute top-4 left-4">
            <div className="w-10 h-10 bg-[#d2a076] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_10px_#d2a076]">
             <img src="/images/wheel.png" alt="wheel"  className=""/>
            </div>
          </div>

          <div className="text-[#d2a076] font-semibold text-xl mb-1 mt-2">Win</div>

          {/* Prize Info */}
          {loading ? (
            <div className="h-4 w-3/4 bg-[#d2a076]/30 mb-2 rounded animate-pulse" />
          ) : (
            <div className="text-[#d2a076] text-sm mb-2">
              {winner?.prize} (Valued at {winner?.value})
            </div>
          )}

          {/* Winner Name */}
          <div className="w-full bg-[#d2a076]/90 rounded-md mt-2 p-6 overflow-hidden">
            {loading ? (
              <div className="h-8 w-3/4 mx-auto bg-[#d2a076]/30 rounded animate-pulse" />
            ) : (
              <h2
                ref={nameRef}
                className="text-black text-2xl font-bold"
              >
                {winner?.name}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
