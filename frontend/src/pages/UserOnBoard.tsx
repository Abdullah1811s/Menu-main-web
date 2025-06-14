/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import gsap from "gsap";
import { User, Mail, Lock, Phone, EyeOff, Eye, ArrowLeft } from "lucide-react";

import Star from "@/components/custom_components/Star";
import { login } from "@/store/authSlice";

const countries = [
  { code: "+27", name: "SA" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+91", name: "IN" },
  { code: "+971", name: "UAE" },
  { code: "+234", name: "NG" },
];

const provinceCities: Record<string, string[]> = {
  "Eastern Cape": ["Gqeberha (Port Elizabeth)", "East London", "Mthatha", "Queenstown", "Grahamstown", "King William's Town"],
  "Free State": ["Bloemfontein", "Welkom", "Bethlehem", "Sasolburg", "Parys", "Kroonstad"],
  "Gauteng": ["Johannesburg", "Pretoria", "Sandton", "Midrand", "Centurion", "Soweto", "Benoni", "Boksburg", "Kempton Park", "Alberton", "Vanderbijlpark"],
  "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Richards Bay", "Newcastle", "Pinetown", "Umhlanga", "Ballito", "Margate"],
  "Limpopo": ["Polokwane", "Tzaneen", "Mokopane", "Thohoyandou", "Bela-Bela", "Lephalale"],
  "Mpumalanga": ["Mbombela (Nelspruit)", "Witbank (eMalahleni)", "Middelburg", "Secunda", "Barberton", "Sabie"],
  "Northern Cape": ["Kimberley", "Upington", "Springbok", "De Aar", "Kuruman", "Colesberg"],
  "North West": ["Mahikeng", "Rustenburg", "Klerksdorp", "Potchefstroom", "Brits", "Lichtenburg"],
  "Western Cape": ["Cape Town", "Stellenbosch", "George", "Paarl", "Worcester", "Mossel Bay", "Knysna"]
};

