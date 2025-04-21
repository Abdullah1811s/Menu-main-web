import { Button } from "../ui/button";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useRef, useEffect } from "react";
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
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
    }, [isOpen]);


    return (
        <nav className="flex items-center justify-center bg-black text-white text-lg w-full relative"
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
                        <Link to="#" className="hover:text-[#DDA87C] transition-colors duration-200">Home</Link>
                        <Link to="#" className="hover:text-[#DDA87C] transition-colors duration-200">About us</Link>
                        <Link to="#" className="hover:text-[#DDA87C] transition-colors duration-200">Affiliate Registration</Link>
                        <Link to="#" className="hover:text-[#DDA87C] transition-colors duration-200">Partner</Link>
                    </ul>
                </div>

                {/* Desktop Auth Section */}
                <div className="hidden md:flex gap-3">
                    <Button className="border-[#DDA87C] text-[#DDA87C] border-2 p-3 md:p-5 bg-transparent rounded text-lg text-center hover:bg-[#DDA87C] hover:text-black transition-all duration-500">
                        Login
                    </Button>
                    {/* <Button className="border-[#DDA87C] text-[#DDA87C] border-2 p-3 md:p-5 bg-transparent rounded text-lg text-center hover:bg-[#DDA87C] hover:text-black transition-all duration-300">
                        Sign up
                    </Button> */}
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
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200    ">
                                <Link to="#" className="block w-full">Home</Link>
                            </li>
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200    ">
                                <Link to="#" className="block w-full">About us</Link>
                            </li>
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200    ">
                                <Link to="#" className="block w-full">Affiliate Registration </Link>
                            </li>
                            <li className="w-full text-center py-2 hover:text-[#DDA87C] transition-colors duration-200    ">
                                <Link to="#" className="block w-full">Partner </Link>
                            </li>
                        </ul>

                        <div className="flex flex-col w-full space-y-3 mt-4">
                            <Button className="border-[#DDA87C] text-[#DDA87C] border-2 p-3 bg-transparent rounded text-lg text-center hover:bg-[#DDA87C] hover:text-black transition-all duration-500 w-full">
                                Login
                            </Button>
                            <Button className="border-[#DDA87C] text-[#DDA87C] border-2 p-3 bg-transparent rounded text-lg text-center hover:bg-[#DDA87C] hover:text-black transition-all duration-300 w-full">
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;