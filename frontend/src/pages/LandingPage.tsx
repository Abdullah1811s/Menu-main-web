import HeroSection from "@/components/custom_components/HeroSection"
import Leaderboard from "@/components/custom_components/leaderboard"
import { MissionComponent } from "@/components/custom_components/MissionComponent"
import OurPartner from "@/components/custom_components/OurPartner"
import PartnerComponent from "@/components/custom_components/PartnerComponent"
import Raffle from "@/components/custom_components/Raffle"
import SpinningWheel from "@/components/custom_components/SpinWheel"
import WhyJoin from "@/components/custom_components/WhyJoin"

const LandingPage = () => {
    return (
        <>

            <HeroSection />
            <WhyJoin />
            <PartnerComponent/>
            <MissionComponent/>
            <OurPartner/>
            <Leaderboard/>
            <SpinningWheel/>
            <Raffle/>
        </>
    )
}

export default LandingPage