const provinces = Object.keys(provinceCities) as [keyof typeof provinceCities];
const allCities = provinces.flatMap(prov => provinceCities[prov]);

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  phone: z.string().min(9, "Phone number must be at least 9 digits"),
  town: z.string().min(1, "Please enter the town name"),
  province: z.enum(provinces, {
    errorMap: () => ({ message: "Please select a province" }),
  }),
  city: z.enum(allCities as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a city" }),
  }),
  street: z.string().min(1, "Street address is required"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
  incomeRange: z.enum([
    "Under R2,000",
    "R2,001 – R5,000",
    "R5,001 – R10,000",
    "R10,001 – R20,000",
    "Above R20,000",
    "Prefer not to say",
  ]).optional().nullable(),
  shopPreference: z.enum(["Online", "Walk-in (in-store)", "Both equally"]).optional().nullable(),
  interests: z
    .array(
      z.enum([
        "Food & Takeaways",
        "Beauty & Grooming",
        "Fashion & Accessories",
        "Health & Wellness",
        "Electronics & Gadgets",
        "Travel & Experiences",
        "Home & Décor",
        "Spiritual / Holistic",
        "Auto & Transport",
        "Entertainment (Events, Streaming)",
        "Data & Mobile Packages",
        "Education & Online Learning",
        "Groceries & Household Essentials",
        "Kids & Family",
      ])
    )
    .max(7)
    .optional(),
  dealPreferences: z
    .array(
      z.enum([
        "Discounts & vouchers",
        "Combo deals (e.g. Meal + Spa)",
        "Flash sales / limited time offers.",
        "Buy one, get one free.",
        "Cashback or store credit",
        "Free gifts with purchase",
        "First access to new products",
        "Loyalty stamp rewards",
        "Bulk-buy discounts.",
      ])
    )
    .max(6)
    .optional(),
  giveawayPreferences: z
    .array(
      z.enum([
        "Cash prizes",
        "Vouchers / Store Credit",
        "Tech (Phones, Laptops, Gadgets)",
        "Fashion / Brand Merch",
        "Restaurant or Spa Experiences",
        "Shopping Sprees",
        "House or Rent for a Year",
        "Groceries for a Month",
        "Flights or Travel Packages",
        "School Fees or Education Support",
        "Car or Transport Vouchers",
        "Business Startup Kits",
      ])
    )
    .max(6)
    .optional(),
  rewardPlatformFrequency: z.enum([
    "Daily",
    "Weekly",
    "Occasionally",
    "Rarely",
  ]).optional().nullable(),
  notificationPreference: z.enum(["Email", "SMS", "WhatsApp", "App Push Notifications"]).optional().nullable(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const incomeRanges = [
  "Under R2,000",
  "R2,001 – R5,000",
  "R5,001 – R10,000",
  "R10,001 – R20,000",
  "Above R20,000",
  "Prefer not to say",
];
const pref = ["Online", "Walk-in (in-store)", "Both equally"];
const interests = [
  "Food & Takeaways",
  "Beauty & Grooming",
  "Fashion & Accessories",
  "Health & Wellness",
  "Electronics & Gadgets",
  "Travel & Experiences",
  "Home & Décor",
  "Spiritual / Holistic",
  "Auto & Transport",
  "Entertainment (Events, Streaming)",
  "Data & Mobile Packages",
  "Education & Online Learning",
  "Groceries & Household Essentials",
  "Kids & Family",
];
const rewardPlatformFrequencyOptions = [
  "Daily",
  "Weekly",
  "Occasionally",
  "Rarely",
];
const notificationPreferenceOptions = [
  "Email",
  "SMS",
  "WhatsApp",
  "App Push Notifications",
];
const deals = [
  "Discounts & vouchers",
  "Combo deals (e.g. Meal + Spa)",
  "Flash sales / limited time offers.",
  "Buy one, get one free.",
  "Cashback or store credit",
  "Free gifts with purchase",
  "First access to new products",
  "Loyalty stamp rewards",
  "Bulk-buy discounts.",
]
const giveaways = [
  "Cash prizes",
  "Vouchers / Store Credit",
  "Tech (Phones, Laptops, Gadgets)",
  "Fashion / Brand Merch",
  "Restaurant or Spa Experiences",
  "Shopping Sprees",
  "House or Rent for a Year",
  "Groceries for a Month",
  "Flights or Travel Packages",
  "School Fees or Education Support",
  "Car or Transport Vouchers",
  "Business Startup Kits",
]
type SignUpForm = z.infer<typeof formSchema>;

const UserOnBoard = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [, setRotate] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [stepQuestion, setStepQuestion] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("+27");
  const [isLoading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const containerRefs = Array(11).fill(0).map(() => useRef<HTMLDivElement>(null));
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incomeRange: null,
      shopPreference: null,
      interests: [],
      dealPreferences: [],
      giveawayPreferences: [],
      rewardPlatformFrequency: null,
      notificationPreference: null,
    },
  });

  const formData = watch();
  const selectedProvince = watch("province");
  const cityOptions = selectedProvince && provinceCities[selectedProvince] ? provinceCities[selectedProvince] : [];

  useEffect(() => {
    gsap.to(`#step-${step}`, {
      scale: 1.2,
      backgroundColor: "#dda87c",
      borderColor: "#dda87c",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [step]);

  useEffect(() => {
    if ((step >= 1 && step <= 4) || (step === 3 && stepQuestion >= 1 && stepQuestion <= 7)) {
      containerRefs.forEach((ref, index) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { y: 100, scale: 0.8, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
            }
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepQuestion]);

  const handleNext = async () => {
    setRotate(true);
    if (step === 1) {
      const valid = await trigger([
        "name",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger([
        "street",
        "province",
        "city",
        "postalCode",
      ]);
      if (valid) setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleStepClick = async (stepNumber: number) => {
    if (stepNumber < step) {
      setStep(stepNumber);
      return;
    }

    let isValid = false;

    if (step === 1) {
      isValid = await trigger([
        "name",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ]);
    } else if (step === 2) {
      isValid = await trigger([
        "street",
        "province",
        "city",
        "postalCode",
      ]);
    }

    if (isValid || stepNumber < step) {
      setStep(stepNumber);
      if (stepNumber === 3) {
        setStepQuestion(1); // Reset to first preference question
      }
    }
  };


  const preferenceNext = () => {
    if (stepQuestion < 7) {
      setStepQuestion((s: number) => s + 1);
    } else {
      setStep((s) => s + 1);
    }
  };

  const onSubmit = async (data: SignUpForm) => {
   
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });


      if (!response.ok) {
        const result = await response.json().catch(() => ({
          message: "Network response was not ok"
        }));

        throw new Error(
          result.message ||
          `Signup failed with status ${response.status}` ||
          "Signup failed. Please try again."
        );
      }

      const result = await response.json();
      console.log("Response : ", result);
      toast.success('Signup successful!');
      dispatch(login(result?.user?.role));
      localStorage.setItem("frontendToken", result?.frontendToken);   
      const userId = result?.user?.id;
      if (userId) {
        setTimeout(() => {
          navigate(`/user/${userId}`);
        }, 2000);
      }

    } catch (error: any) {
      console.error("Signup error:", error.message);

      // Handle different error types
      let errorMessage = "Signup failed. Please try again.";

      if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
        errorMessage = "Network error - Please check your internet connection";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };



  return (
    <main className="w-full  flex h-full flex-col items-center relative">
      <img src="/images/grad.avif" alt="" className="absolute top-0 right-0 rotate-180" />
      <nav className="w-[90%] p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">

        <div className="flex items-center justify-between w-full sm:w-auto">
          <img
            src="/images/Logo.png"
            alt="Logo"
            className="h-6 sm:h-8 md:h-10 lg:h-13 w-auto object-contain transition-transform duration-300 cursor-pointer brightness-110 contrast-110"
          />
        </div>

        <div className="flex items-center justify-center w-full sm:w-auto">
          {[1, 2, 3, 4].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => handleStepClick(s)}
                  id={`step-${s}`}
                  className={`rounded-full w-4 h-4 sm:w-4 sm:h-4 flex cursor-pointer bg-white items-center justify-center z-10 border-2 font-semibold transition-all duration-300 text-xs sm:text-sm ${step === s
                    ? "bg-[#dda87c] border-[#dda87c] text-black"
                    : step > s
                      ? "bg-[#dda87c]/50 border-[#dda87c]/50 text-white"
                      : "bg-white text-black border-gray-300"
                    }`}
                >
                  {s}
                </button>
                <div className="absolute top-full mt-1 sm:mt-2 text-xs font-medium text-gray-300 whitespace-nowrap hidden sm:block">
                  {s === 1 ? "Personal Info" : s === 2 ? "Location" : s === 3 ? "Preferences" : "Payment"}
                </div>
              </div>
              {index < 3 && (
                <div
                  className={`w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 mx-1 sm:mx-2 transition-all duration-300 ${step > s ? "bg-[#dda87c]" : "bg-gray-300"
                    }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 sm:hidden text-xs text-gray-300 mt-2">
          <span className={step === 1 ? "text-[#dda87c] font-medium" : ""}>Personal</span>
          <span>•</span>
          <span className={step === 2 ? "text-[#dda87c] font-medium" : ""}>Location</span>
          <span>•</span>
          <span className={step === 3 ? "text-[#dda87c] font-medium" : ""}>Preferences</span>
          <span>•</span>
          <span className={step === 4 ? "text-[#dda87c] font-medium" : ""}>Payment</span>
        </div>
      </nav>

      <div ref={containerRefs[0]} className="h-full w-[90%]  flex items-center justify-center z-20 ">

        <div
          className={`w-[30%]   h-full  md:h-[90%] px-10   sm:px-10 py-1 rounded-sm  ${step === 3
            ? "bg-transparent shadow-none w-full h-fit "
            : "bg-[#181818] shadow-[0_0_10px_2px_#dda87c]"
            }`}
        >

          {step < 3 && (
            <div className="flex flex-col items-center justify-center p-4">

              <div className="bg-[#1c1c1c] shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] rounded-lg p-2">
                <img src="/images/wheel.png" alt="" className="object-contain w-full max-w-[200px] mx-auto" />
              </div>
              <div className="mt-4 text-2xl sm:text-3xl text-center">
                <p className="text-white font-medium">Let's Get You On Board</p>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <div className="flex-1 h-px bg-[#d19f76] max-w-[100px]" />
                  <p className="text-[#d19f76] text-sm sm:text-base whitespace-nowrap">
                    {step === 1 ? "Personal Information" : step === 2 ? "Location Details" : "Preferences"}
                  </p>
                  <div className="flex-1 h-px bg-[#d19f76] max-w-[100px]" />
                </div>
              </div>
            </div>
          )}

          {step < 4 ? (
            <div>
              {step === 1 && (
                <div ref={containerRefs[1]} className="space-y-4 sm:space-y-6">
                  <div className="relative w-full">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      {...register("name")}
                      defaultValue={formData.name || ""}
                      placeholder="Full Name"
                      className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                    />
                    {errors.name && (
                      <p className="absolute text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      {...register("email")}
                      defaultValue={formData.email || ""}
                      placeholder="Email Address"
                      className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                    />
                    {errors.email && (
                      <p className="absolute text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="bg-[#0d0d0d] text-gray-400 border border-[#dda87c] px-2 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#dda87c]"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          ({country.code}) ({country.name})
                        </option>
                      ))}
                    </select>

                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        {...register("phone")}
                        defaultValue={formData.phone || ""}
                        placeholder="Phone Number"
                        className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                      />
                      {errors.phone && (
                        <p className="absolute text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      defaultValue={formData.password || ""}
                      placeholder="Password"
                      className="w-full bg-[#0d0d0d] text-white px-10 py-2 pr-10 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                    {errors.password && (
                      <p className="absolute text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      defaultValue={formData.confirmPassword || ""}
                      placeholder="Confirm Password"
                      className="w-full bg-[#0d0d0d] text-white px-10 py-2 pr-10 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </div>
                    {errors.confirmPassword && (
                      <p className="absolute text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div ref={containerRefs[2]} className="space-y-4 sm:space-y-6">
                  <div className="relative w-full">
                    <input
                      {...register("street")}
                      defaultValue={formData.street || ""}
                      placeholder="Street Address (e.g., 123 Main St)"
                      className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#dda87c] placeholder-gray-400"
                    />
                    {errors.street && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.street.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <select
                      {...register("province")}
                      defaultValue={formData.province || ""}
                      className="w-full bg-[#0d0d0d] text-gray-400 px-3 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#dda87c]"
                    >
                      <option value="">Select Province</option>
                      {provinces.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.province.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <select
                      {...register("city")}
                      defaultValue={formData.city || ""}
                      className="w-full bg-[#0d0d0d] text-gray-400 px-3 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#dda87c]"
                      disabled={!selectedProvince}
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <input
                      {...register("town")}
                      defaultValue={formData.town || ""}
                      placeholder="Town"
                      className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#dda87c] placeholder-gray-400"
                    />
                    {errors.town && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.town.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <input
                      {...register("postalCode")}
                      defaultValue={formData.postalCode || ""}
                      placeholder="Postal Code"
                      className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#dda87c] placeholder-gray-400"
                    />
                    {errors.postalCode && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              )}


              {step === 3 && (
                <>
                  {stepQuestion === 1 && (
                    <div ref={containerRefs[3]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                        Please Select an Income Range
                      </label>

                      {incomeRanges.map((range) => (
                        <label
                          key={range}
                          className="flex items-center justify-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={range}
                            {...register("incomeRange")}
                            className="hidden peer"
                          />
                          <span
                            className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black hover:bg-[#523d2b] hover:text-black"
                          >
                            {range}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {stepQuestion === 2 && (
                    <div ref={containerRefs[4]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                        Do you prefer to shop online or in<br className="hidden sm:block" /> person?
                      </label>

                      {pref.map((sp) => (
                        <label
                          key={sp}
                          className="flex items-center justify-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={sp}
                            {...register("shopPreference")}
                            className="hidden peer"
                          />
                          <span
                            className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black peer-checked:transition-none hover:bg-[#523d2b] hover:text-black"
                          >
                            {sp}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {stepQuestion === 3 && (
                    <div ref={containerRefs[5]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-1 text-center">
                        What types of <span className="text-[#dda87c]">goods or services</span> are you<br className="hidden sm:block" />
                        <span className="text-[#dda87c]">most interested</span> in?
                      </label>
                      <p className="text-center text-sm">Select all that apply (Max 7)</p>

                      {errors.interests && (
                        <p className="text-red-500 text-lg text-center mb-4">
                          {errors.interests.message}
                        </p>
                      )}

                      <div className="text-white text-center mb-4">
                        Selected: {(getValues("interests")?.length || 0)}/7
                      </div>

                      {/* Improved scrollable container */}
                      <div className="max-h-[60vh] overflow-y-auto pb-4">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2">
                          {interests.map((i: any) => {
                            const currentInterests: any = getValues("interests") || [];
                            const isChecked = currentInterests.includes(i);
                            const isDisabled = currentInterests.length >= 7 && !isChecked;

                            return (
                              <label
                                key={i}
                                className={`flex items-center justify-center cursor-pointer
            ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                <input
                                  type="checkbox"
                                  value={i}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    let updatedInterests = [...currentInterests];
                                    if (e.target.checked) {
                                      if (currentInterests.length >= 7) {
                                        setError("interests", {
                                          type: "max",
                                          message: "Maximum 7 interests allowed"
                                        });
                                        return;
                                      }
                                      updatedInterests.push(i);
                                    } else {
                                      updatedInterests = updatedInterests.filter((item) => item !== i);
                                    }
                                    setValue("interests", updatedInterests);
                                    clearErrors("interests");
                                  }}
                                  className="hidden peer"
                                  disabled={isDisabled}
                                />
                                <span
                                  className={`border-2 border-[#dfae82] p-1 sm:p-2 rounded-md text-base sm:text-lg md:text-xl w-fit text-center 
              transition-all duration-300 
              ${isChecked ? "bg-[#dda87c] text-black" : "bg-black text-[#dfae82]"}
              ${!isDisabled ? "hover:bg-[#dfae82] hover:text-black" : ""}`}
                                >
                                  {i}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}

                  {stepQuestion === 4 && (
                    <div ref={containerRefs[6]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-1 text-center">
                        What kind of <span className="text-[#dda87c]">deals</span> excite you the <span className="text-[#dda87c]">most?</span>
                      </label>
                      <p className="text-center text-sm">Select all that apply (Max 6)</p>

                      {errors.dealPreferences && (
                        <p className="text-red-500 text-lg text-center mb-4">
                          {errors.dealPreferences.message}
                        </p>
                      )}

                      <div className="text-white text-center mb-4">
                        Selected: {(getValues("dealPreferences")?.length || 0)}/6
                      </div>

                      {/* Replace grid with flex-wrap for responsive wrapping */}
                      <div className="flex flex-wrap items-between justify-center gap-2 sm:gap-4 px-2">
                        {deals.map((deal) => {
                          const current: any = getValues("dealPreferences") || [];
                          const isChecked = current.includes(deal);
                          const isDisabled = current.length >= 6 && !isChecked;

                          return (
                            <label
                              key={deal}
                              className={`flex items-center justify-center cursor-pointer
            ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <input
                                type="checkbox"
                                value={deal}
                                checked={isChecked}
                                onChange={(e) => {
                                  let updated: any = [...current];
                                  if (e.target.checked) {
                                    if (current.length >= 6) {
                                      setError("dealPreferences", {
                                        type: "max",
                                        message: "Maximum 6 preferences allowed"
                                      });
                                      return;
                                    }
                                    updated.push(deal);
                                  } else {
                                    updated = updated.filter((item: any) => item !== deal);
                                  }
                                  setValue("dealPreferences", updated);
                                  clearErrors("dealPreferences");
                                }}
                                className="hidden peer"
                                disabled={isDisabled}
                              />
                              <span
                                className={`border-2 border-[#dfae82] p-2 sm:p-2 rounded-md text-base sm:text-lg md:text-xl w-fit text-center 
              transition-all duration-300 
              ${isChecked ? "bg-[#dda87c] text-black" : "bg-black text-[#dfae82]"}
              ${!isDisabled ? "hover:bg-[#dfae82] hover:text-black" : ""}`}
                              >
                                {deal}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}


                  {stepQuestion === 5 && (
                    <div ref={containerRefs[7]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-1 text-center">
                        What would you <span className="text-[#dda87c]">love to win</span> in a <span className="text-[#dda87c]">raffle or<br className="hidden sm:block" /> giveaway?</span>
                      </label>
                      <p className="text-center text-sm">Select all that apply (Max 6)</p>

                      {errors.giveawayPreferences && (
                        <p className="text-red-500 text-lg text-center mb-4">
                          {errors.giveawayPreferences.message}
                        </p>
                      )}

                      <div className="text-white text-center mb-4">
                        Selected: {(getValues("giveawayPreferences")?.length || 0)}/6
                      </div>

                      {/* Scrollable and wrapping layout */}
                      <div className="max-h-[60vh] overflow-y-auto pb-4">
                        <div className="flex flex-wrap items-between justify-center gap-2 sm:gap-4 px-2">
                          {giveaways.map((item) => {
                            const selected: any = getValues("giveawayPreferences") || [];
                            const isChecked: any = selected.includes(item);
                            const isDisabled = selected.length >= 6 && !isChecked;

                            return (
                              <label
                                key={item}
                                className={`flex items-center justify-center cursor-pointer
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                <input
                                  type="checkbox"
                                  value={item}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    let updated: any = [...selected];
                                    if (e.target.checked) {
                                      if (selected.length >= 6) {
                                        setError("giveawayPreferences", {
                                          type: "max",
                                          message: "Maximum 6 preferences allowed",
                                        });
                                        return;
                                      }
                                      updated.push(item);
                                    } else {
                                      updated = updated.filter((i: any) => i !== item);
                                    }
                                    setValue("giveawayPreferences", updated);
                                    clearErrors("giveawayPreferences");
                                  }}
                                  className="hidden peer"
                                  disabled={isDisabled}
                                />
                                <span
                                  className={`border-2 border-[#dfae82] p-2 sm:p-2 rounded-md text-base sm:text-lg md:text-xl w-fit text-center 
                transition-all duration-300 
                ${isChecked ? "bg-[#dda87c] text-black" : "bg-black text-[#dfae82]"}
                ${!isDisabled ? "hover:bg-[#dfae82] hover:text-black" : ""}`}
                                >
                                  {item}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}


                  {stepQuestion === 6 && (
                    <div ref={containerRefs[8]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                        How often do you engage with <br className="hidden sm:block" /> reward platforms?
                      </label>

                      {rewardPlatformFrequencyOptions.map((r) => (
                        <label
                          key={r}
                          className="flex items-center justify-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={r}
                            {...register("rewardPlatformFrequency")}
                            className="hidden peer"
                          />
                          <span
                            className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black peer-checked:transition-none hover:bg-[#523d2b] hover:text-black"
                          >
                            {r}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {stepQuestion === 7 && (
                    <div ref={containerRefs[9]} className="space-y-2">
                      <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                        How would you like to receive <br className="hidden sm:block" /> notifications?
                      </label>

                      {notificationPreferenceOptions.map((n) => (
                        <label
                          key={n}
                          className="flex items-center justify-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={n}
                            {...register("notificationPreference")}
                            className="hidden peer"
                          />
                          <span
                            className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black peer-checked:transition-none hover:bg-[#523d2b] hover:text-black"
                          >
                            {n}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="flex flex-col justify-center items-center m-4 sm:m-6">
                <button
                  type="button"
                  onClick={step === 3 ? preferenceNext : handleNext}
                  className={`${step >= 3 ? "w-full sm:w-90" : "w-full"} bg-[#523d2b] hover:bg-[#c78a63] text-white px-6 py-2 rounded-lg shadow cursor-pointer `}
                >
                  {step === 3 && stepQuestion < 7 ? "Next Question" : step === 3 ? "Continue to Payment" : "Continue"}
                </button>
                <div className="w-full sm:w-auto mt-8 flex justify-start">
                  {step > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="flex items-center gap-2 text-[#dda87c] border border-[#dda87c] px-3 py-1 rounded-md text-sm sm:text-base hover:bg-[#dda87c]/10 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      Go Back
                    </button>
                  )}
                </div>
                {step === 3 && (
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="text-sm text-[#c78a63] mt-2"
                  >
                    Skip for now
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div ref={containerRefs[10]} className="p-4 text-white text-center">
                <h2 className="text-2xl sm:text-3xl mb-4">Payment Information</h2>
                <p className="mb-6">Payment form would go here</p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full sm:w-90 px-6 py-2 rounded-lg shadow transition-all duration-300
    ${isLoading
                      ? "bg-[#b08b6c] text-white opacity-70 cursor-not-allowed"
                      : "bg-[#523d2b] hover:bg-[#c78a63] text-white cursor-pointer"
                    }`}
                >
                  {isLoading ? "Registering..." : "Complete Registration"}
                </button>


              </div>
            </form>
          )}

          <div className="absolute bottom-0 right-0 m-4 hidden md:flex gap-24">
            <Star height="h-14" width="w-1" />
            <Star width="w-1" height="h-24" />
          </div>


        </div>
      </div>

      <img src="/images/grad.avif" alt="" className="absolute bottom-0 left-0 " />

    </main>
  );
};

export default UserOnBoard;