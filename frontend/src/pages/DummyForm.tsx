


import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { User, Mail, Lock, Phone, EyeOff, Eye, MapPin, Globe, CreditCard, Hash, FileText, Briefcase, Plus, Upload, Facebook, Instagram, Twitter, Music2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import gsap from "gsap";
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Star from "@/components/custom_components/Star";


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
const provinces = Object.keys(provinceCities);
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
const businessTypes = [
    { value: "", label: "Select Business Type" },
    { value: "restaurants takeaways", label: "Restaurants & Takeaways" },
    { value: "groceries essentials", label: "Groceries & Essentials" },
    { value: "bars clubs nightlife", label: "Bars, Clubs & Nightlife" },
    { value: "fashion clothing accessories", label: "Fashion, Clothing & Accessories" },
    { value: "beauty hair skincare", label: "Beauty, Hair & Skincare" },
    { value: "health fitness wellness", label: "Health, Fitness & Wellness" },
    { value: "medical healthcare services", label: "Medical & Healthcare Services" },
    { value: "home garden diy", label: "Home, Garden & DIY" },
    { value: "electronics gadgets appliances", label: "Electronics, Gadgets & Appliances" },
    { value: "automotive transportation", label: "Automotive & Transportation" },
    { value: "travel tourism hospitality", label: "Travel, Tourism & Hospitality" },
    { value: "education training skills", label: "Education, Training & Skills Development" },
    { value: "professional business services", label: "Professional & Business Services" },
    { value: "financial legal insurance", label: "Financial, Legal & Insurance Services" },
    { value: "real estate rentals property", label: "Real Estate, Rentals & Property Services" },
    { value: "entertainment arts events", label: "Entertainment, Arts & Events" },
    { value: "sport leisure recreation", label: "Sport, Leisure & Recreation" },
    { value: "children babies family", label: "Children, Babies & Family" },
    { value: "pets animal care", label: "Pets & Animal Care" },
    { value: "marketing advertising media", label: "Marketing, Advertising & Media" },
    { value: "industrial manufacturing agriculture", label: "Industrial, Manufacturing & Agriculture" },
    { value: "traditional cultural spiritual", label: "Traditional, Cultural & Spiritual Services" },
    { value: "charity community social", label: "Charity, Community & Social Welfare" },
    { value: "government public services", label: "Government & Public Services" },
    { value: "other", label: "Other" }
];


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
] as const;
const businessPresence = [
    "Physical store only",
    "Online only",
    "Both",
] as const;

const customerEngagementPlatforms = [
    "In-store",
    "WhatsApp",
    "Instagram / Facebook",
    "Website / eCommerce",
    "Phone / SMS Orders",
    "TikTok or YouTube",
    "Other",
] as const;

const preferredPromotionTypes = [
    "Discounts / Coupons",
    "Flash Deals (Limited Time)",
    "Giveaways or Raffles",
    "Combo Deals (e.g. 2-for-1)",
    "Loyalty Stamps (e.g. Buy 5, Get 1 Free)",
    "First-Time User Rewards",
    "Exclusive Menu Member Offers",
    "Trade Promotions",
    "Spin the Wheel Participation",
] as const;

const typicalDealValue = [
    "Under R50",
    "R51–R100",
    "R101–R250",
    "Over R250",
    "Depends on offer type.",
] as const;

const offerFrequency = [
    "Daily",
    "Weekly",
    "Monthly",
    "Occasionally / On-Demand",
] as const;

