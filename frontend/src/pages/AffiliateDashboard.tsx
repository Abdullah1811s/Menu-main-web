import { useState } from "react"
import { Menu, X } from "lucide-react"
import ProfileSwitcher from "@/components/ProfileSwitcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

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

  return (
    <section className="min-h-screen w-full p-2 flex flex-col">
      <Tabs defaultValue="dashboard" className="w-full">
        <nav className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2">
                <img src="/images/wheel.png" alt="wheel" className="w-8 h-8 sm:w-10 sm:h-10" />
                <p className="text-2xl sm:text-4xl text-[#313131]">/</p>
                <ProfileSwitcher />
              </div>
              <div className="border-3 border-red-300">
                there will be button
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
              <TabsList className="bg-transparent gap-4">
                {tabs.map(({ value, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="text-yellow-600 hover:text-yellow-500 data-[state=active]:text-yellow-600 data-[state=active]:border-b-2 data-[state=active]:border-yellow-600 border-none rounded-none pb-2 transition-colors duration-200"
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

        <main className="flex-1 flex items-center mt-4 md:mt-4 justify-center overflow-auto">
          <div className="h-full w-full md:w-[90%]">
            <TabsContent value="dashboard">Dashboard Content</TabsContent>
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
