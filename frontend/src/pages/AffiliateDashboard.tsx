import { useState } from "react"
import { Menu, X } from "lucide-react"
import AvatarButton from "./AvatarAffiliate"
import ProfileSwitcher from "@/components/ProfileSwitcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import CustomButton from "@/components/custom_components/customButton"
import AffiliateDashBoardOverview from "@/components/custom_components/affiliateDashboard/DashboardOverview/affiliateDashBoardOverview"
import NotificationButton from "@/components/custom_components/affiliateDashboard/NotificationCenterAffiliate"

const AffiliateDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const tabs = [
    { value: "dashboard", label: "Dashboard" },
    { value: "campaigns", label: "Campaigns" },
    { value: "referrals", label: "Referrals" },
    { value: "competitions", label: "Competitions" },
    { value: "earnings", label: "Earnings" },
    { value: "notifications", label: "Notifications" },
    { value: "settings", label: "Settings" },
  ]

  const handleCreateCampaigns = async () => {
    alert("Function will be implemented later!!")
  }

  return (
    <section className="h-ful w-full p-2 flex flex-col bg-[#0f0f0f]">

      <Tabs defaultValue="dashboard" className="w-full">
        <nav className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 ">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2">
                <img src="/images/wheel.png" alt="wheel" className="w-8 h-8 sm:w-10 sm:h-10" />
                <p className="text-2xl sm:text-4xl text-[#313131]">/</p>
                <ProfileSwitcher />
              </div>
              <div className="flex items-center justify-center gap-4">
                <CustomButton
                  label="Create Campaigns"
                  className="flex justify-center text-[#c79b74] items-center w-64 h-12 rounded-md border-2 border-[#c79b74] hover:border-[#b48761] transition-colors duration-500"
                  onClick={handleCreateCampaigns}
                />

                <NotificationButton />
                <AvatarButton />


              </div>
              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-8 w-8 text-[#d5a278]" />
                ) : (
                  <Menu className="h-8 w-8 text-[#d5a278]" />
                )}
              </Button>


            </div>


            <div className="hidden md:flex gap-2 list-none overflow-x-auto py-2">
              <TabsList className="bg-transparent text-2xl gap-4">
                {tabs.map(({ value, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="text-lg text-gray-400 hover:text-gray-300 data-[state=active]:!text-[#c1936d] data-[state=active]:border-b-2 data-[state=active]:border-[#c1936d] border-none rounded-none pb-2 transition-colors duration-200"
                  >
                    {label}
                  </TabsTrigger>

                ))}
              </TabsList>
            </div>

            <div
              className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
              <div className="flex flex-col gap-2 py-2 px-2">
                <TabsList className="bg-transparent flex-col h-auto gap-2 p-0">
                  {tabs.map(({ value, label }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="w-full text-yellow-600 hover:text-yellow-500 data-[state=active]:text-yellow-600 data-[state=active]:border-b-2 data-[state=active]:border-yellow-600 border-none rounded-none pb-2 transition-colors duration-200 justify-start"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex items-center mt-2 md:mt-2 bg-[#0f0f0f] justify-center overflow-
         ">
          <div className="h-full w-full md:w-[90%]">
            <TabsContent value="dashboard"><AffiliateDashBoardOverview /></TabsContent>
            <TabsContent value="campaigns">Campaigns Content</TabsContent>
            <TabsContent value="referrals">Referrals Content</TabsContent>
            <TabsContent value="competitions">Competitions Content</TabsContent>
            <TabsContent value="earnings">Earnings Content</TabsContent>
            <TabsContent value="notifications">Notifications Content</TabsContent>
            <TabsContent value="settings">Settings Content</TabsContent>
          </div>

        </main>
      </Tabs>


    </section>
  )
}

export default AffiliateDashboard
