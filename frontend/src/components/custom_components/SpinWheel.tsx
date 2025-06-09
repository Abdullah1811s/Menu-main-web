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
    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [winner, setWinner] = useState<string | null>(null)

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
            const lineHeight = 20
            lines.forEach((line, i) => {
                const textDistance = radius * 0.6
                ctx.font = "bold 14px Arial"
                if (
                    startAngle + segmentAngle / 2 > Math.PI / 2 &&
                    startAngle + segmentAngle / 2 < (3 * Math.PI) / 2
                ) {
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

    const drawPointer = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number = 15) => {
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

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = 500
        canvas.height = 500
        drawWheel()

        const handleResize = () => {
            if (canvas.parentElement) {
                const minSize = 100
                const size = Math.max(Math.min(canvas.parentElement.clientWidth, window.innerHeight * 0.8), minSize)
                canvas.width = size
                canvas.height = size
                drawWheel()
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [rotation])

    useEffect(() => {
        if (!containerRef.current || !borderRef.current || !canvasRef.current) return;

        // Initial state
        gsap.set(borderRef.current, {
            width: "100px",
            height: "100px",
            opacity: 1,
            borderWidth: 6,
            pointerEvents: "auto"
        });

        gsap.set(canvasRef.current, {
            opacity: 0,
            scale: 0.8
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "restart none none reverse", // Replay on scroll up
                markers: false
            }
        });

        // Step 1: Grow the border
        tl.to(borderRef.current, {
            width: "100%",
            height: "100%",
            duration: 2,
            ease: "power3.out"
        });

        // Step 2: Fade and scale in canvas
        tl.to(canvasRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1.2");

        // Step 3: Glow effect
        tl.to(borderRef.current, {
            boxShadow: "inset 0 0 60px 10px #dda87c",
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.8");

        // Step 4: Fade out border visually (but keep it in DOM)
        tl.to(borderRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
                if (borderRef.current) {
                    borderRef.current.style.pointerEvents = "none";
                }
            },
            onReverseComplete: () => {
                if (borderRef.current) {
                    borderRef.current.style.opacity = "1";
                    borderRef.current.style.pointerEvents = "auto";
                    borderRef.current.style.boxShadow = "inset 0 0 60px 10px #dda87c";
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);



    return (
        <div
            ref={containerRef}
            className="flex flex-col relative items-center justify-center gap-6 w-full   p-4 bg-black overflow-hidden min-h-screen"
        >
            <img
                src="/images/wheelBg.png"
                alt="wheel bg"
                className="absolute inset-0 object-cover w-full h-full opacity-30"
            />

            {/* Green border that grows to reveal wheel */}
            <div
                ref={borderRef}
                className="absolute top-1/2 left-1/2 w-full pointer-events-none z-5"
                style={{
                    borderStyle: "solid",
                    borderWidth: "6px",
                    height: "100px",
                    background: "rgba(0, 0, 0, 0.8)",
                    transform: "translate(-50%, -50%) skew(-20deg)",
                    transformOrigin: "center",
                    boxShadow: "inset 0 0 60px 10px #dda87c", // thicker, softer glow
                    willChange: "opacity"
                }}
            />



            <div className="relative w-[500px] h-[500px] z-10">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    width={500}
                    height={500}
                />
                <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-2 border-[#dda87c]">
                    <img
                        src="/images/wheel.png"
                        alt="Center Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className="bg-[#dda87c] text-[#2d2417] hover:bg-[#c13c17] hover:text-white font-bold px-8 py-4 text-lg z-10 transition-all duration-300 hover:scale-105"
            >
                {isSpinning ? "Spinning..." : "SPIN THE WHEEL"}
            </Button>

            {/* {winner && (
                <div className="mt-4 p-4 bg-[#dda87c] text-[#2d2417] rounded-md text-center font-bold z-10 animate-pulse">
                    <h3 className="text-xl">Congratulations!</h3>
                    <p className="whitespace-pre-line">{winner}</p>
                </div>
            )} */}
        </div>
    )
}