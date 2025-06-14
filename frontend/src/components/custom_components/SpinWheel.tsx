"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface WheelSegment {
  text: string
  color: string
}

export default function SpinningWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const wheelContainerRef = useRef<HTMLDivElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [animationTriggered, setAnimationTriggered] = useState(false)

  const segments: WheelSegment[] = Array(8)
    .fill({
      text: "LIFT FIT - 10%\nStore wide\nDiscount",
      color: "#dda87c",
    })
    .map((segment, index) => ({
      ...segment,
      color: index % 2 === 0 ? "#dda87c" : "#2d2417",
    }))

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.max(Math.min(centerX, centerY) - 10)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((rotation * Math.PI) / 180)

    ctx.beginPath()
    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2)
    ctx.lineWidth = 20
    ctx.strokeStyle = "#dda87c"
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(0, 0, radius, Math.PI / 2, -Math.PI / 2)
    ctx.lineWidth = 20
    ctx.strokeStyle = "#000000"
    ctx.stroke()

    const segmentAngle = (2 * Math.PI) / segments.length
    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle
      const endAngle = (index + 1) * segmentAngle

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.save()
      ctx.rotate(startAngle + segmentAngle / 2)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = segment.color === "#2d2417" ? "#dda87c" : "#2d2417"

      const lines = segment.text.split("\n")
      const lineHeight = canvas.width < 400 ? 14 : 20
      const fontSize = canvas.width < 400 ? 10 : 14
      lines.forEach((line, i) => {
        const textDistance = radius * 0.6
        ctx.font = `bold ${fontSize}px Arial`
        if (startAngle + segmentAngle / 2 > Math.PI / 2 && startAngle + segmentAngle / 2 < (3 * Math.PI) / 2) {
          ctx.rotate(Math.PI)
          ctx.fillText(line, -textDistance, i * lineHeight - ((lines.length - 1) * lineHeight) / 2)
        } else {
          ctx.fillText(line, textDistance, i * lineHeight - ((lines.length - 1) * lineHeight) / 2)
        }
      })
      ctx.restore()
    })

    ctx.restore()

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI)
    ctx.fillStyle = "transparent"
    ctx.fill()
    ctx.strokeStyle = "#dda87c"
    ctx.lineWidth = 2
    ctx.stroke()

    drawPointer(ctx, centerX, 20, radius * 0.1)
  }

  const drawPointer = (ctx: CanvasRenderingContext2D, x: number, y: number, size = 15) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - size * 1.5, y - size)
    ctx.lineTo(x + size * 1.5, y - size)
    ctx.closePath()
    ctx.fillStyle = "#c13c17"
    ctx.fill()
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    const spinDuration = 5000
    const minRotations = 3 * 360
    const maxRotations = 6 * 360
    const totalRotation = Math.floor(Math.random() * (maxRotations - minRotations + 1)) + minRotations

    const segmentAngle = 360 / segments.length
    const finalAngle = (rotation + totalRotation) % 360
    const winningSegmentIndex = Math.floor(finalAngle / segmentAngle)
    const winningSegment = segments[segments.length - 1 - winningSegmentIndex]

    const startTime = Date.now()
    const startRotation = rotation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const currentRotation = startRotation + totalRotation * easeOut(progress)

      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        setWinner(winningSegment.text)
      }
    }

    requestAnimationFrame(animate)
  }

  // Canvas resize and draw effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      if (wheelContainerRef.current) {
        const container = wheelContainerRef.current
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        const size = Math.min(containerWidth, containerHeight, 500)

        canvas.width = size
        canvas.height = size
        drawWheel()
      }
    }

    // Initial setup
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [rotation])

  // Animation effect
  useEffect(() => {
    if (!containerRef.current || !borderRef.current || !canvasRef.current || !wheelContainerRef.current) return

    // Kill any existing scroll triggers first
    ScrollTrigger.getAll().forEach((st) => st.kill())

    // Set initial state immediately
    gsap.set(borderRef.current, {
      width: "80px",
      height: "80px",
      opacity: 1,
      borderWidth: 4,
      boxShadow: "none",
      pointerEvents: "auto",
    })

    gsap.set(canvasRef.current, {
      opacity: 0,
      scale: 0.8,
    })

    gsap.set(wheelContainerRef.current, {
      opacity: 0,
      scale: 0.8,
    })

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Refresh ScrollTrigger before creating new ones
      ScrollTrigger.refresh()

      const tl = gsap.timeline({
        paused: true, // Start paused
      })

      // Step 1: Grow the border WITH continuous glow
      tl.to(borderRef.current, {
        width: "100%",
        height: "100%",
        boxShadow: "inset 0 0 60px 10px #dda87c, 0 0 30px 5px rgba(221, 168, 124, 0.6)",
        duration: 2,
        ease: "power3.out",
      })

      // Step 2: Fade and scale in wheel container and canvas
      tl.to(
        [canvasRef.current, wheelContainerRef.current],
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.2",
      )

      // Step 3: Intensify the glow effect
      tl.to(
        borderRef.current,
        {
          boxShadow: "inset 0 0 80px 15px #dda87c, 0 0 50px 10px rgba(221, 168, 124, 0.8)",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.8",
      )

      // Step 4: Fade out border while maintaining glow
      tl.to(borderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
          if (borderRef.current) {
            borderRef.current.style.pointerEvents = "none"
          }
        },
      })

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          setAnimationTriggered(true)
          tl.restart()
        },
        onLeave: () => {
          setAnimationTriggered(false)
        },
        onEnterBack: () => {
          setAnimationTriggered(true)
          tl.restart()
        },
        onLeaveBack: () => {
          setAnimationTriggered(false)
          // Reset to initial state
          gsap.set(borderRef.current, {
            width: "80px",
            height: "80px",
            opacity: 1,
            borderWidth: 4,
            boxShadow: "none",
            pointerEvents: "auto",
          })
          gsap.set([canvasRef.current, wheelContainerRef.current], {
            opacity: 0,
            scale: 0.8,
          })
        },
        markers: false,
        refreshPriority: 1,
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, []) // Keep empty dependency array

  return (
    <div
      ref={containerRef}
      className="flex flex-col relative items-center justify-center gap-4 sm:gap-6 w-full p-2 sm:p-4 bg-black overflow-hidden min-h-screen"
    >
      <img
        src="/images/wheelBg.png"
        alt="wheel bg"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />

      {/* Animated border */}
      <div
        ref={borderRef}
        className="absolute top-1/2 left-1/2 pointer-events-none z-5"
        style={{
          borderStyle: "solid",
          borderColor: "#dda87c",
          borderWidth: "4px",
          background: "rgba(0, 0, 0, 0.8)",
          transform: "translate(-50%, -50%) skew(-20deg)",
          transformOrigin: "center",
          willChange: "opacity, width, height, box-shadow",
        }}
      />

      {/* Wheel container */}
      <div
        ref={wheelContainerRef}
        className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-square z-10"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#dda87c]">
          <img src="/images/wheel.png" alt="Center Logo" className="w-full h-full object-cover" />
        </div>
      </div>

      <Button
        onClick={spinWheel}
        disabled={isSpinning || !animationTriggered}
        className="bg-[#dda87c] text-[#2d2417] hover:bg-[#c13c17] hover:text-white font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg z-10 transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "SPIN THE WHEEL"}
      </Button>

      {winner && (
        <div className="mt-4 p-3 sm:p-4 bg-[#dda87c] text-[#2d2417] rounded-md text-center font-bold z-10 animate-pulse max-w-xs sm:max-w-sm">
          <h3 className="text-lg sm:text-xl">Congratulations!</h3>
          <p className="whitespace-pre-line text-sm sm:text-base">{winner}</p>
        </div>
      )}
    </div>
  )
}
