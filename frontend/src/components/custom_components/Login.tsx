import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import toast from "react-hot-toast";

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    userType: z.enum(["user", "partner", "affiliate"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        );
    }, []);

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
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);

        try {
            const { userType, ...credentials } = data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let response: AxiosResponse<any, any>;

            switch (userType) {
                case "user":
                    response = await axios.post(`${API_URL}/auth/login`, credentials , {
                        withCredentials:true
                    });
                    localStorage.setItem("frontendToken", response?.data?.frontendToken);
                    dispatch(login(response?.data?.user?.role));
                    console.log(response?.data);
                    // setTimeout(() => {
                    //     navigate(`/user/${response?.data?.user.id}`);
                    // }, 900);
                    
                    break;
                case "partner":
                    response = await axios.post(`${API_URL}/partner/login`, credentials);
                    break;
                case "affiliate":
                    response = await axios.post(`${API_URL}/affiliate/login`, credentials);
                    break;
                default:
                    throw new Error("Invalid user type");
            }

            toast.success(response?.data?.message);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Login error:", error?.response?.data || error.message);
            // Optionally show toast here
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <img
                src="/images/login.png"
                alt="Login background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div
                ref={containerRef}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-[#181818] rounded-lg shadow-[0_0_10px_#c59f7aaa] mx-4 sm:mx-0"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-black p-2 w-fit rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                        <img src="/images/wheel.png" alt="Logo" className="w-12 h-12" />
                    </div>
                </div>

                <h1 className="text-2xl font-semibold text-white text-center mb-1">Welcome Back</h1>
                <p className="text-gray-400 text-sm text-center mb-6">
                    Don't have an account yet?{" "}
                    <Link to="/signup" className="text-[#c59f7a] hover:underline">
                        Sign up
                    </Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2">Login as:</label>
                        <div className="flex flex-wrap gap-4">
                            {["user", "partner", "affiliate"].map((type) => (
                                <label key={type} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value={type}
                                        {...register("userType")}
                                        className="form-radio text-[#c59f7a] focus:ring-[#c59f7a]"
                                    />
                                    <span className="ml-2 text-white capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="relative">
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
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}
                                className="w-full bg-[#10100f] text-white px-10 py-3 rounded-md border border-gray-800 focus:outline-none focus:border-[#c59f7a] focus:ring-1 focus:ring-[#c59f7a] pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#c59f7a]"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="text-right">
                        <Link to="#" className="text-sm text-gray-400 hover:text-[#c59f7a] transition-colors">
                            Forgot your Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#dda87c] text-black py-3 rounded-md hover:bg-[#b38e69] transition duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
