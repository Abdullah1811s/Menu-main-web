
import type React from "react"
// import 
import { useState, useEffect, useRef } from "react"

interface Winner {
  name: string
  prize: string
  value: string
}

// Custom hook for intersection observer
function useIntersectionObserver(elementRef: React.RefObject<Element>, options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20% 0px",
        ...options,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}

export default function Raffle() {
  const [winner, setWinner] = useState<Winner | null>(null)
  const [loading, setLoading] = useState(true)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const isCardVisible = useIntersectionObserver(cardRef)

  // Simulate loading and setting winner data
  useEffect(() => {
    const timer = setTimeout(() => {
      setWinner({
        name: "John Doe",
        prize: "Premium Package",
        value: "$500",
      })
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex justify-center items-center min-h-[400px] p-4">
      <div
        ref={cardRef}
        className={`
          w-full max-w-lg bg-black border-2 rounded-lg overflow-hidden
          transition-all duration-1500 ease-out transform-gpu
          ${isCardVisible 
            ? "opacity-100 h-auto border-[#bd906a] glow-box-open shadow-glow-intense" 
            : "opacity-0 h-16 border-[#bd906a]/30"
          }
        `}
      >
        {/* Always visible header section */}
        <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-[#bd906a]/20 to-[#bd906a]/10">
          {/* Glowing Logo */}
          <div className="flex items-center gap-3">
            <div className={`
              w-12 h-12 bg-[#bd906a] rounded-full flex items-center justify-center 
              transition-all duration-1000 shadow-glow
              ${isCardVisible ? "animate-pulse-glow scale-110" : "scale-100"}
            `}>
              <img src="/images/wheel.png" alt="wheel" className="w-7 h-7" />
            </div>
            <div className="text-[#bd906a] font-bold text-xl glow-text">Win Big!</div>
          </div>
          
          {/* Status indicator */}
          <div className={`
            w-3 h-3 rounded-full transition-all duration-1000
            ${isCardVisible ? "bg-[#bd906a] shadow-glow animate-pulse-glow" : "bg-[#bd906a]/30"}
          `} />
        </div>

        {/* Expandable content section */}
        <div
          ref={contentRef}
          className={`
            transition-all duration-1500 ease-out overflow-hidden
            ${isCardVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="p-6 space-y-4">
            {/* Prize Info */}
            <div className="text-center">
              {loading ? (
                <div className="h-4 w-3/4 mx-auto bg-[#bd906a]/30 mb-4 rounded animate-pulse-custom" />
              ) : (
                <div className={`
                  text-[#bd906a] text-lg mb-4 glow-text transition-all duration-1000 delay-500
                  ${isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}>
                  🎉 {winner?.prize} (Valued at {winner?.value}) 🎉
                </div>
              )}
            </div>

            {/* Winner Name Section */}
            <div className={`
              w-full bg-gradient-to-r from-[#bd906a] to-[#bd906a]/80 rounded-lg p-6 
              shadow-glow-box transition-all duration-1000 delay-700
              ${isCardVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
            `}>
              {loading ? (
                <div className="h-10 w-3/4 mx-auto bg-black/20 rounded animate-pulse-custom" />
              ) : (
                <div className="text-center">
                  <div className="text-black/70 text-sm font-medium mb-2">🏆 WINNER 🏆</div>
                  <h2 className="text-black text-3xl font-bold tracking-wide">
                    {winner?.name}
                  </h2>
                </div>
              )}
            </div>

            {/* Celebration particles effect */}
            <div className={`
              flex justify-center space-x-2 transition-all duration-1000 delay-1000
              ${isCardVisible ? "opacity-100" : "opacity-0"}
            `}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    w-2 h-2 bg-[#bd906a] rounded-full animate-bounce shadow-glow
                  `}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
