import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { User, Mail, Lock, Phone, EyeOff, Eye, MapPin, Globe, CreditCard, Hash, FileText, Briefcase, Plus, Upload, Facebook, Instagram, Twitter, Music2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import gsap from "gsap";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface WheelOffer {
    name: string;
    term: string;
    type: string;
    quantity: number;
}

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
const offers = [
    "Discount Vouchers",
    "Buy One, Get One Free",
    "Cashback Rewards",
    "Service Discounts",
    "Exclusive Deals for Members",
    "Retail Gift Vouchers (Lower Value)",
    "Entertainment Offers",
    "Food & Beverage Offers",
    "Limited Stock Offers",
    "Limited-Time Flash Deals",
    "Luxury Experiences",
    "High-Value Gift Cards",
    "Exclusive VIP Packages",
    "Premium Travel Packages",
    "Electronics & Gadgets",
    "Large Cashback Offers",
    "Major Service Packages",
    "Luxury Fashion & Accessories",
    "Home & Appliance Giveaways",
    "Supercar or House Giveaways"
];
const provinces = Object.keys(provinceCities);

const productServiceCategories = [
  "Food & Beverage",
  "Fashion & Accessories",
  "Health & Beauty",
  "Fitness & Wellness",
  "Home Services / DIY",
  "Education & Training",
  "Digital / Online Services",
  "Travel / Hospitality",
  "Auto & Mechanical",
  "Spiritual / Holistic",
  "Retail Products",
  "Events & Entertainment",
  "Professional Services",
  "Other"
];



const urlObjectSchema = z.object({
    public_id: z.string().optional(),
    secure_url: z.string().url().optional(),
});

const vendorSignupSchema = z
    .object({
        businessName: z.string().min(1, "Business name is required"),
        businessType: z.string().min(1, "Business type is required"),
        companyRegNumber: z.string().min(1, "Company registration number is required"),
        vatNumber: z.string().optional(),
        tradingAddress: z.string().min(1, "Trading address is required"),
        province: z.string().min(1, "Province is required"),
        city: z.string().min(1, "City is required"),
        businessContactNumber: z.string().min(1, "Business contact number is required"),
        businessEmail: z.string().email("Invalid email address"),
        websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
        businessDescription: z.string().optional(),
        representativeName: z.string().min(1, "Representative name is required"),
        representativePosition: z.string().min(1, "Representative position is required"),
        representativeEmail: z.string().email("Invalid email"),
        representativePhone: z.string().min(1, "Representative phone is required"),


        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[a-z]/, "Must contain a lowercase letter")
            .regex(/\d/, "Must contain a number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),

        agreedToTerms: z.literal(true, {
            errorMap: () => ({ message: "You must agree to the terms" }),
        }),
        vendorTier: z.enum(["bronze", "silver", "gold"]).optional(),
        referralCodeUsed: z.string().optional(),
        vendorVoucher: z.string().optional(),

        socialMediaHandles: z
            .object({
                facebook: z.string().url().optional().or(z.literal("")),
                instagram: z.string().url().optional().or(z.literal("")),
                twitter: z.string().url().optional().or(z.literal("")),
                tiktok: z.string().url().optional().or(z.literal("")),
            })
            .optional(),

        raffleOffer: z
            .object({
                type: z.string().optional(),
                offerings: z
                    .array(
                        z.object({
                            terms: z.string().optional(),
                            name: z.string().min(1),
                            quantity: z.number().optional(),
                            endDate: z.coerce.date().optional(),
                        })
                    )
                    .optional(),
            })
            .optional(),

        companyRegistrationCertificateURl: urlObjectSchema.optional(),
        vendorIdURl: urlObjectSchema.optional(),
        addressProofURl: urlObjectSchema.optional(),
        confirmationLetterURl: urlObjectSchema.optional(),
        businessPromotionalMaterialURl: urlObjectSchema.optional(),

        productServiceCategories: z
            .array(
                z.enum([
                    "Food & Beverage",
                    "Fashion & Accessories",
                    "Health & Beauty",
                    "Fitness & Wellness",
                    "Home Services / DIY",
                    "Education & Training",
                    "Digital / Online Services",
                    "Travel / Hospitality",
                    "Auto & Mechanical",
                    "Spiritual / Holistic",
                    "Retail Products",
                    "Events & Entertainment",
                    "Professional Services",
                    "Other",
                ])
            )
            .max(4, "You can select up to 4 categories")
            .optional(),

        businessPresence: z
            .enum(["Physical store only", "Online only", "Both"])
            .optional(),

        customerEngagementPlatforms: z
            .array(
                z.enum([
                    "In-store",
                    "WhatsApp",
                    "Instagram / Facebook",
                    "Website / eCommerce",
                    "Phone / SMS Orders",
                    "TikTok or YouTube",
                    "Other",
                ])
            )
            .optional(),

        preferredPromotionTypes: z
            .array(
                z.enum([
                    "Discounts / Coupons",
                    "Flash Deals (Limited Time)",
                    "Giveaways or Raffles",
                    "Combo Deals (e.g. 2-for-1)",
                    "Loyalty Stamps (e.g. Buy 5, Get 1 Free)",
                    "First-Time User Rewards",
                    "Exclusive Menu Member Offers",
                    "Trade Promotions",
                    "Spin the Wheel Participation",
                ])
            )
            .optional(),

        typicalDealValue: z
            .enum([
                "Under R50",
                "R51–R100",
                "R101–R250",
                "Over R250",
                "Depends on offer type.",
            ])
            .optional(),

        offerFrequency: z
            .enum(["Daily", "Weekly", "Monthly", "Occasionally / On-Demand"])
            .optional(),

        businessGoalsOnMenu: z
            .array(
                z.enum([
                    "Increase brand visibility.",
                    "Drive foot traffic / online orders.",
                    "Gain repeat customers.",
                    "Take part in trade promotions.",
                    "Evaluate latest offers.",
                    "Get insights / analytics.",
                    "Collaborate with affiliates.",
                    "Grow in township markets.",
                    "Reach new customer segments.",
                ])
            )
            .optional(),
    })


    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type PartnerForm = z.infer<typeof vendorSignupSchema>;

const PartnerOnBoard = () => {
    const [rotate, setRotate] = useState(false);
    const [step, setStep] = useState<number>(1);
    const [stepQuestion, setStepQuestion] = useState<number>(1);
    const [selectedCountry, setSelectedCountry] = useState<string>("+27");
    const containerRefs = Array(11).fill(0).map(() => useRef<HTMLDivElement>(null));
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [wheelOffers, setWheelOffers] = useState<WheelOffer[]>([
        { name: '', term: '', type: '', quantity: 0 },
    ]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingOfferIndex, setEditingOfferIndex] = useState(-1);
    const [editingOffer, setEditingOffer] = useState<WheelOffer>({
        name: '',
        term: '',
        type: '',
        quantity: 0
    });

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
    } = useForm<PartnerForm>({
        resolver: zodResolver(vendorSignupSchema),
        defaultValues: {
            businessName: "",
            businessType: "",
            companyRegNumber: "",
            tradingAddress: "",
            province: "",
            city: "",
            businessContactNumber: "",
            businessEmail: "",
            representativeName: "",
            representativePosition: "",
            representativeEmail: "",
            representativePhone: "",
            password: "",
            vatNumber: "",
            websiteUrl: "",
            businessDescription: "",
            referralCodeUsed: "",
            vendorVoucher: "",
            vendorTier: undefined,
            businessPresence: undefined,
            typicalDealValue: undefined,
            offerFrequency: undefined,
            productServiceCategories: [],
            customerEngagementPlatforms: [],
            preferredPromotionTypes: [],
            businessGoalsOnMenu: [],
            socialMediaHandles: {
                facebook: "",
                instagram: "",
                twitter: "",
                tiktok: "",
            },
            raffleOffer: {
                type: "",
                offerings: [],
            },
            companyRegistrationCertificateURl: undefined,
            vendorIdURl: undefined,
            addressProofURl: undefined,
            confirmationLetterURl: undefined,
            businessPromotionalMaterialURl: undefined,
        },
    });

    const formData = watch();
    const selectedProvince = watch("province");
    const cityOptions = selectedProvince ? provinceCities[selectedProvince] : [];

    const handleNext = async () => {
        setRotate(true);
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        } else if (step === 4) {
            setStep(5);
        } else if (step === 5) {
            setStep(6);
        } else if (step === 6) {
            setStep(7);
        }
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleStepClick = async (stepNumber: number) => {
        if (stepNumber < step) {
            setStep(stepNumber);
        } else if (stepNumber > step) {
            if (step === 1) {
                const valid = await trigger([
                    "businessName",
                    "businessEmail",
                    "businessContactNumber",
                    "password",
                    "representativeName",
                ]);
                if (valid) setStep(stepNumber);
            } else if (step === 2) {
                const valid = await trigger([
                    "tradingAddress",
                    "province",
                    "city",
                    "companyRegNumber",
                ]);
                if (valid) setStep(stepNumber);
            }
        }
        if (stepNumber === 3) {
            setStep(stepNumber);
            setStepQuestion(1);
        }
    };

    const preferenceNext = () => {
        if (stepQuestion < 7) {
            setStepQuestion((s: number) => s + 1);
        } else {
            setStep((s) => s + 1);
        }
    };

    const onSubmit = (data: PartnerForm) => {
        console.log("Form submitted:", data);
    };


    const startWheelEdit = (idx: number, offer: any) => {
        setEditingOfferIndex(idx);
        setEditingOffer({ ...offer });
        setIsEditModalOpen(true);
    }
    const addOffer = () => {
        setEditingOfferIndex(-1);
        setEditingOffer({ name: '', term: '', type: '', quantity: 0 });
        setIsEditModalOpen(true);
    }


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
        if ((step >= 1 && step <= 7) || (step === 3 && stepQuestion >= 1 && stepQuestion <= 7)) {
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
                    {[1, 2, 3, 4, 5, 6, 7].map((s, index) => (
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
                                <div className="absolute top-full mt-2 sm:mt-3 text-xs font-medium text-gray-300 whitespace-nowrap hidden sm:block text-center min-w-max">
                                    {
                                        s === 1
                                            ? "Business Details"
                                            : s === 2
                                                ? "Representative Details"
                                                : s === 3
                                                    ? "Exclusive wheel Offerings"
                                                    : s === 4
                                                        ? "Exclusive raffle Offerings"
                                                        : s === 5 ? "Required Documents"
                                                            : s === 6 ? "Web & Social Media"
                                                                : s === 7 ? "Preferences" :
                                                                    "Submit"
                                    }
                                </div>
                            </div>
                            {index < 6 && (
                                <div
                                    className={`w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 mx-2 sm:mx-3 md:mx-4 transition-all duration-300 ${step > s ? "bg-[#dda87c]" : "bg-gray-300"
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-2 sm:hidden text-xs text-gray-300 mt-2">
                    <span className={step === 1 ? "text-[#dda87c] font-medium" : ""}>Business Details</span>
                    <span>•</span>
                    <span className={step === 2 ? "text-[#dda87c] font-medium" : ""}>Representative</span>
                    <span>•</span>
                    <span className={step === 3 ? "text-[#dda87c] font-medium" : ""}>Wheel Offerings</span>
                    <span>•</span>
                    <span className={step === 4 ? "text-[#dda87c] font-medium" : ""}>Raffle Offerings</span>
                    <span>•</span>
                    <span className={step === 5 ? "text-[#dda87c] font-medium" : ""}>Documents</span>
                    <span>•</span>
                    <span className={step === 6 ? "text-[#dda87c] font-medium" : ""}>Web & Social</span>
                    <span>•</span>
                    <span className={step === 7 ? "text-[#dda87c] font-medium" : ""}>Preferences</span>
                </div>
            </nav>

            <div ref={containerRefs[0]} className={`h-full flex items-center justify-center z-20 p-10 ${step === 7 ? "w-full" : "w-[35%]"}`}>
                <div
                    className={`w-full px-4 sm:px-10 py-1 rounded-sm h-fit  ${step === 7
                        ? "bg-transparent shadow-none w-full"
                        : "bg-[#181818] shadow-[0_0_10px_2px_#dda87c]"
                        }`}
                >
                    {step !== 7 && (
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
                                                ? "Business Information"
                                                : step === 2
                                                    ? "Representative Details"
                                                    : step === 3
                                                        ? "Exclusive Wheel Offerings"
                                                        : step === 4
                                                            ? "Exclusive Raffle Offerings"
                                                            : step === 5
                                                                ? "Required Documents"
                                                                : step === 6
                                                                    ? "Web & Social Media"
                                                                    : step === 7
                                                                        ? "Business Preferences"
                                                                        : "Complete Setup"
                                        }
                                    </p>
                                    <div className="flex-1 h-px bg-[#d19f76] max-w-[100px]" />
                                </div>
                            </div>
                        </div>
                    )}
                    {step < 8 ? (
                        <>
                            {step === 1 && (
                                <div ref={containerRefs[1]} className="space-y-4 sm:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Business Name */}
                                        <div className="relative w-full">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("businessName")}
                                                defaultValue={formData.businessName || ""}
                                                placeholder="Business Name"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.businessName && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.businessName.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Business Type */}
                                        <div className="relative w-full">
                                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <select
                                                {...register("businessType")}
                                                defaultValue={formData?.businessType || ""}
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            >
                                                <option value="" disabled>
                                                    Business type
                                                </option>
                                                {offers.map((offer, index) => (
                                                    <option key={offer || index} value={offer}>
                                                        {offer}
                                                    </option>
                                                ))}
                                            </select>

                                            {errors.businessType && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.businessType.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Company Registration Number */}
                                        <div className="relative w-full">
                                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("companyRegNumber")}
                                                defaultValue={formData.companyRegNumber || ""}
                                                placeholder="Company Registration Number"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.companyRegNumber && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.companyRegNumber.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* VAT Number (Optional) */}
                                        <div className="relative w-full">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("vatNumber")}
                                                defaultValue={formData.vatNumber || ""}
                                                placeholder="VAT Number"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.vatNumber && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.vatNumber.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Trading Address */}
                                        <div className="relative w-full md:col-span-2">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("tradingAddress")}
                                                defaultValue={formData.tradingAddress || ""}
                                                placeholder="Trading Address"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.tradingAddress && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.tradingAddress.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Province */}
                                        <div className="relative w-full">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <select
                                                {...register("province")}
                                                defaultValue={formData.province || ""}
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] appearance-none"
                                            >
                                                <option value="">Select Province</option>
                                                {provinces.map((province) => (
                                                    <option key={province} value={province}>
                                                        {province}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.province && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.province.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* City */}
                                        <div className="relative w-full">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <select
                                                {...register("city")}
                                                defaultValue={formData.city || ""}
                                                disabled={!watch("province")}
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] appearance-none"
                                            >
                                                <option value="">Select City</option>
                                                {watch("province") &&
                                                    provinceCities[watch("province")].map((city) => (
                                                        <option key={city} value={city}>
                                                            {city}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.city && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.city.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Business Contact Number */}
                                        <div className="relative w-full">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("businessContactNumber")}
                                                defaultValue={formData.businessContactNumber || ""}
                                                placeholder="Business Contact "
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.businessContactNumber && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.businessContactNumber.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Business Email */}
                                        <div className="relative w-full group">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("businessEmail")}
                                                defaultValue={formData.businessEmail || ""}
                                                placeholder="Business Email (We'll send confirmation here)"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.businessEmail && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.businessEmail.message}
                                                </p>
                                            )}

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out whitespace-nowrap z-10 pointer-events-none">
                                                <div className="text-center">
                                                    We'll send confirmation emails and important updates to this address
                                                </div>
                                                {/* Arrow pointing down */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div ref={containerRefs[1]} className="space-y-4 sm:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Representative Full Name */}
                                        <div className="relative w-full">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("representativeName")}
                                                defaultValue={formData.representativeName || ""}
                                                placeholder="Full Name"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.representativeName && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.representativeName.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Representative Position */}
                                        <div className="relative w-full">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("representativePosition")}
                                                defaultValue={formData.representativePosition || ""}
                                                placeholder="Position in Business"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.representativePosition && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.representativePosition.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Representative Email */}
                                        <div className="relative w-full">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("representativeEmail")}
                                                defaultValue={formData.representativeEmail || ""}
                                                placeholder="Email Address"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            {errors.representativeEmail && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.representativeEmail.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Representative Phone Number */}
                                        {/* Representative Phone Number */}
                                        <div className="relative w-full">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <div className="flex w-full pl-8"> {/* Add padding-left to account for icon */}
                                                <select
                                                    value={selectedCountry}
                                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                                    className="bg-[#0d0d0d] text-white px-2 py-2 h-11 rounded-l-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] text-sm w-28 sm:w-32 md:w-36"
                                                >
                                                    {countries.map((country) => (
                                                        <option key={country.code} value={country.code}>
                                                            {country.code} {country.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    {...register("representativePhone")}
                                                    defaultValue={formData.representativePhone || ""}
                                                    placeholder="Phone Number"
                                                    className="flex-1 min-w-0 bg-[#0d0d0d] text-white px-3 py-2 h-11 rounded-r-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400 text-sm"
                                                />
                                            </div>
                                            {errors.representativePhone && (
                                                <p className="text-red-500 text-xs mt-1">{errors.representativePhone.message}</p>
                                            )}
                                        </div>


                                        {/* Password */}
                                        <div className="relative w-full">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                {...register("password")}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            {errors.password && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="relative w-full">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <input
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                                onChange={(e) => {
                                                    if (e.target.value !== watch("password")) {
                                                        setError("confirmPassword", {
                                                            type: "manual",
                                                            message: "Passwords do not match",
                                                        });
                                                    } else {
                                                        clearErrors("confirmPassword");
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            {errors.confirmPassword && (
                                                <p className="absolute text-red-500 text-xs mt-1">
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>



                                </div>
                            )}

                            {step === 3 && (
                                <div ref={containerRefs[1]} className="space-y-4">


                                    {/* Offers Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto p-1">
                                        {wheelOffers.map((offer, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => startWheelEdit(idx, offer)}
                                                className="relative bg-[#2a2a2a] rounded-lg p-3 h-24 flex flex-col justify-between cursor-pointer hover:border hover:border-[#d19f76]/50 transition-colors"
                                            >
                                                <div>
                                                    <p className="text-white font-medium text-sm truncate">
                                                        {offer.name || "New Offer"}
                                                    </p>
                                                    {offer.type && (
                                                        <p className="text-[#d19f76] text-xs mt-1 capitalize">
                                                            {offer.type}
                                                        </p>
                                                    )}
                                                </div>
                                                {offer.quantity > 0 && (
                                                    <p className="text-gray-400 text-xs">Qty: {offer.quantity}</p>
                                                )}
                                            </div>
                                        ))}

                                        {/* Add New Offer Button */}
                                        {wheelOffers.length < 8 && (
                                            <button
                                                type="button"
                                                onClick={addOffer}
                                                className="bg-[#1c1c1c] border-2 border-dashed border-[#d19f76]/30 rounded-lg p-3 h-24 flex flex-col items-center justify-center hover:border-[#d19f76]/60 transition-colors"
                                            >
                                                <Plus className="text-[#d19f76]" size={20} />
                                                <span className="text-[#d19f76] text-xs mt-1">Add Offer</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Edit Offer Modal */}
                                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                        <DialogContent className="bg-[#1c1c1c] border-[#2a2a2a] max-w-[90vw] sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-[#d19f76]">
                                                    {editingOfferIndex === -1 ? "Add New Offer" : "Edit Offer"}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div>
                                                    <label className="block text-gray-400 text-xs mb-1">
                                                        Offer Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingOffer.name}
                                                        onChange={(e) =>
                                                            setEditingOffer({ ...editingOffer, name: e.target.value })
                                                        }
                                                        placeholder="e.g. 10% Discount"
                                                        className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-500 text-sm"
                                                        required
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">
                                                            Type*
                                                        </label>
                                                        <select
                                                            value={editingOffer.type}
                                                            onChange={(e) =>
                                                                setEditingOffer({ ...editingOffer, type: e.target.value })
                                                            }
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] text-sm"
                                                            required
                                                        >
                                                            <option value="">Select type</option>
                                                            <option value="Discount">Discount</option>
                                                            <option value="Free Item">Free Item</option>
                                                            <option value="Cashback">Cashback</option>
                                                            <option value="Voucher">Voucher</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">
                                                            Quantity
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={editingOffer.quantity || ''}
                                                            onChange={(e) =>
                                                                setEditingOffer({
                                                                    ...editingOffer,
                                                                    quantity: parseInt(e.target.value) || 0,
                                                                })
                                                            }
                                                            placeholder="Optional"
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-500 text-sm"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-400 text-xs mb-1">
                                                        Terms & Conditions
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingOffer.term}
                                                        onChange={(e) =>
                                                            setEditingOffer({ ...editingOffer, term: e.target.value })
                                                        }
                                                        placeholder="e.g. 'Valid for 30 days'"
                                                        className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                {editingOfferIndex !== -1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedOffers = [...wheelOffers];
                                                            updatedOffers.splice(editingOfferIndex, 1);
                                                            setWheelOffers(updatedOffers);
                                                            setIsEditModalOpen(false);
                                                        }}
                                                        className="mr-auto text-red-400 hover:text-red-500 text-sm"
                                                    >
                                                        Delete Offer
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (editingOfferIndex === -1) {
                                                            setWheelOffers([...wheelOffers, editingOffer]);
                                                        } else {
                                                            const updatedOffers = [...wheelOffers];
                                                            updatedOffers[editingOfferIndex] = editingOffer;
                                                            setWheelOffers(updatedOffers);
                                                        }
                                                        setIsEditModalOpen(false);
                                                    }}
                                                    className="bg-[#d19f76] hover:bg-[#c19166] text-white px-4 py-2 rounded-sm text-sm"
                                                >
                                                    Save Changes
                                                </button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>


                                </div>
                            )}

                            {step === 4 && (
                                <div ref={containerRefs[1]} className="space-y-4">


                                    {/* Offers Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto p-1">
                                        {wheelOffers.map((offer, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => startWheelEdit(idx, offer)}
                                                className="relative bg-[#2a2a2a] rounded-lg p-3 h-24 flex flex-col justify-between cursor-pointer hover:border hover:border-[#d19f76]/50 transition-colors"
                                            >
                                                <div>
                                                    <p className="text-white font-medium text-sm truncate">
                                                        {offer.name || "New Offer"}
                                                    </p>
                                                    {offer.type && (
                                                        <p className="text-[#d19f76] text-xs mt-1 capitalize">
                                                            {offer.type}
                                                        </p>
                                                    )}
                                                </div>
                                                {offer.quantity > 0 && (
                                                    <p className="text-gray-400 text-xs">Qty: {offer.quantity}</p>
                                                )}
                                            </div>
                                        ))}

                                        {/* Add New Offer Button */}
                                        {wheelOffers.length < 8 && (
                                            <button
                                                type="button"
                                                onClick={addOffer}
                                                className="bg-[#1c1c1c] border-2 border-dashed border-[#d19f76]/30 rounded-lg p-3 h-24 flex flex-col items-center justify-center hover:border-[#d19f76]/60 transition-colors"
                                            >
                                                <Plus className="text-[#d19f76]" size={20} />
                                                <span className="text-[#d19f76] text-xs mt-1">Add Offer</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Edit Offer Modal */}
                                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                        <DialogContent className="bg-[#1c1c1c] border-[#2a2a2a] max-w-[90vw] sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-[#d19f76]">
                                                    {editingOfferIndex === -1 ? "Add New Offer" : "Edit Offer"}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div>
                                                    <label className="block text-gray-400 text-xs mb-1">
                                                        Offer Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingOffer.name}
                                                        onChange={(e) =>
                                                            setEditingOffer({ ...editingOffer, name: e.target.value })
                                                        }
                                                        placeholder="e.g. 10% Discount"
                                                        className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-500 text-sm"
                                                        required
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">
                                                            Type*
                                                        </label>
                                                        <select
                                                            value={editingOffer.type}
                                                            onChange={(e) =>
                                                                setEditingOffer({ ...editingOffer, type: e.target.value })
                                                            }
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] text-sm"
                                                            required
                                                        >
                                                            <option value="">Select type</option>
                                                            <option value="Discount">Discount</option>
                                                            <option value="Free Item">Free Item</option>
                                                            <option value="Cashback">Cashback</option>
                                                            <option value="Voucher">Voucher</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">
                                                            Quantity
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={editingOffer.quantity || ''}
                                                            onChange={(e) =>
                                                                setEditingOffer({
                                                                    ...editingOffer,
                                                                    quantity: parseInt(e.target.value) || 0,
                                                                })
                                                            }
                                                            placeholder="Optional"
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-500 text-sm"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-400 text-xs mb-1">
                                                        Terms & Conditions
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingOffer.term}
                                                        onChange={(e) =>
                                                            setEditingOffer({ ...editingOffer, term: e.target.value })
                                                        }
                                                        placeholder="e.g. 'Valid for 30 days'"
                                                        className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                {editingOfferIndex !== -1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedOffers = [...wheelOffers];
                                                            updatedOffers.splice(editingOfferIndex, 1);
                                                            setWheelOffers(updatedOffers);
                                                            setIsEditModalOpen(false);
                                                        }}
                                                        className="mr-auto text-red-400 hover:text-red-500 text-sm"
                                                    >
                                                        Delete Offer
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (editingOfferIndex === -1) {
                                                            setWheelOffers([...wheelOffers, editingOffer]);
                                                        } else {
                                                            const updatedOffers = [...wheelOffers];
                                                            updatedOffers[editingOfferIndex] = editingOffer;
                                                            setWheelOffers(updatedOffers);
                                                        }
                                                        setIsEditModalOpen(false);
                                                    }}
                                                    className="bg-[#d19f76] hover:bg-[#c19166] text-white px-4 py-2 rounded-sm text-sm"
                                                >
                                                    Save Changes
                                                </button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>


                                </div>
                            )}

                            {step === 5 && (
                                <div ref={containerRefs[1]} className="relative  overflow-auto h-80">
                                    {/* Scrollable content container with fade effect */}
                                    <div className="space-y-4 max-h-[60vh] overflow pr-2 pb-4 scrollbar-thin scrollbar-thumb-[#d19f76]/50 scrollbar-track-[#0d0d0d]">
                                        {/* Company Registration Certificate */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Company Registration Certificate
                                            </label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex items-center gap-2 w-full px-3 py-1 border-2 border-dashed rounded-sm border-[#d19f76] bg-[#0d0d0d] cursor-pointer hover:bg-[#1a1a1a] transition-colors h-14">
                                                    <Upload className="w-4 h-4 text-[#d19f76]" />
                                                    <div className="flex flex-col justify-center leading-tight">
                                                        <p className="text-[11px] text-gray-400">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-[10px] text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        {...register("companyRegistrationCertificateURL")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) setValue("companyRegistrationCertificateURL", file);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Partner ID */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Partner ID
                                            </label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex items-center gap-2 w-full px-3 py-1 border-2 border-dashed rounded-sm border-[#d19f76] bg-[#0d0d0d] cursor-pointer hover:bg-[#1a1a1a] transition-colors h-14">
                                                    <Upload className="w-4 h-4 text-[#d19f76]" />
                                                    <div className="flex flex-col justify-center leading-tight">
                                                        <p className="text-[11px] text-gray-400">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-[10px] text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        {...register("partnerIdURL")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) setValue("partnerIdURL", file);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Address Proof */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Address Proof
                                            </label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex items-center gap-2 w-full px-3 py-1 border-2 border-dashed rounded-sm border-[#d19f76] bg-[#0d0d0d] cursor-pointer hover:bg-[#1a1a1a] transition-colors h-14">
                                                    <Upload className="w-4 h-4 text-[#d19f76]" />
                                                    <div className="flex flex-col justify-center leading-tight">
                                                        <p className="text-[11px] text-gray-400">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-[10px] text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        {...register("addressProofURL")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) setValue("addressProofURL", file);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Additional Documents - Repeat as needed */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Additional Document 1
                                            </label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex items-center gap-2 w-full px-3 py-1 border-2 border-dashed rounded-sm border-[#d19f76] bg-[#0d0d0d] cursor-pointer hover:bg-[#1a1a1a] transition-colors h-14">
                                                    <Upload className="w-4 h-4 text-[#d19f76]" />
                                                    <div className="flex flex-col justify-center leading-tight">
                                                        <p className="text-[11px] text-gray-400">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-[10px] text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        {...register("additionalDoc1URL")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) setValue("additionalDoc1URL", file);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Add more document sections as needed */}
                                    </div>

                                    {/* Fade effect at bottom to indicate scrollable content */}
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#181818] to-transparent pointer-events-none"></div>
                                </div>
                            )}


                            {step === 6 && (
                                <>
                                    <div ref={containerRefs[1]} className="space-y-4">

                                        {/* Website */}
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                                            <input
                                                {...register("websiteUrl")}
                                                defaultValue={formData.websiteUrl || ""}
                                                placeholder="Website URL"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>

                                        {/* Facebook */}
                                        <div className="relative">
                                            <Facebook className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                                            <input
                                                {...register("socialMediaHandles.facebook")}
                                                defaultValue={formData.socialMediaHandles?.facebook || ""}
                                                placeholder="Facebook URL"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>

                                        {/* Instagram */}
                                        <div className="relative">
                                            <Instagram className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                                            <input
                                                {...register("socialMediaHandles.instagram")}
                                                defaultValue={formData.socialMediaHandles?.instagram || ""}
                                                placeholder="Instagram URL"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>

                                        {/* Twitter */}
                                        <div className="relative">
                                            <Twitter className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                                            <input
                                                {...register("socialMediaHandles.twitter")}
                                                defaultValue={formData.socialMediaHandles?.twitter || ""}
                                                placeholder="Twitter URL"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>

                                        {/* TikTok */}
                                        <div className="relative">
                                            <Music2 className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                                            <input
                                                {...register("socialMediaHandles.tiktok")}
                                                defaultValue={formData.socialMediaHandles?.tiktok || ""}
                                                placeholder="TikTok URL"
                                                className="w-full bg-[#0d0d0d] text-white px-10 py-2 h-11 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d19f76] placeholder-gray-400"
                                            />
                                        </div>

                                    </div>
                                </>
                            )}

                            {step === 7 && (
                                <>
                                    {stepQuestion === 1 && (
                                        <div ref={containerRefs[5]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-1 text-center">
                                                What types of <span className="text-[#dda87c]">goods or services</span> are you<br className="hidden sm:block" />
                                                <span className="text-[#dda87c]">most interested</span> in?
                                            </label>
                                            <p className="text-center text-sm">Select all that apply (Max 7)</p>

                                            {errors.productServiceCategories && (
                                                <p className="text-red-500 text-lg text-center mb-4">
                                                    {errors.productServiceCategories.message}
                                                </p>
                                            )}

                                            <div className="text-white text-center mb-4">
                                                Selected: {(getValues("productServiceCategories")?.length || 0)}/7
                                            </div>

                                            {/* Improved scrollable container */}
                                            <div className="max-h-[60vh] overflow-y-auto pb-4"> {/* Added max height and overflow */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 px-2">
                                                    {productServiceCategories.map((i) => {
                                                        const currentInterests: any = getValues("productServiceCategories") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        const isDisabled = currentInterests.length >= 4 && !isChecked;

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
                                                                            if (currentInterests.length >= 4) {
                                                                                setError("productServiceCategories", {
                                                                                    type: "max",
                                                                                    message: "Maximum 7 interests allowed"
                                                                                });
                                                                                return;
                                                                            }
                                                                            updatedInterests.push(i);
                                                                        } else {
                                                                            updatedInterests = updatedInterests.filter((item) => item !== i);
                                                                        }
                                                                        setValue("productServiceCategories", updatedInterests);
                                                                        clearErrors("productServiceCategories");
                                                                    }}
                                                                    className="hidden peer"
                                                                    disabled={isDisabled}
                                                                />
                                                                {/* More compact mobile layout */}
                                                                <span
                                                                    className={`border-2 border-[#725a46] p-2 sm:p-3 rounded-md text-base sm:text-lg md:text-xl w-full text-center 
                  transition-all duration-300 
                  ${isChecked ? "bg-[#dda87c] text-black" : "bg-black text-[#725a46]"}
                  ${!isDisabled ? "hover:bg-[#523d2b] hover:text-black" : ""}`}
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
                                    {stepQuestion === 2 && (
                                        <div>

                                        </div>
                                    )}
                                    {stepQuestion === 3 && (
                                        <div>
                                            {/* Content for Step 7.3 */}
                                        </div>
                                    )}
                                    {stepQuestion === 4 && (
                                        <div>
                                            {/* Content for Step 7.4 */}
                                        </div>
                                    )}
                                    {stepQuestion === 5 && (
                                        <div>
                                            {/* Content for Step 7.5 */}
                                        </div>
                                    )}
                                    {stepQuestion === 6 && (
                                        <div>
                                            {/* Content for Step 7.6 */}
                                        </div>
                                    )}
                                    {stepQuestion === 7 && (
                                        <div>
                                            {/* Content for Step 7.7 */}
                                        </div>
                                    )}
                                </>
                            )}


                            <div className="flex flex-col justify-center items-center m-4 sm:m-6">
                                <button
                                    type="button"
                                    onClick={step === 7 ? preferenceNext : handleNext}
                                    className={`${step >= 4 ? "w-full sm:w-90" : "w-full"} bg-[#523d2b] hover:bg-[#c78a63] text-white px-6 py-2 rounded-lg shadow cursor-pointer`}
                                >
                                    Continue
                                </button>

                                {step === 7 && (
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
                            <button
                                type="submit"
                                onClick={() => {
                                    console.log('Form Values:', getValues());
                                    console.log('Form Errors:', errors);
                                }}
                                className={`w-full m-4 bg-[#523d2b] hover:bg-[#c78a63] text-white px-6 py-2 rounded-lg shadow cursor-pointer`}
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
};

export default PartnerOnBoard;