const businessGoalsOnMenu = [
    "Increase brand visibility.",
    "Drive foot traffic / online orders.",
    "Gain repeat customers.",
    "Take part in trade promotions.",
    "Evaluate latest offers.",
    "Get insights / analytics.",
    "Collaborate with affiliates.",
    "Grow in township markets.",
    "Reach new customer segments.",
] as const;


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


        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[a-z]/, "Must contain a lowercase letter")
            .regex(/\d/, "Must contain a number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        // agreedToTerms: z.literal(true, {
        //     errorMap: () => ({ message: "You must agree to the terms" }),
        // }),


        vendorTier: z.enum(["bronze", "silver", "gold"]).optional(),
        referralCodeUsed: z.string().optional(),
        vendorVoucher: z.string().optional(),



        wheelOffer: z
            .object({
                offerings: z.array(
                    z.object({
                        type: z.string().min(1, "Type is required"),
                        name: z.string().min(1, "Name is required"),
                        term: z.string().optional(),
                        quantity: z.number().nonnegative().optional(),
                        date: z.coerce.date().optional(),
                    })
                ),
            })
            .optional(),

        raffleOffer: z
            .object({
                offerings: z
                    .array(
                        z.object({
                            type: z.string().optional(),
                            terms: z.string().optional(),
                            name: z.string().min(1, "Name is required"),
                            quantity: z.number().optional(),
                            endDate: z.coerce.date().optional(),
                        })
                    )
                    .optional(),
            })
            .optional(),


        socialMediaHandles: z
            .object({
                facebook: z.string().url().optional().or(z.literal("")),
                instagram: z.string().url().optional().or(z.literal("")),
                twitter: z.string().url().optional().or(z.literal("")),
                tiktok: z.string().url().optional().or(z.literal("")),
            })
            .optional(),


        companyRegistrationCertificate: z.instanceof(File).nullable().optional(),
        vendorId: z.instanceof(File).nullable().optional(),
        addressProof: z.instanceof(File).nullable().optional(),
        confirmationLetter: z.instanceof(File).nullable().optional(),
        businessPromotionalMaterial: z.instanceof(File).nullable().optional(),


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
            .optional()
            .nullable(),

        businessPresence: z
            .enum(["Physical store only", "Online only", "Both"])
            .optional()
            .nullable(),


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
            .optional().nullable(),

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
            .optional().nullable(),


        typicalDealValue: z
            .enum([
                "Under R50",
                "R51–R100",
                "R101–R250",
                "Over R250",
                "Depends on offer type.",
            ])
            .optional().nullable(),

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
            .optional().nullable(),

    })


    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type PartnerForm = z.infer<typeof vendorSignupSchema>;

