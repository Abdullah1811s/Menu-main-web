import { cn } from "@/lib/utils"
import CustomButton from "./customButton"
import Star from "./Star"
import { PartnerAnimatedComponent } from "./PartnerAnimatedComponent"

const PartnerComponent = () => {
  return (
    <section className="mt-20 mb-28 w-full h-fit px-4 overflow-visible">
      
      <div className="mt-10 w-full flex flex-col md:grid md:grid-cols-[25%_30%_35%] gap-6 md:gap-2 overflow-visible">
       
        <div className="order-1 mb-4 md:mb-0">
          <div className="flex flex-col h-full gap-5">
            <div className="bg-[#e2b489] w-full p-1 px-3 rounded-md text-black">
              <p className="text-xl sm:text-2xl md:text-3xl">For</p>
              <p className="text-4xl sm:text-5xl md:text-6xl mt-3">Partners</p>
            </div>
            <CustomButton label="Become a Partner" className="w-full sm:w-56 mt-2 z-10 relative" />
          </div>
        </div>


        <div className=" rounded-md order-3 md:order-2 mt-4 md:mt-0">
          <PartnerAnimatedComponent/>
        </div>

        <div className="flex flex-col p-2 md:p-4 gap-3 order-2 md:order-3 mt-4 md:mt-0">
          {/* First stat box */}
          <div className="bg-[#D1A27A] flex gap-3 w-full h-auto md:h-48 rounded-md py-2 px-3 md:px-6 text-black overflow-hidden">
            <div className="w-[60%] sm:w-[50%] p-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">+35%</h2>
              <p className="mt-2 text-sm sm:text-base">
                increase in customer reach
                <br />
                within the first 3 months
              </p>
            </div>

            <div className="relative w-[40%] sm:w-[50%]">
              <Star
                width="w-[2.5px]"
                height="h-12"
                shouldRotate={false}
                className={`bg-black absolute bottom-0 right-2 ml-4 mt-4 ${cn("dark:bg-black")} hidden sm:block`}
              />
              <Star
                width="w-[2.5px]"
                height="h-14"
                shouldRotate={false}
                className={`bg-black absolute -top-14 right-14 mr-5 mt-2 ${cn("dark:bg-black")} hidden sm:block`}
              />
              <Star
                width="w-[2.5px]"
                height="h-16"
                shouldRotate={false}
                className={`absolute -top-72 right-0 ${cn("dark:bg-black")} hidden sm:block`}
              />
            </div>
          </div>

          {/* Bottom stat boxes */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-64 h-auto rounded-md p-3 sm:p-5 flex flex-col justify-between border-3 border-[#D1A27A] text-[#D1A27A]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold">0%</div>
              <div className="text-sm sm:text-base md:text-lg mt-2 sm:mt-0">
                commission fees —
                <br />
                you keep 100% of
                <br />
                your earnings.
              </div>
            </div>

            <div className="w-full sm:w-49 h-auto bg-black rounded-md p-3 flex flex-col justify-between border-3 border-[#D1A27A] mt-3 sm:mt-0">
              <p className="text-3xl sm:text-4xl md:text-5xl w-full font-bold text-white">95%</p>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mt-2 sm:mt-0">
                vendor satisfaction
                <br />
                with our no-hidden-
                <br />
                fees policy.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PartnerComponent
