import HeroSection from "@/components/custom_components/HeroSection"
import Leaderboard from "@/components/custom_components/leaderboard"
import { MissionComponent } from "@/components/custom_components/MissionComponent"
import OurPartner from "@/components/custom_components/OurPartner"
import PartnerComponent from "@/components/custom_components/PartnerComponent"
import Raffle from "@/components/custom_components/Raffle"
import SpinningWheel from "@/components/custom_components/SpinWheel"
import WhyJoin from "@/components/custom_components/WhyJoin"
import { cn } from "@/lib/utils"

const LandingPage = () => {
    return (
        <>
            <main
                className={

                    cn("w-[90%] mx-auto h-full flex flex-col items-center", "dark:text-[#FFFF] text-black")

                }
            >
                <HeroSection />
                <WhyJoin />
                <PartnerComponent />
                <MissionComponent />
                <OurPartner />
                <Leaderboard />
                <SpinningWheel />
                {/* <Raffle /> */}
            </main>
            
        </>
    )
}

export default LandingPage