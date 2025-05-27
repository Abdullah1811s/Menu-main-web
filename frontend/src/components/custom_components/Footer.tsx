import { Link } from "react-router-dom"
import CustomButton from "./customButton"

const Footer = () => {
    function handleJoinNow(): void {
        throw new Error("Function not implemented.")
    }

    return (
        <footer className="bg-black text-[#e5be93] py-10 border-t-4 border-[#e5be93]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row flex-wrap items-start justify-evenly gap-12">
                    <div className="space-y-4 max-w-sm text-center md:text-left">
                        <img src="/images/Logo.png" alt="Logo" className="w-52 mx-auto md:mx-0 object-contain" />
                        <p className="text-3xl text-white">Your World, Your Way</p>
                        <p className="text-xl text-white">
                            Email:{" "}
                            <a
                                href="mailto:support@themenuportal.co.za"
                                className="hover:underline text-[#e5be93]"
                            >
                                support@themenuportal.co.za
                            </a>
                        </p>
                        <div className="pt-4 flex justify-center md:justify-start">
                            <CustomButton label={"Join now"} onClick={handleJoinNow} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <h3 className="text-3xl font-bold mb-6">Links</h3>
                        <nav className="flex flex-col text-white space-y-2 text-center md:text-left">
                            <Link to="/" className="hover:text-[#e5be93] transition-colors">Home</Link>
                            <Link to="/about" className="hover:text-[#e5be93] transition-colors">About Us</Link>
                            <Link to="/affiliate" className="hover:text-[#e5be93] transition-colors">Join as an Affiliate</Link>
                            <Link to="/partner" className="hover:text-[#e5be93] transition-colors">Join as a Partner</Link>
                        </nav>
                    </div>

                    <div className="space-y-2 max-w-sm text-center md:text-left">
                        <h3 className="text-3xl font-bold mb-6">Legal Documents</h3>
                        <nav className="flex flex-col space-y-2 text-white">
                            <a href="/terms" className="hover:text-[#e5be93] transition-colors">
                                General Terms and Conditions
                            </a>
                            <a href="/partner-terms" className="hover:text-[#e5be93] transition-colors">
                                Partner Program Terms and Conditions
                            </a>
                            <a href="/competition-rules" className="hover:text-[#e5be93] transition-colors">
                                Competition Rules
                            </a>
                            <a href="/faq" className="hover:text-[#e5be93] transition-colors">
                                Frequently Asked Questions
                            </a>
                            <a href="/privacy" className="hover:text-[#e5be93] transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/service-terms" className="hover:text-[#e5be93] transition-colors">
                                Terms of Service
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-10 space-x-7">
                    <a href="https://www.instagram.com/the.menu.portal" target="_blank" aria-label="Instagram" className="text-[#e5be93] hover:text-white transition-colors">
                        <InstagramIcon />
                    </a>
                    <a href="https://www.tiktok.com/@themenu.sa" target="_blank" aria-label="TikTokIcon" className="text-[#e5be93] hover:text-white transition-colors">
                        <TikTokIcon />
                    </a>
                    <a href="https://x.com/themenu_sa" target="_blank" aria-label="Twitter/X" className="text-[#e5be93] hover:text-white transition-colors">
                        <TwitterIcon />
                    </a>
                    <a href="https://www.facebook.com/share/1AGK8NsgzY/?mibextid=wwXIfr" target="_blank" aria-label="Facebook" className="text-[#e5be93] hover:text-white transition-colors">
                        <FacebookIcon />
                    </a>
                </div>
            </div>
        </footer>
    )
}

const InstagramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="18" cy="6" r="1" fill="currentColor" /></svg>
)
const TikTokIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19.321 7.29297C17.9862 7.29297 16.8161 6.76991 15.9829 5.93677C15.1497 5.10363 14.6266 3.93349 14.6266 2.59863" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.6266 13.0764C14.6266 16.4775 11.8675 19.2366 8.46633 19.2366C5.06516 19.2366 2.30615 16.4775 2.30615 13.0764C2.30615 9.67519 5.06516 6.91618 8.46633 6.91618" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.6266 2.59863H19.321V7.29297" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.6266 7.29297V13.0764" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const TwitterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 21L10.5 13.5M20.5 3L13 10.5M13 10.5L8 3H3L10.5 13.5M13 10.5L21 21H16L10.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

export default Footer
