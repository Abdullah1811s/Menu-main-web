import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock } from "lucide-react"
import gsap from "gsap"
import { Link } from "react-router-dom"

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    userType: z.enum(["user", "partner", "affiliate"]),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            {
                opacity: 0,
                scale: 0.8,
                transformPerspective: 1000,
                transformOrigin: "center",
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
            }
        )
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            userType: "user",
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        setIsLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <img src="/images/login.png" alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div
                ref={containerRef}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 p-6 bg-[#181818] rounded-lg shadow-[0_0_10px_#c59f7aaa] mt-10">


                <div className="flex justify-center mb-6">
                    <div className="bg-black p-2 w-fit rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                        <img src="/images/wheel.png" alt="" />
                    </div>
                </div>

                <h1 className="text-2xl font-semibold text-white text-center mb-1">Welcome Back</h1>
                <p className="text-gray-400 text-sm text-center mb-6">
                    Don't have an account yet?{" "}
                    <Link to="/signup" className="text-[#c59f7a] hover:underline">
                        Sign up
                    </Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* User Type Radio Buttons */}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2">Login as:</label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="user"
                                    {...register("userType")}
                                    className="form-radio text-[#c59f7a] focus:ring-[#c59f7a]"
                                    defaultChecked
                                />
                                <span className="ml-2 text-white">User</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="partner"
                                    {...register("userType")}
                                    className="form-radio text-[#c59f7a] focus:ring-[#c59f7a]"
                                />
                                <span className="ml-2 text-white">Partner</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="affiliate"
                                    {...register("userType")}
                                    className="form-radio text-[#c59f7a] focus:ring-[#c59f7a]"
                                />
                                <span className="ml-2 text-white">Affiliate</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div className="relative mt-4">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("email")}
                                className="w-full bg-[#10100f] text-white px-10 py-3 rounded-md border border-gray-800 focus:outline-none focus:border-[#c59f7a] focus:ring-1 focus:ring-[#c59f7a]"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="relative mb-6">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="w-full bg-[#10100f] text-white px-10 py-3 rounded-md border border-gray-800 focus:outline-none focus:border-[#c59f7a] focus:ring-1 focus:ring-[#c59f7a]"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="text-right">
                        <Link to="#" className="text-sm text-gray-400 cursor-default">
                            Forgot your Password? Click <span className="text-[#c59f7a] cursor-pointer">Here</span>
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#dda87c] cursor-pointer text-black py-3 rounded-md hover:bg-[#b38e69] transition duration-200 font-medium"
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}