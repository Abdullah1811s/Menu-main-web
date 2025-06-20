/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { User, Mail, Lock, Phone, EyeOff, Eye, Globe, CreditCard, Banknote, MapPin, FileText, Briefcase, Hash, Upload, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import gsap from "gsap";
import Star from "@/components/custom_components/Star";
import axios from "axios";
import toast from "react-hot-toast";

const countries = [
    { code: "+27", name: "SA" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+91", name: "IN" },
    { code: "+971", name: "UAE" },
    { code: "+234", name: "NG" },
];

const provinces = [
    { name: "Eastern Cape", cities: ["Gqeberha (Port Elizabeth)", "East London", "Mthatha", "Queenstown", "Grahamstown", "King William's Town"] },
    { name: "Free State", cities: ["Bloemfontein", "Welkom", "Bethlehem", "Sasolburg", "Parys", "Kroonstad"] },
    { name: "Gauteng", cities: ["Johannesburg", "Pretoria", "Sandton", "Midrand", "Centurion", "Soweto", "Benoni", "Boksburg", "Kempton Park", "Alberton", "Vanderbijlpark"] },
    { name: "KwaZulu-Natal", cities: ["Durban", "Pietermaritzburg", "Richards Bay", "Newcastle", "Pinetown", "Umhlanga", "Ballito", "Margate"] },
    { name: "Limpopo", cities: ["Polokwane", "Tzaneen", "Mokopane", "Thohoyandou", "Bela-Bela", "Lephalale"] },
    { name: "Mpumalanga", cities: ["Mbombela (Nelspruit)", "Witbank (eMalahleni)", "Middelburg", "Secunda", "Barberton", "Sabie"] },
    { name: "Northern Cape", cities: ["Kimberley", "Upington", "Springbok", "De Aar", "Kuruman", "Colesberg"] },
    { name: "North West", cities: ["Mahikeng", "Rustenburg", "Klerksdorp", "Potchefstroom", "Brits", "Lichtenburg"] },
    { name: "Western Cape", cities: ["Cape Town", "Stellenbosch", "George", "Paarl", "Worcester", "Mossel Bay", "Knysna"] },
];

const promotionPlatforms = [
    "Instagram",
    "TikTok",
    "Facebook",
    "YouTube",
    "Twitter/X",
    "WhatsApp Broadcast Groups",
    "Blogs / Websites",
    "Other"
];

const audienceReach = [
    "Under 5,000",
    "5,001 – 20,000",
    "20,001 – 50,000",
    "50,001 – 100,000",
    "Over 100,000"
];

const brandAffiliationOptions = [
    "Yes",
    "No",
    "Planning to start soon"
];

const contentTypes = [
    "Lifestyle",
    "Fashion / Beauty",
    "Food & Drink",
    "Travel & Experiences",
    "Comedy / Entertainment",
    "Business / Finance",
    "Family & Parenting",
    "Fitness & Health",
    "Reviews & Product Drops",
    "Inspirational / Motivational"
];

const affiliateGoals = [
    "Earn recurring commissions",
    "Promote latest brands",
    "Gain first access to vendor deals",
    "Collaborate with top vendors",
    "Get featured by The Menu",
    "Access sponsored trade campaigns",
    "Build influence in a niche market",
    "Lead giveaways & raffles"
];

const brandTypes = [
    "Local / Township Businesses",
    "Health & Wellness",
    "Fashion & Beauty",
    "Food & Beverage",
    "Tech & Gadgets",
    "Auto / Transport",
    "Entertainment / Lifestyle",
    "High-End / Luxury",
    "Education & Training"
];

const campaignFrequency = [
    "Daily",
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Ad hoc, based on campaign fit"
];

const featuredOptions = [
    "Yes",
    "No",
    "Depends on campaign type"
];

const AffiliateSchema = z.object({
    // Personal Information
    name: z.string().min(2, "Name must be at least 2 characters"),
    surname: z.string().min(2, "Surname must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),
    countryCode: z.string().optional(),

    // Business Information - All made optional
    affiliateType: z.enum(["individual", "business"], {
        required_error: "Please select affiliate type"
    }),
    businessName: z.string()

        .optional(),
    tradingAddress: z.string()

        .optional(),
    province: z.string()

        .optional(),
    city: z.string()

        .optional(),
    companyRegistrationNumber: z.string().optional(),
    vatNumber: z.string().optional(),
    businessContactNumber: z.string().optional(),
    businessEmail: z.union([
        z.string().email("Invalid business email"),
        z.literal(""),
        z.undefined()
    ]).optional(),


    // Banking Information
    bankName: z.string().min(2, "Bank name must be at least 2 characters"),
    accountHolder: z.string().min(2, "Account holder name must be at least 2 characters"),
    accountNumber: z.string()
        .min(5, "Account number must be at least 5 digits")
        .max(20, "Account number cannot exceed 20 digits"),
    branchCode: z.string()
        .min(4, "Branch code must be at least 4 digits")
        .max(10, "Branch code cannot exceed 10 digits"),

    // Password
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
    idNumber: z.string().optional(),

    // Marketing Information - All optional
    promotionPlatforms: z.array(z.string()).max(7).optional().nullable(),
    audienceReach: z.string().optional().nullable(),
    brandAffiliationOptions: z.string().optional().nullable(),
    contentTypes: z.array(z.string()).max(5, "Maximum 5 content types allowed").optional().nullable(),
    affiliateGoals: z.array(z.string()).max(5, "Maximum 5 goals allowed").optional().nullable(),
    existingAffiliation: z.string().optional().nullable(),
    preferredBrands: z.array(z.string()).max(5, "Maximum 5 brand types allowed").optional().nullable(),
    sharingFrequency: z.string().optional().nullable(),
    openToFeatures: z.string().optional().nullable(),
    campaignFrequency: z.string().optional().nullable(),
    featuredOptions: z.string().optional().nullable(),
    brandTypes: z.array(z.string()).max(5, "Maximum 5 allowed").optional().nullable(),


    // Terms
    agreedToTerms: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the terms" })
    }),

    // Bank Statement
    bankStatement: z
        .any()
        .optional()
        .nullish()
        .transform(val => {
            if (!val) return null;
            if (val instanceof File) {
                if (val.size > 5 * 1024 * 1024) return null; // Silently ignore if too large
                if (!['application/pdf', 'image/png', 'image/jpeg'].includes(val.type)) return null; // Silently ignore if wrong type
                return val;
            }
            return null;
        }),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    })
    .refine(data => {
        // Only require business fields if affiliate type is "business"
        if (data.affiliateType === "business") {
            return data.businessName &&
                data.tradingAddress &&
                data.province &&
                data.city;
        }
        return true;
    }, {
        message: "Business details are required for business affiliates",
        path: ["businessName"],
    });
type AffiliateForm = z.infer<typeof AffiliateSchema>;

const AffiliateOnBoard = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [, setRotate] = useState(false);
    const [step, setStep] = useState<number>(1);
    const [stepQuestion, setStepQuestion] = useState<number>(1);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>("+27");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [selectedProvince, setSelectedProvince] = useState<string>("");
    const containerRefs = Array(11).fill(0).map(() => useRef<HTMLDivElement>(null));

    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        // setError,
        // clearErrors,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AffiliateForm>({
        resolver: zodResolver(AffiliateSchema),
        defaultValues: {
            promotionPlatforms: [],
            audienceReach: null,
            brandAffiliationOptions: null,
            contentTypes: [],
            affiliateGoals: [],
            existingAffiliation: null,
            bankStatement: null,
            preferredBrands: [],
            sharingFrequency: null,
            openToFeatures: null,
            campaignFrequency: null,
            featuredOptions: null,
            brandTypes: [],
        },
    });

    const formData = watch();
    // const affiliateType = watch("affiliateType");
    // const cityOptions = selectedProvince ?
    //     provinces.find(p => p.name === selectedProvince)?.cities || []
    //     : [];
    const handleNext = async () => {
        setRotate(true);

        try {
            if (step === 1) {
                // Validate personal information
                const valid = await trigger([
                    "name",
                    "surname",
                    "email",
                    "phone"
                ]);
                if (valid) setStep(2);
            }
            else if (step === 2) {
                // First validate that affiliateType is selected
                const typeValid = await trigger(["affiliateType"]);
                if (!typeValid) return;

                // Get current form values
                const formValues = getValues();

                if (formValues.affiliateType === "business") {
                    // Clear idNumber for business type
                    setValue("idNumber", "");

                    // Validate business fields if type is business
                    const businessValid = await trigger([
                        "businessName",
                        "tradingAddress",
                        "province",
                        "city"
                    ]);
                    if (businessValid) setStep(3);
                } else {
                    setValue("businessName", "");
                    setValue("tradingAddress", "");
                    setValue("province", "");
                    setValue("city", "");
                    setValue("companyRegistrationNumber", "");
                    setValue("vatNumber", "");
                    setValue("businessContactNumber", "");
                    setValue("businessEmail", "");

                    const individualValid = await trigger(["idNumber"]);

                    if (individualValid) setStep(3);
                }
            }
            else if (step === 3) {
                // Validate banking information
                const valid = await trigger([
                    "bankName",
                    "accountHolder",
                    "branchCode"
                    // accountNumber is not required in step 3 per requirements
                ]);
                if (valid) setStep(4);
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    // const handlePrevious = () => {
    //     if (step > 1) setStep(step - 1);
    // };

    const handleStepClick = async (stepNumber: number) => {
        try {
            if (stepNumber < step) {
                // Always allow going back to previous steps
                setStep(stepNumber);
            } else if (stepNumber > step) {
                // Validate current step before proceeding forward
                if (step === 1) {
                    // Validate personal information
                    const valid = await trigger(["name", "surname", "email", "phone"]);
                    if (valid) setStep(stepNumber);
                }
                else if (step === 2) {
                    // First validate that affiliateType is selected
                    const typeValid = await trigger(["affiliateType"]);
                    if (!typeValid) return;

                    // Get current form values
                    const formValues = getValues();

                    if (formValues.affiliateType === "business") {
                        // Validate business fields if type is business
                        const businessValid = await trigger([
                            "businessName",
                            "tradingAddress",
                            "province",
                            "city"
                        ]);
                        if (businessValid) setStep(stepNumber);
                    } else {
                        // Validate individual field
                        setValue("businessName", "");
                        setValue("tradingAddress", "");
                        setValue("province", "");
                        setValue("city", "");
                        setValue("companyRegistrationNumber", "");
                        setValue("vatNumber", "");
                        setValue("businessContactNumber", "");
                        setValue("businessEmail", "");

                        const individualValid = await trigger(["idNumber"]);

                        if (individualValid) setStep(3);
                    }
                }
                else if (step === 3) {
                    // Validate banking information
                    const valid = await trigger([
                        "bankName",
                        "accountHolder",
                        "branchCode"
                    ]);
                    if (valid) setStep(stepNumber);
                }
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    const preferenceNext = () => {
        if (stepQuestion < 8) {
            setStepQuestion((s: number) => s + 1);
        } else {
            setStep((s) => s + 1);
        }
    };

    const onSubmit = async (data: AffiliateForm) => {
        console.log("The form is being submitted");
        console.log("the data is ", data);
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_URL}/affiliate/sign-up`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            // Handle successful response
            

        } catch (error: any) {
            console.error("Signup error:", error);

            let errorMessage = "Registration failed. Please try again.";

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                if (error.response) {
                    // Server responded with a status code outside 2xx
                    errorMessage = error.response.data?.message ||
                        error.response.data?.error ||
                        `Server responded with status ${error.response.status}`;
                } else if (error.request) {
                    // Request was made but no response received
                    errorMessage = "No response received from server. Please try again.";
                } else {
                    // Something happened in setting up the request
                    errorMessage = "Request setup error. Please check your input.";
                }
            } else {
                // Handle non-Axios errors
                errorMessage = error.message || "An unexpected error occurred.";
            }

            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

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
        if ((step >= 1 && step <= 4) || (step === 4 && stepQuestion >= 1 && stepQuestion <= 7)) {
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
    }, [step, stepQuestion]);

    return (
        <main className="w-full min-h-screen flex flex-col items-center relative overflow-hidden">
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
                    {[1, 2, 3, 4, 5].map((s, index) => (
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
                                    {
                                        s === 1
                                            ? "Personal Info"
                                            : s === 2
                                                ? "Business"
                                                : s === 3
                                                    ? "Banking"
                                                    : s === 4
                                                        ? "Preferences"
                                                        : "Password"

                                    }
                                </div>
                            </div>
                            {index < 4 && (
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
                    <span className={step === 2 ? "text-[#dda87c] font-medium" : ""}>Business</span>
                    <span>•</span>
                    <span className={step === 3 ? "text-[#dda87c] font-medium" : ""}>Banking</span>
                    <span>•</span>
                    <span className={step === 4 ? "text-[#dda87c] font-medium" : ""}>Preferences</span>
                    <span>•</span>
                    <span className={step === 4 ? "text-[#dda87c] font-medium" : ""}>Payment</span>
                    <span>•</span>
                </div>
            </nav>

            <div ref={containerRefs[0]} className="h-full w-[6]  flex items-center justify-center z-20">
                <div
                    className={`w-full  px-10   sm:px-10 py-1 rounded-sm h-fit ${step === 4
                        ? "bg-transparent shadow-none w-full"
                        : "bg-[#181818] shadow-[0_0_10px_2px_#dda87c]"
                        }`}
                >
                    {step != 4 && (
                        <div className="flex flex-col items-center justify-center p-4">
                            <div className="bg-[#1c1c1c] shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] rounded-lg p-2">
                                <img src="/images/wheel.png" alt="" className="object-contain w-full max-w-[200px] mx-auto" />
                            </div>
                            <div className="mt-4 text-2xl sm:text-3xl text-center">
                                <p className="text-white font-medium">Let's Get You On Board</p>
                                <div className="flex items-center justify-center gap-3 mt-1">
                                    <div className="flex-1 h-px bg-[#d19f76] max-w-[100px]" />
                                    <p className="text-[#d19f76] text-sm sm:text-base whitespace-nowrap">
                                        {
                                            step === 1
                                                ? "Personal Information"
                                                : step === 2
                                                    ? "Business Details"
                                                    : step === 3
                                                        ? "Banking"
                                                        : step === 4
                                                            ? "Preference"
                                                            : "Set up Password"
                                        }

                                    </p>
                                    <div className="flex-1 h-px bg-[#d19f76] max-w-[100px]" />
                                </div>
                            </div>
                        </div>
                    )}
                    {step < 5 ? (
                        <>
                            {step === 1 && (
                                <div
                                    ref={containerRefs[1]}
                                    className="space-y-4 sm:space-y-4 flex flex-col items-center justify-center"
                                >
                                    {/* Name */}
                                    <div className="w-90 max-w-md">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("name")}
                                                defaultValue={formData.name || ""}
                                                placeholder="Enter your Name"
                                                className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>
                                        <div className=" mt-1">
                                            {errors.name && (
                                                <p className="text-red-500 text-xs">{errors.name.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Surname */}
                                    <div className="w-90 max-w-md">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("surname")}
                                                defaultValue={formData.surname || ""}
                                                placeholder="Enter your Surname"
                                                className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>
                                        <div className=" mt-1">
                                            {errors.surname && (
                                                <p className="text-red-500 text-xs">{errors.surname.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="w-90 max-w-md group relative">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("email")}
                                                defaultValue={formData.email || ""}
                                                placeholder="Enter your Email"
                                                className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {/* Tooltip */}
                                            <div className="absolute left-0 -top-8 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                We will send all future details to this email
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            {errors.email && (
                                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>


                                    {/* Phone Number Section */}
                                    <div className="w-90 max-w-md space-y-4">
                                        {/* Country Selector */}
                                        <div>
                                            <div className="relative">
                                                <select
                                                    {...register("countryCode")}
                                                    value={selectedCountry}
                                                    onChange={(e) => {
                                                        setSelectedCountry(e.target.value);
                                                        setValue("countryCode", e.target.value); // <-- updates form state
                                                    }}
                                                    className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] appearance-none"
                                                >
                                                    {countries.map((country) => (
                                                        <option key={country.code} value={country.code}>
                                                            {country.name} ({country.code})
                                                        </option>
                                                    ))}
                                                </select>

                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Phone Number Input */}
                                        <div>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                <input
                                                    {...register("phone")}
                                                    defaultValue={formData.phone || ""}
                                                    placeholder="Phone Number"
                                                    className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                />
                                            </div>
                                            <div className=" mt-1">
                                                {errors.phone && (
                                                    <p className="text-red-500 text-xs">{errors.phone.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {step === 2 && (
                                <div ref={containerRefs[2]} className="space-y-3 sm:space-y-3 flex flex-col items-center justify-center overflow-y-auto h-fit">
                                    {/* Affiliate Type Selection */}
                                    <div className="w-90 max-w-md px-4 sm:px-0">
                                        <h3 className="text-white text-lg font-medium mb-2">Are you registering as:</h3>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setValue("affiliateType", "individual")}
                                                className={`px-4 py-2 rounded-sm ${watch("affiliateType") === "individual" ? 'bg-[#d19f76] text-black' : 'bg-[#0d0d0d] text-white border border-[#d19f76]'}`}
                                            >
                                                Individual
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("affiliateType", "business")}
                                                className={`px-4 py-2 rounded-sm ${watch("affiliateType") === "business" ? 'bg-[#d19f76] text-black' : 'bg-[#0d0d0d] text-white border border-[#d19f76]'}`}
                                            >
                                                Business
                                            </button>
                                        </div>
                                        <input type="hidden" {...register("affiliateType")} />

                                        {/* Show message when no type is selected */}
                                        {!watch("affiliateType") && (
                                            <p className="mt-3 text-gray-400 text-sm">
                                                Please select whether you're registering as an individual or a business to continue.
                                            </p>
                                        )}
                                    </div>

                                    {/* Only show fields after a type is selected */}
                                    {watch("affiliateType") && (
                                        watch("affiliateType") === "business" ? (
                                            <div className="w-90 space-y-2 px-4 sm:px-0 overflow-y-auto h-fit">
                                                {/* Business Name and Registration Number */}
                                                <div className="flex flex-col md:flex-row gap-2 p-2">
                                                    <div className="relative flex-1">
                                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            {...register("businessName", { required: "Business name is required" })}
                                                            placeholder="Business Name"
                                                            className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                        />
                                                        {errors.businessName && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.businessName.message}</p>
                                                        )}
                                                    </div>

                                                    <div className="relative flex-1">
                                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            {...register("companyRegistrationNumber", { required: "Registration number is required" })}
                                                            placeholder="Registration Number"
                                                            className="w-full bg-[#0d0d0d] p-2 text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                        />
                                                        {errors.companyRegistrationNumber && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.companyRegistrationNumber.message}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* VAT Number and Trading Address */}
                                                <div className="flex flex-col md:flex-row gap-2 p-2">
                                                    <div className="relative flex-1">
                                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            {...register("vatNumber")}
                                                            placeholder="VAT Number (optional)"
                                                            className="w-full bg-[#0d0d0d] p-2 text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                        />
                                                        {errors.vatNumber && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.vatNumber.message}</p>
                                                        )}
                                                    </div>

                                                    <div className="relative flex-1">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            {...register("tradingAddress", { required: "Trading address is required" })}
                                                            placeholder="Trading Address"
                                                            className="w-full bg-[#0d0d0d] p-2 text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                        />
                                                        {errors.tradingAddress && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.tradingAddress.message}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Province and City */}
                                                <div className="flex flex-col sm:flex-row gap-2 p-2">
                                                    <div className="relative flex-1">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                                                        <select
                                                            {...register("province", { required: "Province is required" })}
                                                            onChange={(e) => {
                                                                setValue("province", e.target.value);
                                                                setValue("city", ""); // Reset city when province changes
                                                            }}
                                                            className="w-full p-2 bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] appearance-none"
                                                        >
                                                            <option value="">Select Province</option>
                                                            {provinces.map((province) => (
                                                                <option key={province.name} value={province.name}>
                                                                    {province.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.province && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.province.message}</p>
                                                        )}
                                                    </div>
                                                    <div className="relative flex-1">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                                                        <select
                                                            {...register("city", { required: "City is required" })}
                                                            disabled={!watch("province")}
                                                            className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] appearance-none disabled:opacity-50"
                                                        >
                                                            <option value="">Select City</option>
                                                            {watch("province") &&
                                                                provinces.find(p => p.name === watch("province"))?.cities.map((city) => (
                                                                    <option key={city} value={city}>
                                                                        {city}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                        {errors.city && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.city.message}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact Info */}
                                                <div className="flex flex-col md:flex-row gap-2 p-2">
                                                    <div className="relative flex-1">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            {...register("businessContactNumber", { required: "Contact number is required" })}
                                                            placeholder="Contact Number"
                                                            className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                        />
                                                        {errors.businessContactNumber && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.businessContactNumber.message}</p>
                                                        )}
                                                    </div>

                                                    <div className="relative flex-1">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            {...register("businessEmail", {
                                                                required: "Business email is required",
                                                                pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    message: "Invalid email address"
                                                                }
                                                            })}
                                                            placeholder="Business Email"
                                                            className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                        />
                                                        {errors.businessEmail && (
                                                            <p className="mt-1 text-red-500 text-xs">{errors.businessEmail.message}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Individual Registration Fields */
                                            <div className="w-full max-w-md px-4 py-2 sm:px-0">
                                                <div className="relative">
                                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                    <input
                                                        {...register("idNumber", { required: "ID number is required" })}
                                                        placeholder="ID Number"
                                                        className="w-full bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                    />
                                                    {errors.idNumber && (
                                                        <p className="mt-1 text-red-500 text-xs">{errors.idNumber.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}


                            {step === 3 && (
                                <div ref={containerRefs[3]} className="space-y-2  w-full px-1 sm:px-0  max-w-md mx-auto h-[300px] overflow-y-auto flex flex-col items-center">
                                    <h3 className="text-white text-lg font-medium mb-2 self-start">Banking Information</h3>

                                    {/* Bank Name */}
                                    <div className="relative ">
                                        <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            {...register("bankName")}
                                            placeholder="Bank Name"
                                            className="w-80 bg-[#0d0d0d]  text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                        />
                                        {errors.bankName && (
                                            <p className="absolute  mt-1 mb-1 text-red-500 text-xs">{errors.bankName.message}</p>
                                        )}
                                    </div>

                                    {/* Account Holder Name */}
                                    <div className="relative mt-4">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            {...register("accountHolder")}
                                            placeholder="Account Holder Name"
                                            className="w-80 bg-[#0d0d0d]  text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                        />
                                        {errors.accountHolder && (
                                            <p className="absolute mt-1 text-red-500 text-xs">{errors.accountHolder.message}</p>
                                        )}
                                    </div>

                                    {/* Account Number */}
                                    <div className="relative mt-4">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            {...register("accountNumber")}
                                            placeholder="Account Number"
                                            className="w-80 bg-[#0d0d0d]  text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                        />
                                        {errors.accountNumber && (
                                            <p className="absolute mt-1 text-red-500 text-xs">{errors.accountNumber.message}</p>
                                        )}
                                    </div>

                                    {/* Branch Code */}
                                    <div className="relative mt-2">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            {...register("branchCode")}
                                            placeholder="Branch Code"
                                            className="w-80 bg-[#0d0d0d] text-white pl-10 pr-4 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                        />
                                        {errors.branchCode && (
                                            <p className="absolute mt-1 text-red-500 text-xs">{errors.branchCode.message}</p>
                                        )}
                                    </div>

                                    {/* Bank Statement Upload */}
                                    <div className="relative mt-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Upload Bank Statement (PDF or Image)
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full p-4 h-22 border-2 border-dashed rounded-sm border-[#d19f76] bg-[#0d0d0d] cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
                                                    <Upload className="w-6 h-6  mb-2 sm:mb-3 text-[#d19f76]" />
                                                    <p className="mb-1 sm:mb-2 text-xs  text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden w-full"
                                                    accept=".pdf,.png,.jpg,.jpeg"
                                                    {...register("bankStatement")}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setValue("bankStatement", file || null);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        {errors.bankStatement && (
                                            <p className="mt-1 text-red-500 text-xs">{errors.bankStatement.message}</p>
                                        )}

                                        {/* Preview Link */}
                                        <div className="flex items-center justify-between">
                                            {watch("bankStatement") && (
                                                <div className="mt-2">
                                                    <a
                                                        href={watch("bankStatement") ? URL.createObjectURL(watch("bankStatement")!) : undefined}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#d19f76] hover:underline text-sm flex items-center"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Preview uploaded file
                                                    </a>
                                                </div>
                                            )}
                                            {watch("bankStatement") && (
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("bankStatement", null)}
                                                    className="text-red-500 mt-2 hover:text-red-400 text-sm flex items-center"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <>
                                    {stepQuestion === 1 && (
                                        <div ref={containerRefs[5]} className="space-y-4 w-full px-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-2 text-center">
                                                What platforms do your <span className="text-[#dda87c]">customers<br className="sm:hidden" /> engage</span> you through?
                                            </label>

                                            {errors.promotionPlatforms && (
                                                <p className="text-red-500 text-lg text-center mb-4">
                                                    {errors.promotionPlatforms.message}
                                                </p>
                                            )}
                                            {/* Two-row layout matching the image */}
                                            <div className="flex flex-col items-center gap-4 mt-4">
                                                {/* First row - 5 items */}
                                                <div className="flex flex-wrap justify-center gap-3 sm:gap-3 mx-2">
                                                    {promotionPlatforms.slice(0, 5).map((i) => {
                                                        const currentInterests: any = getValues("promotionPlatforms") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        return (
                                                            <label
                                                                key={i}
                                                                className="cursor-pointer m-1 sm:m-0"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    className="hidden peer"
                                                                    {...register("promotionPlatforms")}
                                                                />
                                                                <span
                                                                    className={`border-2 rounded-md px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${isChecked
                                                                            ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                            : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                        }
                  hover:bg-[#dda87c] hover:text-black`}
                                                                >
                                                                    {i}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>

                                                {/* Second row - remaining items */}
                                                {promotionPlatforms.length > 5 && (
                                                    <div className="flex flex-wrap justify-center gap-3 sm:gap-3 mt-2 sm:mt-4 mb-2 sm:mb-4 mx-2">
                                                        {promotionPlatforms.slice(5).map((i) => {
                                                            const currentInterests: any = getValues("promotionPlatforms") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className="cursor-pointer m-1 sm:m-0"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        className="hidden peer"
                                                                        {...register("promotionPlatforms")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium
                    transition-all duration-300 whitespace-nowrap
                    ${isChecked
                                                                                ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                                : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                            }
                    hover:bg-[#dda87c] hover:text-black`}
                                                                    >
                                                                        {i}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {stepQuestion === 2 && (
                                        <div ref={containerRefs[3]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                                                What is your <br /> <span className="text-[#dda87c]">
                                                    Estimated Audience Reach?
                                                </span>
                                            </label>

                                            {audienceReach.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("audienceReach")}
                                                        className="hidden peer"
                                                    />
                                                    <span
                                                        className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black hover:bg-[#523d2b] hover:text-black"
                                                    >
                                                        {a}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {stepQuestion === 3 && (
                                        <div ref={containerRefs[5]} className="space-y-4 w-full px-2 sm:px-0">
                                            <label className="block font-medium text-white text-2xl sm:text-3xl md:text-4xl mb-2 text-center">
                                                What platforms do your <span className="text-[#dda87c]">customers<br className="sm:hidden" /> engage</span> you through?
                                            </label>
                                            <p className="text-center text-sm md:text-base  text-white md:mb-4">Select all that apply (Max 5)</p>
                                            {errors.contentTypes && (
                                                <p className="text-red-500 text-base sm:text-lg text-center mb-4">
                                                    {errors.contentTypes.message}
                                                </p>
                                            )}
                                            {/* Three-row layout matching the image */}
                                            <div className="flex flex-col items-center gap-2 sm:gap-4 px-2 sm:px-4 md:mt-4">
                                                {/* First row - 4 items */}
                                                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                                                    {contentTypes.slice(0, 4).map((i) => {
                                                        const currentInterests: any = getValues("contentTypes") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        const isDisabled = !isChecked && currentInterests.length >= 5;

                                                        return (
                                                            <label
                                                                key={i}
                                                                className={`cursor-pointer m-1 sm:m-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    disabled={isDisabled}
                                                                    className="hidden peer"
                                                                    {...register("contentTypes")}
                                                                />
                                                                <span
                                                                    className={`border-2 rounded-md px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${isChecked
                                                                            ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                            : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                        }
                  hover:bg-[#dda87c] hover:text-black`}
                                                                >
                                                                    {i}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>

                                                {/* Second row - 3 items */}
                                                {contentTypes.length > 4 && (
                                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-1 sm:mt-2 md:mt-4">
                                                        {contentTypes.slice(4, 7).map((i) => {
                                                            const currentInterests: any = getValues("contentTypes") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            const isDisabled = !isChecked && currentInterests.length >= 5;

                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className={`cursor-pointer m-1 sm:m-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        disabled={isDisabled}
                                                                        className="hidden peer"
                                                                        {...register("contentTypes")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-medium
                    transition-all duration-300 whitespace-nowrap
                    ${isChecked
                                                                                ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                                : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                            }
                    hover:bg-[#dda87c] hover:text-black`}
                                                                    >
                                                                        {i}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {/* Third row - remaining items */}
                                                {contentTypes.length > 7 && (
                                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-1 sm:mt-2 md:mt-4 mb-2 sm:mb-4">
                                                        {contentTypes.slice(7).map((i) => {
                                                            const currentInterests: any = getValues("contentTypes") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            const isDisabled = !isChecked && currentInterests.length >= 5;

                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className={`cursor-pointer m-1 sm:m-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        disabled={isDisabled}
                                                                        className="hidden peer"
                                                                        {...register("contentTypes")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-medium
                    transition-all duration-300 whitespace-nowrap
                    ${isChecked
                                                                                ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                                : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                            }
                    hover:bg-[#dda87c] hover:text-black`}
                                                                    >
                                                                        {i}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {stepQuestion === 4 && (
                                        <div ref={containerRefs[5]} className="space-y-4 w-full px-2 sm:px-0">
                                            <div className="mb-6 sm:mb-8 md:mb-10"> {/* Added margin container for heading */}
                                                <label className="block font-medium text-white text-2xl sm:text-3xl md:text-4xl mb-2 text-center">
                                                    What do you want to <span className="text-[#dda87c]">achieve</span> as a <span className="text-[#dda87c]">Menu<br className="sm:hidden" /> affiliate?</span>
                                                </label>
                                                <p className="text-center text-sm md:text-base mb-0 text-white">Select all that apply (Max 5)</p>
                                                {errors.affiliateGoals && (
                                                    <p className="text-red-500 text-base sm:text-lg text-center mt-2">
                                                        {errors.affiliateGoals.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Three-row layout for options */}
                                            <div className="flex flex-col items-center gap-3 sm:gap-4 px-2 sm:px-4">
                                                {/* First row - 4 items */}
                                                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                                                    {affiliateGoals.slice(0, 4).map((i) => {
                                                        const currentInterests: any = getValues("affiliateGoals") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        const isDisabled = !isChecked && currentInterests.length >= 5;

                                                        return (
                                                            <label
                                                                key={i}
                                                                className={`cursor-pointer m-1 sm:m-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    disabled={isDisabled}
                                                                    className="hidden peer"
                                                                    {...register("affiliateGoals")}
                                                                />
                                                                <span
                                                                    className={`border-2 rounded-md px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${isChecked
                                                                            ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                            : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                        }
                  hover:bg-[#dda87c] hover:text-black`}
                                                                >
                                                                    {i}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>

                                                {/* Second row - 3 items */}
                                                {affiliateGoals.length > 4 && (
                                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-2 sm:mt-3">
                                                        {affiliateGoals.slice(4, 7).map((i) => {
                                                            const currentInterests: any = getValues("affiliateGoals") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            const isDisabled = !isChecked && currentInterests.length >= 5;

                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className={`cursor-pointer m-1 sm:m-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        disabled={isDisabled}
                                                                        className="hidden peer"
                                                                        {...register("affiliateGoals")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-medium
                    transition-all duration-300 whitespace-nowrap
                    ${isChecked
                                                                                ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                                : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                            }
                    hover:bg-[#dda87c] hover:text-black`}
                                                                    >
                                                                        {i}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {/* Third row - remaining items */}
                                                {affiliateGoals.length > 7 && (
                                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-2 sm:mt-3 mb-2 sm:mb-4">
                                                        {affiliateGoals.slice(7).map((i) => {
                                                            const currentInterests: any = getValues("affiliateGoals") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            const isDisabled = !isChecked && currentInterests.length >= 5;

                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className={`cursor-pointer m-1 sm:m-0 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        disabled={isDisabled}
                                                                        className="hidden peer"
                                                                        {...register("affiliateGoals")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-medium
                    transition-all duration-300 whitespace-nowrap
                    ${isChecked
                                                                                ? "bg-[#dda87c] text-black border-[#dda87c]"
                                                                                : "bg-transparent text-[#dda87c] border-[#dda87c]"
                                                                            }
                    hover:bg-[#dda87c] hover:text-black`}
                                                                    >
                                                                        {i}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {stepQuestion === 5 && (
                                        <div ref={containerRefs[3]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                                                Are you <span className="text-[#dda87c]">affiliated</span> with <span className="text-[#dda87c]">any brands<br /> already?</span>
                                            </label>

                                            {brandAffiliationOptions.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("brandAffiliationOptions")}
                                                        className="hidden peer"
                                                    />
                                                    <span
                                                        className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black hover:bg-[#523d2b] hover:text-black"
                                                    >
                                                        {a}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {stepQuestion === 6 && (
                                        <div ref={containerRefs[5]} className="space-y-4 md:space-y-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <label className="block font-medium text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-2 sm:mb-4 text-center">
                                                What types of <span className='text-[#dda87c]'>brands</span> do you want to
                                                <br className="hidden sm:block" /> <span className="text-[#dda87c]">promote on The Menu?</span>
                                            </label>
                                            <p className="text-center text-sm sm:text-base mb-4 sm:mb-6 text-white/80">Select all that apply (Max 5)</p>
                                            {errors.affiliateGoals && (
                                                <p className="text-red-500 text-sm sm:text-base text-center mb-4 sm:mb-6">
                                                    {errors.affiliateGoals.message}
                                                </p>
                                            )}

                                            {/* Responsive grid layout */}
                                            <div className="mt-6 sm:mt-8 md:mt-10">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                                                    {brandTypes.map((i) => {
                                                        const selectedBrands: any = watch("brandTypes") || [];
                                                        const isChecked = selectedBrands.includes(i);
                                                        const isDisabled = !isChecked && selectedBrands.length >= 5;
                                                        return (
                                                            <label
                                                                key={i}
                                                                className={`cursor-pointer block ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    disabled={isDisabled}
                                                                    className="hidden peer"
                                                                    {...register("brandTypes", {
                                                                        validate: (value) =>
                                                                            (value && value.length <= 5) || "Maximum 5 selections allowed"
                                                                    })}
                                                                    onChange={(e) => {
                                                                        const newSelection = e.target.checked
                                                                            ? [...(selectedBrands || []), i]
                                                                            : (selectedBrands || []).filter((brand: string) => brand !== i);
                                                                        setValue("brandTypes", newSelection);
                                                                    }}
                                                                />
                                                                <span
                                                                    className={`
                                     w-full text-center
                                    border-2 rounded-lg 
                                    
                                    text-xs sm:text-sm md:text-base lg:text-lg 
                                    font-medium leading-tight
                                    transition-all duration-300 ease-in-out
                                    transform hover:scale-105
                                    min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem]
                                    flex items-center justify-center
                                    ${isChecked
                                                                            ? "bg-[#dda87c] text-black border-[#dda87c] shadow-lg shadow-[#dda87c]/25"
                                                                            : "bg-transparent text-[#dda87c] border-[#dda87c] hover:border-[#dda87c]/80"
                                                                        }
                                    ${!isDisabled ? "hover:bg-[#dda87c]/90 hover:text-black hover:shadow-md" : ""}
                                `}
                                                                >
                                                                    <span className="break-words hyphens-auto">
                                                                        {i}
                                                                    </span>
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {stepQuestion === 7 && (
                                        <div ref={containerRefs[3]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                                                Are you <span className="text-[#dda87c]">affiliated</span> with <span className="text-[#dda87c]">any brands<br /> already?</span>
                                            </label>

                                            {campaignFrequency.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("campaignFrequency")}
                                                        className="hidden peer"
                                                    />
                                                    <span
                                                        className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black hover:bg-[#523d2b] hover:text-black"
                                                    >
                                                        {a}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {stepQuestion === 8 && (
                                        <div ref={containerRefs[3]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                                                Are you <span className='text-[#dda87c]'>
                                                    open to featuring in Menu-<br /> sponsored content?
                                                </span>
                                            </label>

                                            {featuredOptions.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("featuredOptions")}
                                                        className="hidden peer"
                                                    />
                                                    <span
                                                        className="bg-black border-2 border-[#725a46] p-3 sm:p-4 rounded-md text-lg sm:text-2xl w-full sm:w-90 text-center transition-all duration-500 
                            text-[#725a46] peer-checked:bg-[#dda87c] peer-checked:text-black hover:bg-[#523d2b] hover:text-black"
                                                    >
                                                        {a}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {step === 5 && (
                                <div className="space-y-6 w-full max-w-md mx-auto">


                                    <div className="space-y-4">
                                        {/* Password Field */}
                                        <div className="relative w-full">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                {...register("password")}
                                                defaultValue={formData.password || ""}
                                                placeholder="Password"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 pr-10 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400 border border-gray-600"
                                            />
                                            <div
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#dda87c] transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 text-xs mt-1 ml-1">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div className="relative w-full">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                {...register("confirmPassword")}
                                                defaultValue={formData.confirmPassword || ""}
                                                placeholder="Confirm Password"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 pr-10 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400 border border-gray-600"
                                            />
                                            <div
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#dda87c] transition-colors"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="text-red-500 text-xs mt-1 ml-1">
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password Requirements */}
                                    <div className="bg-[#1a1a1a] p-4 rounded-md border border-gray-700 text-white">
                                        recaptcha
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col justify-center items-center m-4 sm:m-6">
                                <button
                                    type="button"
                                    onClick={step === 4 ? preferenceNext : handleNext}
                                    className={`${step >= 4 ? "w-full sm:w-90" : "w-full"} bg-[#523d2b] hover:bg-[#c78a63] text-white px-6 py-2 rounded-lg shadow cursor-pointer`}
                                >

                                    Continue
                                </button>

                                {step === 4 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(5)}
                                        className="text-sm text-[#c78a63] mt-2 cursor-pointer underline"
                                    >
                                        Skip for now
                                    </button>
                                )}

                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col">
                            <div className="space-y-6 w-full max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <p className="text-gray-400 text-sm">
                                        Keep your account secure with a strong password
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {/* Password Field */}
                                    <div className="relative w-full">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password", { required: "Password is required" })}
                                            defaultValue={formData.password || ""}
                                            placeholder="Password"
                                            className="w-full bg-[#0d0d0d] text-white px-10 py-2 pr-10 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400 border border-gray-600"
                                        />

                                        <div
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#dda87c] transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="relative w-full">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmPassword", { required: "Please confirm your password" })}
                                            defaultValue={formData.confirmPassword || ""}
                                            placeholder="Confirm Password"
                                            className="w-full bg-[#0d0d0d] text-white px-10 py-2 pr-10 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400 border border-gray-600"
                                        />

                                        <div
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#dda87c] transition-colors"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Agree to Terms Checkbox */}
                                <div className="flex items-start gap-2 mt-4 w-full max-w-md">
                                    <input
                                        type="checkbox"
                                        {...register("agreedToTerms")}
                                        id="agreedToTerms"
                                        className="mt-1 h-4 w-4 text-[#d19f76] bg-[#0d0d0d] border border-gray-600 rounded focus:ring-[#d19f76]"
                                    />
                                    <label htmlFor="agreedToTerms" className="text-sm text-white select-none">
                                        I agree to the <span className="text-[#d19f76] underline cursor-pointer">Terms and Conditions</span>
                                    </label>
                                </div>
                                {errors.agreedToTerms && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                        {errors.agreedToTerms.message}
                                    </p>
                                )}

                                <div className="bg-[#1a1a1a] p-4 rounded-md border border-gray-700 text-white">
                                    recaptcha
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={() => {
                                    console.log('Form Values:', getValues());
                                    console.log('Form Errors:', errors);
                                }}
                                className={`w-full m-4 bg-[#523d2b] hover:bg-[#c78a63] text-white px-6 py-2 rounded-lg shadow ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    )
                    }

                </div >
            </div >
            <img src="/images/grad.avif" alt="" className="absolute bottom-0 left-0 " />
            <div className="absolute bottom-0 right-10 m-4 flex gap-24">
                <Star height="h-14" width="w-1" />
                <Star width="w-1" height="h-24" />
            </div>
        </main >
    );
}




export default AffiliateOnBoard;

