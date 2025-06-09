import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
const userTypes = [
    "User",
    "   Partner",
    "Affiliate",
];
export default function Signup() {
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate();
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
    function handleOnClick(): void {
        if (selected === "User") {
            navigate('/user-sign-up')

        } else if (selected === "Monthly Loyalty Member") {
            console.log("You selected Monthly Loyalty Member");

        } else if (selected === "Vendor / Partner") {
            navigate('/partner-sign-up')
        } else if (selected === "Affiliate") {
             navigate('/affiliate-sign-up')

        } else {
            console.log("No user type selected");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <img src="/images/login.png" alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div
                ref={containerRef}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm p-5 bg-[#181818] rounded-lg shadow-[0_0_10px_#c59f7aaa] mt-10">
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="bg-black p-2 w-fit rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                        <img src="/images/wheel.png" alt="" />
                    </div>
                    <h1 className="text-center text-3xl">Sign Up</h1>
                    <p className="text-gray-400 text-xs text-center mb-4">
                        Already have a account?{" "}
                        <Link to="/Login" className="text-[#c59f7a] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
                <div className="w-full flex items-center gap-2 mb-4">
                    <div className="h-px bg-[#c59f7a] flex-1"></div>
                    <span className="text-[#c59f7a] text-sm">Sign up as a</span>
                    <div className="h-px bg-[#c59f7a] flex-1"></div>
                </div>
                <div className="w-full space-y-2">
                    {userTypes.map((type) => {
                        const isActive = selected === type;
                        return (
                            <button
                                key={type}
                                onClick={() => setSelected(type)}
                                className={`w-full py-2 text-base shadow-[0_0_4px_rgba(255,255,255,0.2)] transition-colors duration-300 rounded-sm ease-in-out ${isActive
                                    ? "bg-[#c59f7a] text-black hover:bg-[#d5af8a]"
                                    : "bg-black text-white border border-gray-700 hover:bg-gray-900"
                                    }`}
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>
                <button
                    onClick={handleOnClick}
                    className="w-full mt-5 bg-[#dda87c] cursor-pointer text-black py-2 rounded-md hover:bg-[#b38e69] transition duration-200 font-medium">
                    Continue
                </button>
            </div>
        </div>
    )
}
