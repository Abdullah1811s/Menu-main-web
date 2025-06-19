import { Button } from "../ui/button";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "@/store/authSlice";
import { jwtDecode } from "jwt-decode";


type TokenPayload = {
    id: string;
    email: string;
    role: 'user' | 'partner' | 'affiliate' | 'admin';
    availableRoles: string[];
};

const NavBar = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.userAuth);
    const role = useSelector((state: RootState) => state.auth.role);
    const frontendToken = localStorage.getItem("frontendToken");


    const toggleMenu = () => {
        if (isOpen) {
            gsap.to(mobileMenuRef.current, {
                x: "-100%",
                opacity: 0,
                duration: 0.5,
                ease: "power3.inOut",
                onComplete: () => setIsOpen(false),
            })
        }
        else
            setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen && mobileMenuRef.current) {
            gsap.fromTo(
                mobileMenuRef.current,
                { x: "-100%", opacity: 0 },
                { x: "0%", opacity: 1, duration: 1, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node) &&
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                toggleMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleLoginClick = (): void => {
        navigate('/login');
    };

    const handleDashboardClick = () => {
        console.log("clicked" , role)
        try {
            switch (role) {
                case 'user':
                    if (frontendToken) {
                        const decoded: TokenPayload = jwtDecode(frontendToken);
                        if (decoded?.id) {
                            return navigate(`/user/${decoded.id}/dashboard`);
                        }
                    }
                    break;

                case 'affiliate':
                    console.log("this is the case");
                    if (frontendToken) {
                        const decoded: TokenPayload = jwtDecode(frontendToken);
                        if (decoded?.id) {
                            return navigate(`/affiliate/${decoded.id}/dashboard`);
                        }
                    }
                    break;

                case 'partner':
                    if (frontendToken) {
                        const decoded: TokenPayload = jwtDecode(frontendToken);
                        if (decoded?.id) {
                            return navigate(`/partner/${decoded.id}/dashboard`);
                        }
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error("Dashboard navigation token decode error:", error);
        }

        // Fallback if decoding fails or no valid token/role found
        navigate('/login');
    };

    const handleHomeClick = () => {


        try {
            if (frontendToken) {
                const decoded: TokenPayload = jwtDecode(frontendToken);
                if (decoded?.id && decoded?.role === "user") {
                    return navigate(`/user/${decoded.id}`);
                }
            }

            if (frontendToken) {
                const decoded: TokenPayload = jwtDecode(frontendToken);
                if (decoded?.id && decoded?.role === "partner") {
                    return navigate(`/partner/${decoded.id}`);
                }
            }

            if (frontendToken) {
                const decoded: TokenPayload = jwtDecode(frontendToken);
                if (decoded?.id && decoded?.role === "affiliate") {
                    return navigate(`/affiliate/${decoded.id}`);
                }
            }

            if (frontendToken) {
                const decoded: TokenPayload = jwtDecode(frontendToken);
                if (decoded?.id && decoded?.role === "admin") {
                    return navigate(`/admin/${decoded.id}`);
                }
            }

            // Fallback to default landing page if no valid token found
            navigate("/landing-page");
        } catch (error) {
            console.error("Token decode error:", error);
            // Optionally clear invalid tokens here
            localStorage.removeItem("FUToken");
            localStorage.removeItem("PFToken");
            localStorage.removeItem("AFToken");
            localStorage.removeItem("ADFToken");
            navigate("/landing-page");
        }
    };

    const handleLogoutClick = async (): Promise<void> => {
        setIsLoggingOut(true);

        try {
            const token = localStorage.getItem("frontendToken");
            if (token) {
                localStorage.removeItem("frontendToken");
                await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
                dispatch(logout());
                toast.success("Logged out successfully");
                navigate("/landing-page");
            }

        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Failed to logout. Please try again.");
        } finally {
            setIsLoggingOut(false);
        }
    };


    return (
        <nav className="sticky top-0 z-50 flex items-center justify-center bg-black text-white text-lg w-full "
            ref={navRef}
        >
            <div className="flex justify-between items-center w-[90%] p-3">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <img
                        src="/images/wheel.png"
                        alt="Logo"
                        className="h-8 sm:h-10 md:h-13 w-auto object-contain transition-transform duration-300 cursor-pointer brightness-110 contrast-110"
                    />
                    <img
                        src="/images/textNavBar.avif"
                        alt=""
                        className="h-6 sm:h-10 md:h-7 w-auto object-contain transition-transform duration-300 cursor-pointer brightness-100 contrast-100"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex text-[#C0C0C0] cursor-pointer">
                    <ul className="flex gap-10">
                        <span
                            onClick={handleHomeClick}
                            className="cursor-pointer hover:text-[#DDA87C] transition-colors duration-200"
                        >
                            Home
                        </span>
                        <Link to="aboutUs" className="hover:text-[#DDA87C] transition-colors duration-200">About us</Link>
                        <Link to="affiliateReg" className="hover:text-[#DDA87C] transition-colors duration-200">Affiliate Registration</Link>
                        <Link to="Partner" className="hover:text-[#DDA87C] transition-colors duration-200">Partner</Link>
                        {isAuth && (
                            <button
                                onClick={handleDashboardClick}
                                className="hover:text-[#DDA87C] transition-colors duration-200"
                            >
                                Dashboard
                            </button>
                        )}
                    </ul>
                </div>

                {/* Desktop Auth Section */}
                <div className="hidden md:flex gap-3">
                    <Button
                        onClick={isAuth ? handleLogoutClick : handleLoginClick}
                        disabled={isLoggingOut}
                        className={`border-[#DDA87C] text-[#DDA87C] border-2 p-3 md:p-5 bg-transparent rounded text-lg text-center transition-all duration-500 cursor-pointer ${isLoggingOut
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#DDA87C] hover:text-black'
                            }`}
                    >
                        {isLoggingOut ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-[#DDA87C] border-t-transparent rounded-full animate-spin"></div>
                                Logging out...
                            </div>
                        ) : (
                            isAuth ? 'Logout' : 'Login'
                        )}
                    </Button>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <div className="md:hidden flex items-center">
                    <Button
                        onClick={toggleMenu}
                        className="text-white p-2 bg-black border-2 border-[#DDA87C] rounded"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black z-50 shadow-lg"
                    ref={mobileMenuRef}>
                    <div className="flex flex-col items-center py-4 px-6 space-y-4">
                        <ul className="flex flex-col items-center w-full space-y-4">
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200">
                                <Link to="/" className="block w-full">Home</Link>
                            </li>
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200">
                                <Link to="aboutUs" className="block w-full">About us</Link>
                            </li>
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200">
                                <Link to="affiliateReg" className="block w-full">Affiliate Registration</Link>
                            </li>
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200">
                                <Link to="Partner" className="block w-full">Partner</Link>
                            </li>
                            {isAuth && (
                                <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200">
                                    <button
                                        onClick={handleDashboardClick}
                                        className="block w-full"
                                    >
                                        Dashboard
                                    </button>
                                </li>
                            )}
                        </ul>

                        <div className="flex flex-col w-full space-y-3 mt-4">
                            {isAuth ? (
                                <Button
                                    onClick={handleLogoutClick}
                                    disabled={isLoggingOut}
                                    className={`border-[#DDA87C] text-[#DDA87C] border-2 p-3 bg-transparent rounded text-lg text-center transition-all duration-500 w-full ${isLoggingOut
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#DDA87C] hover:text-black'
                                        }`}
                                >
                                    {isLoggingOut ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-[#DDA87C] border-t-transparent rounded-full animate-spin"></div>
                                            Logging out...
                                        </div>
                                    ) : (
                                        'Logout'
                                    )}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleLoginClick}
                                        className="border-[#DDA87C] text-[#DDA87C] border-2 p-3 bg-transparent rounded text-lg text-center hover:bg-[#DDA87C] hover:text-black transition-all duration-500 w-full"
                                    >
                                        Login
                                    </Button>
                                    <Button className="border-[#DDA87C] text-[#DDA87C] border-2 p-3 bg-transparent rounded text-lg text-center hover:bg-[#DDA87C] hover:text-black transition-all duration-300 w-full">
                                        Sign up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;