const DummyForm = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [rotate, setRotate] = useState(false);
    const [step, setStep] = useState<number>(1);
    const [stepQuestion, setStepQuestion] = useState<number>(1);
    const [selectedCountry, setSelectedCountry] = useState<string>("+27");
    const containerRefs = Array(11).fill(0).map(() => useRef<HTMLDivElement>(null));
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOfferIndex, setSelectedOfferIndex] = useState<number | null>(null);
    const [isRaffleModalOpen, setIsRaffleModalOpen] = useState(false);
    const [selectedRaffleIndex, setSelectedRaffleIndex] = useState<number | null>(null);
    const [CompanyPreview, setCompanyPreview] = useState<File | null>(null);
    const [vendorIdPreview, setVendorIdPreview] = useState<File | null>(null);
    const [addressProofPreview, setAddressProofPreview] = useState<File | null>(null);
    const [confirmationLetterPreview, setConfirmationLetterPreview] = useState<File | null>(null);
    const [businessPromotionalMaterialPreview, setBusinessPromotionalMaterialPreview] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        setError,
        clearErrors,
        setValue,
        control,
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
            companyRegistrationCertificate: undefined,
            vendorId: undefined,
            addressProof: undefined,
            confirmationLetter: undefined,
            businessPromotionalMaterial: undefined,
            wheelOffer: {
                offerings: []
            },
            raffleOffer: {
                offerings: []
            }
        },
    });

    const formData = watch();
    // const selectedProvince = watch("province");
    const { fields, append, remove } = useFieldArray({
        control,
        name: "wheelOffer.offerings",
    });
    const {
        fields: raffleFields,
        append: appendRaffle,

        remove: removeRaffle,
    } = useFieldArray({
        control,
        name: "raffleOffer.offerings",
    });




    const handleNext = async () => {
        setRotate(true);

        if (step === 1) {
            const valid = await trigger([
                "businessName",
                "businessEmail",
                "businessContactNumber",
                "businessType",
                "companyRegNumber",
                "tradingAddress",
                "province",
                "city"
            ]);
            if (!valid) return;
            setStep(2);
        } else if (step === 2) {
            const valid = await trigger([
                "representativeName",
                "representativePosition",
                "representativeEmail",
                "representativePhone",
                "password",

            ]);
            if (!valid) return;
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


    // const handlePrevious = () => {
    //     if (step > 1) setStep(step - 1);
    // };

    const handleStepClick = async (stepNumber: number) => {
        if (stepNumber < step) {
            setStep(stepNumber);
        } else if (stepNumber > step) {
            if (step === 1) {
                const valid = await trigger([
                    "businessName",
                    "businessEmail",
                    "businessContactNumber",
                    "businessType",
                    "companyRegNumber",
                    "tradingAddress",
                    "province",
                    "city"

                ]);
                if (valid) setStep(stepNumber);
            } else if (step === 2) {
                const valid = await trigger([
                    "representativeName",
                    "representativePosition",
                    "representativeEmail",
                    "representativePhone",
                    "password",

                ]);

                if (valid) {
                    setStep(stepNumber);
                }
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


    //===========================Uploading pdf and images and form submit=============================

    const getSignature = async (folder: any) => {
        try {

            console.log("calling backend")
            const response = await axios.post(`${API_BASE_URL}/generateSignature`, { folder });
            console.log("The signature response is ", response);
            return response.data;
        }
        catch (error: any) {
            console.error("Error in getting signature for ", folder)
        }
    }

    const makeCloudinaryApiCall = async (data: FormData) => {
        try {
            const cloudName = import.meta.env.VITE_CLOUD_NAME;
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
            const res = await axios.post(api, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const { secure_url, public_id } = res.data;

            return { secure_url, public_id };
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
        }
    };

    const uploadFile = async (type: string, timestamp: number, signature: string) => {
        let folder: string;
        let file: File | null = null;

        switch (type) {
            case "companyRegistrationCertificate":
                folder = "companyRegistrationCertificate";
                file = CompanyPreview;
                break;
            case "vendorId":
                folder = "vendorId";
                file = vendorIdPreview;
                break;
            case "addressProof":
                folder = "addressProof";
                file = addressProofPreview;
                break;
            case "confirmationLetter":
                folder = "confirmationLetter";
                file = confirmationLetterPreview;
                break;
            case "businessPromotionalMaterial":
                folder = "businessPromotionalMaterial";
                file = businessPromotionalMaterialPreview;
                break;
            default:
                folder = "other-documents";
        }

        if (!file) {
            console.log(`No file selected for ${type}`);
            return;
        }

        const data = new FormData();
        data.append("file", file);
        data.append("timestamp", timestamp.toString());
        data.append("signature", signature);
        data.append("api_key", import.meta.env.VITE_CLOUD_API);
        data.append("folder", folder);



        try {
            const result = await makeCloudinaryApiCall(data);

            return result;
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };


    const onSubmit = async (data: PartnerForm) => {
        const {
            companyRegistrationCertificate,
            vendorId,
            addressProof,
            confirmationLetter,
            businessPromotionalMaterial,
            ...filterData
        } = data;
        console.log("The fields has been taken out of the the data ", companyRegistrationCertificate);
        const {
            signature: companyRegistrationSignature,
            timestamp: companyRegistrationTimestamp
        } = await getSignature("companyRegistrationCertificate");

        const {
            signature: vendorIdSignature,
            timestamp: vendorIdTimestamp
        } = await getSignature("vendorId");

        const {
            signature: addressProofSignature,
            timestamp: addressProofTimestamp
        } = await getSignature("addressProof");

        const {
            signature: confirmationLetterSignature,
            timestamp: confirmationLetterTimestamp
        } = await getSignature("confirmationLetter");

        const {
            signature: businessPromotionalMaterialSignature,
            timestamp: businessPromotionalMaterialTimestamp
        } = await getSignature("businessPromotionalMaterial");

        const companyRegistrationCertificateURl = companyRegistrationTimestamp && companyRegistrationSignature
            ? await uploadFile(
                "companyRegistrationCertificate",
                companyRegistrationTimestamp,
                companyRegistrationSignature
            )
            : null;

        const vendorIdURl = vendorIdTimestamp && vendorIdSignature
            ? await uploadFile(
                "vendorId",
                vendorIdTimestamp,
                vendorIdSignature
            )
            : null;

        const addressProofURl = addressProofTimestamp && addressProofSignature
            ? await uploadFile(
                "addressProof",
                addressProofTimestamp,
                addressProofSignature
            )
            : null;

        const confirmationLetterURl = confirmationLetterTimestamp && confirmationLetterSignature
            ? await uploadFile(
                "confirmationLetter",
                confirmationLetterTimestamp,
                confirmationLetterSignature
            )
            : null;

        const businessPromotionalMaterialURl = businessPromotionalMaterialTimestamp && businessPromotionalMaterialSignature
            ? await uploadFile(
                "businessPromotionalMaterial",
                businessPromotionalMaterialTimestamp,
                businessPromotionalMaterialSignature
            )
            : null;
        const updatedData = {
            ...filterData,
            companyRegistrationCertificateURl,
            vendorIdURl,
            addressProofURl,
            confirmationLetterURl,
            businessPromotionalMaterialURl,
        };
        console.log("Form submitted:", updatedData);


        console.log("Form values:", getValues());

        console.log("Form errors:", errors);
    };

    //=================================================================================================


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
                        here goes form field
                    )
                    :(
                        //form tag goes here with button
                    )}
                </div>
            </div>
        </main>
    );
};

export default DummyForm;
