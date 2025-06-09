


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

const PartnerOnBoard = () => {
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
    const selectedProvince = watch("province");
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: "wheelOffer.offerings",
    });
    const {
        fields: raffleFields,
        append: appendRaffle,
        update: updateRaffle,
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
        catch (error) {
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
                                <div ref={containerRefs[1]} className="space-y-6 sm:space-y-6">
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
                                                {businessTypes.map((type, index) => (
                                                    <option key={index} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>

                                            {errors.businessType && (
                                                <p className="absolute text-red-500 text-xs mb-4">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="text-red-500 text-xs  mb-2">{errors.representativePhone.message}</p>
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                                <p className="absolute text-red-500 text-xs  mb-2">
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
                                        {fields.map((offer, idx) => (
                                            <div
                                                key={offer.id}
                                                onClick={() => {
                                                    setSelectedOfferIndex(idx);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="relative bg-[#2a2a2a] rounded-lg p-3 h-24 flex flex-col justify-between cursor-pointer hover:border hover:border-[#d19f76]/50 transition-colors"
                                            >
                                                <div>
                                                    <p className="text-white font-medium text-sm truncate">
                                                        {getValues(`wheelOffer.offerings.${idx}.name`)}
                                                    </p>
                                                    <p className="text-[#d19f76] text-xs  mb-2 capitalize">
                                                        {getValues(`wheelOffer.offerings.${idx}.type`)}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    {(() => {
                                                        const quantity = getValues(`wheelOffer.offerings.${idx}.quantity`);
                                                        const date = getValues(`wheelOffer.offerings.${idx}.date`);

                                                        return (
                                                            <>
                                                                {(quantity ?? 0) > 0 && (
                                                                    <p className="text-gray-400 text-xs">Qty: {quantity}</p>
                                                                )}
                                                                {date && (
                                                                    <p className="text-gray-400 text-xs">
                                                                        {new Date(date).toLocaleDateString()}
                                                                    </p>
                                                                )}
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        ))}

                                        {fields.length < 8 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    append({
                                                        name: '',
                                                        type: '',
                                                        quantity: 0,
                                                        term: '',
                                                        date: undefined
                                                    });
                                                    setSelectedOfferIndex(fields.length);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="bg-[#1c1c1c] border-2 border-dashed border-[#d19f76]/30 rounded-lg p-3 h-24 flex flex-col items-center justify-center hover:border-[#d19f76]/60 transition-colors"
                                            >
                                                <Plus className="text-[#d19f76]" size={20} />
                                                <span className="text-[#d19f76] text-xs mt-1">Add Offer</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Modal with Registered Fields */}
                                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                        <DialogContent className="bg-[#1c1c1c] border-[#2a2a2a] max-w-[90vw] sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-[#d19f76]">
                                                    {selectedOfferIndex === fields.length ? "Add New Offer" : "Edit Offer"}
                                                </DialogTitle>
                                            </DialogHeader>

                                            {selectedOfferIndex !== null && (
                                                <div className="space-y-4 py-4">
                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">Offer Name*</label>
                                                        <input
                                                            {...register(`wheelOffer.offerings.${selectedOfferIndex}.name`, { required: true })}
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            placeholder="e.g. 10% Discount"
                                                        />
                                                        {errors.wheelOffer?.offerings?.[selectedOfferIndex]?.name && (
                                                            <p className="text-red-400 text-xs mt-1">Name is required</p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-gray-400 text-xs mb-1">Type*</label>
                                                            <select
                                                                {...register(`wheelOffer.offerings.${selectedOfferIndex}.type`, { required: true })}
                                                                className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            >
                                                                <option value="">Select Type</option>
                                                                {offers.map((type, index) => (
                                                                    <option key={index} value={type}>
                                                                        {type}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.wheelOffer?.offerings?.[selectedOfferIndex]?.type && (
                                                                <p className="text-red-400 text-xs mt-1">Type is required</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-gray-400 text-xs mb-1">Quantity</label>
                                                            <input
                                                                type="number"
                                                                {...register(`wheelOffer.offerings.${selectedOfferIndex}.quantity`, {
                                                                    valueAsNumber: true,
                                                                    min: 0
                                                                })}
                                                                className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                                min="0"
                                                                placeholder="Optional"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">Expiration Date</label>
                                                        <input
                                                            type="date"
                                                            {...register(`wheelOffer.offerings.${selectedOfferIndex}.date`, {
                                                                validate: (value) => {
                                                                    if (!value) return true;
                                                                    const selectedDate = new Date(value);
                                                                    const today = new Date();
                                                                    today.setHours(0, 0, 0, 0);
                                                                    return selectedDate >= today || "Date cannot be in the past";
                                                                }
                                                            })}
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                        {errors.wheelOffer?.offerings?.[selectedOfferIndex]?.date && (
                                                            <p className="text-red-400 text-xs mt-1">
                                                                {errors.wheelOffer.offerings[selectedOfferIndex].date.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">Terms & Conditions</label>
                                                        <input
                                                            {...register(`wheelOffer.offerings.${selectedOfferIndex}.term`)}
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            placeholder="e.g. 'Valid for 30 days'"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <DialogFooter>
                                                {selectedOfferIndex !== null && selectedOfferIndex !== fields.length && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            remove(selectedOfferIndex);
                                                            setIsEditModalOpen(false);
                                                        }}
                                                        className="mr-auto text-red-400 hover:text-red-500 text-sm"
                                                    >
                                                        Delete Offer
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditModalOpen(false)}
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
                                <div ref={containerRefs[2]} className="space-y-4">
                                    {/* Raffle Offers Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto p-1">
                                        {raffleFields.map((offer, idx) => (
                                            <div
                                                key={offer.id}
                                                onClick={() => {
                                                    setSelectedRaffleIndex(idx);
                                                    setIsRaffleModalOpen(true);
                                                }}
                                                className="relative bg-[#2a2a2a] rounded-lg p-3 h-24 flex flex-col justify-between cursor-pointer hover:border hover:border-[#d19f76]/50 transition-colors"
                                            >
                                                <div>
                                                    <p className="text-white font-medium text-sm truncate">
                                                        {getValues(`raffleOffer.offerings.${idx}.name`)}
                                                    </p>
                                                    <p className="text-[#d19f76] text-xs mt-1 capitalize">
                                                        {getValues(`raffleOffer.offerings.${idx}.type`)}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    {(() => {
                                                        const quantity = getValues(`raffleOffer.offerings.${idx}.quantity`);
                                                        const endDate = getValues(`raffleOffer.offerings.${idx}.endDate`);

                                                        return (
                                                            <>
                                                                {(quantity ?? 0) > 0 && (
                                                                    <p className="text-gray-400 text-xs">Qty: {quantity}</p>
                                                                )}
                                                                {endDate && (
                                                                    <p className="text-gray-400 text-xs">
                                                                        {new Date(endDate).toLocaleDateString()}
                                                                    </p>
                                                                )}
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        ))}

                                        {raffleFields.length < 8 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    appendRaffle({ name: '', type: '', terms: '', quantity: 0 });
                                                    setSelectedRaffleIndex(raffleFields.length);
                                                    setIsRaffleModalOpen(true);
                                                }}
                                                className="bg-[#1c1c1c] border-2 border-dashed border-[#d19f76]/30 rounded-lg p-3 h-24 flex flex-col items-center justify-center hover:border-[#d19f76]/60 transition-colors"
                                            >
                                                <Plus className="text-[#d19f76]" size={20} />
                                                <span className="text-[#d19f76] text-xs mt-1">Add Raffle</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Modal with Registered Fields */}
                                    <Dialog open={isRaffleModalOpen} onOpenChange={setIsRaffleModalOpen}>
                                        <DialogContent className="bg-[#1c1c1c] border-[#2a2a2a] max-w-[90vw] sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-[#d19f76]">
                                                    {selectedRaffleIndex === raffleFields.length ? "Add New Raffle" : "Edit Raffle"}
                                                </DialogTitle>
                                            </DialogHeader>

                                            {selectedRaffleIndex !== null && (
                                                <div className="space-y-4 py-4">
                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">Raffle Name*</label>
                                                        <input
                                                            {...register(`raffleOffer.offerings.${selectedRaffleIndex}.name`, { required: true })}
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            placeholder="e.g. Free Item Giveaway"
                                                        />
                                                        {errors.raffleOffer?.offerings?.[selectedRaffleIndex]?.name && (
                                                            <p className="text-red-400 text-xs mt-1">Name is required</p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-gray-400 text-xs mb-1">Type</label>
                                                            <input
                                                                {...register(`raffleOffer.offerings.${selectedRaffleIndex}.type`)}
                                                                className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                                placeholder="Optional type"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-gray-400 text-xs mb-1">Quantity</label>
                                                            <input
                                                                type="number"
                                                                {...register(`raffleOffer.offerings.${selectedRaffleIndex}.quantity`, {
                                                                    valueAsNumber: true,
                                                                    min: 0
                                                                })}
                                                                className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                                placeholder="Optional"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">End Date</label>
                                                        <input
                                                            type="date"
                                                            {...register(`raffleOffer.offerings.${selectedRaffleIndex}.endDate`, {
                                                                validate: (value) => {
                                                                    if (!value) return true;
                                                                    const selectedDate = new Date(value);
                                                                    const today = new Date();
                                                                    today.setHours(0, 0, 0, 0);
                                                                    return selectedDate >= today || "Date cannot be in the past";
                                                                }
                                                            })}
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                        {errors.raffleOffer?.offerings?.[selectedRaffleIndex]?.endDate && (
                                                            <p className="text-red-400 text-xs mt-1">
                                                                {errors.raffleOffer.offerings[selectedRaffleIndex].endDate.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-400 text-xs mb-1">Terms & Conditions</label>
                                                        <input
                                                            {...register(`raffleOffer.offerings.${selectedRaffleIndex}.terms`)}
                                                            className="w-full bg-[#0d0d0d] text-white px-3 py-2 h-10 rounded-sm text-sm"
                                                            placeholder="e.g. '1 winner per week'"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <DialogFooter>
                                                {selectedRaffleIndex !== null && selectedRaffleIndex !== raffleFields.length && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            removeRaffle(selectedRaffleIndex);
                                                            setIsRaffleModalOpen(false);
                                                        }}
                                                        className="mr-auto text-red-400 hover:text-red-500 text-sm"
                                                    >
                                                        Delete Raffle
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsRaffleModalOpen(false)}
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
                                <div ref={containerRefs[1]} className="relative overflow-auto h-80">
                                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-[#d19f76]/50 scrollbar-track-[#0d0d0d]">
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
                                                        {...register("companyRegistrationCertificate")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setValue("companyRegistrationCertificate", file);
                                                                setCompanyPreview(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {CompanyPreview && (
                                                <div className="mt-2 flex items-center justify-between p-2 bg-[#1a1a1a] rounded-sm">
                                                    <span className="text-xs text-gray-300 truncate">{CompanyPreview.name}</span>
                                                    <button
                                                        type="button"
                                                        className="text-red-400 hover:text-red-300 text-xs"
                                                        onClick={() => {
                                                            setValue("companyRegistrationCertificate", null);
                                                            setCompanyPreview(null);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Vendor ID */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Vendor ID
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
                                                        {...register("vendorId")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setValue("vendorId", file);
                                                                setVendorIdPreview(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {vendorIdPreview && (
                                                <div className="mt-2 flex items-center justify-between p-2 bg-[#1a1a1a] rounded-sm">
                                                    <span className="text-xs text-gray-300 truncate">{vendorIdPreview.name}</span>
                                                    <button
                                                        type="button"
                                                        className="text-red-400 hover:text-red-300 text-xs"
                                                        onClick={() => {
                                                            setValue("vendorId", null);
                                                            setVendorIdPreview(null);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
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
                                                        {...register("addressProof")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setValue("addressProof", file);
                                                                setAddressProofPreview(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {addressProofPreview && (
                                                <div className="mt-2 flex items-center justify-between p-2 bg-[#1a1a1a] rounded-sm">
                                                    <span className="text-xs text-gray-300 truncate">{addressProofPreview.name}</span>
                                                    <button
                                                        type="button"
                                                        className="text-red-400 hover:text-red-300 text-xs"
                                                        onClick={() => {
                                                            setValue("addressProof", null);
                                                            setAddressProofPreview(null);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Confirmation Letter */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Confirmation Letter
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
                                                        {...register("confirmationLetter")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setValue("confirmationLetter", file);
                                                                setConfirmationLetterPreview(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {confirmationLetterPreview && (
                                                <div className="mt-2 flex items-center justify-between p-2 bg-[#1a1a1a] rounded-sm">
                                                    <span className="text-xs text-gray-300 truncate">{confirmationLetterPreview.name}</span>
                                                    <button
                                                        type="button"
                                                        className="text-red-400 hover:text-red-300 text-xs"
                                                        onClick={() => {
                                                            setValue("confirmationLetter", null);
                                                            setConfirmationLetterPreview(null);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Business Promotional Material */}
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Business Promotional Material
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
                                                        {...register("businessPromotionalMaterial")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setValue("businessPromotionalMaterial", file);
                                                                setBusinessPromotionalMaterialPreview(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {businessPromotionalMaterialPreview && (
                                                <div className="mt-2 flex items-center justify-between p-2 bg-[#1a1a1a] rounded-sm">
                                                    <span className="text-xs text-gray-300 truncate">{businessPromotionalMaterialPreview.name}</span>
                                                    <button
                                                        type="button"
                                                        className="text-red-400 hover:text-red-300 text-xs"
                                                        onClick={() => {
                                                            setValue("businessPromotionalMaterial", null);
                                                            setBusinessPromotionalMaterialPreview(null);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                                            {/* Heading */}
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-1 text-center">
                                                What type of <span className="text-[#dda87c]">Products / Services</span> do you<br className="hidden sm:block" />
                                                offer?
                                            </label>

                                            {/* Subheading */}
                                            <p className="text-center text-sm">Select all that apply (Max 4)</p>

                                            {/* Error message */}
                                            {errors.productServiceCategories && (
                                                <p className="text-red-500 text-lg text-center mb-4">
                                                    {errors.productServiceCategories.message}
                                                </p>
                                            )}

                                            {/* Selected count */}
                                            <div className="text-white text-center mb-4">
                                                Selected: {(getValues("productServiceCategories")?.length || 0)}/4
                                            </div>

                                            {/* Options grid - scrollable */}
                                            <div className="max-h-[60vh] overflow-y-auto pb-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 px-2">
                                                    {productServiceCategories.map((i) => {
                                                        const currentInterests = getValues("productServiceCategories") || [];
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
                                                                                    message: "Maximum 4 interests allowed",
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
                                                                <span
                                                                    className={`border-2 border-[#dda87c] p-2 sm:p-3 rounded-md text-base sm:text-lg md:text-xl w-full text-center 
                  transition-all duration-300 
                  ${isChecked ? "bg-[#dda87c] text-black border-[#dda87c]" : "bg-black text-[#dda87c]"}
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
                                        <div ref={containerRefs[3]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                                                Do you have a <span className="text-[#dda87c]">physical location</span>,<br className="hidden sm:block" />
                                                <span className="text-[#dda87c]">work online</span> only, or <span className="text-[#dda87c]">both</span>?
                                            </label>

                                            {businessPresence.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("businessPresence")}
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
                                        <div ref={containerRefs[5]} className="space-y-4 w-full ">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb- text-center">
                                                What platforms do your <span className="text-[#dda87c]">customers<br /> engage</span> you through?
                                            </label>
                                            <p className="text-center text-sm mb-4">Select all that apply (Max 7)</p>
                                            {errors.customerEngagementPlatforms && (
                                                <p className="text-red-500 text-lg text-center mb-4">
                                                    {errors.customerEngagementPlatforms.message}
                                                </p>
                                            )}
                                            {/* Two-row layout matching the image */}
                                            <div className="flex flex-col items-center gap-4">
                                                {/* First row - 5 items */}
                                                <div className="flex flex-wrap justify-center gap-3">
                                                    {customerEngagementPlatforms.slice(0, 5).map((i) => {
                                                        const currentInterests: any = getValues("customerEngagementPlatforms") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        return (
                                                            <label
                                                                key={i}
                                                                className="cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    className="hidden peer"
                                                                    {...register("customerEngagementPlatforms")}
                                                                />
                                                                <span
                                                                    className={`border-2 rounded-md px-6 py-3 text-lg font-medium
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
                                                {customerEngagementPlatforms.length > 5 && (
                                                    <div className="flex flex-wrap justify-center gap-3 mt-4 mb-4">
                                                        {customerEngagementPlatforms.slice(5).map((i) => {
                                                            const currentInterests: any = getValues("customerEngagementPlatforms") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        className="hidden peer"
                                                                        {...register("customerEngagementPlatforms")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-6 py-3 text-lg font-medium
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
                                        <div ref={containerRefs[5]} className="space-y-4 w-full ">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-2 text-center">
                                                What platforms do your <span className="text-[#dda87c]">customers<br /> engage</span> you through?
                                            </label>
                                            <p className="text-center text-sm mb-4">Select all that apply (Max 7)</p>
                                            {errors.preferredPromotionTypes && (
                                                <p className="text-red-500 text-lg text-center mb-4">
                                                    {errors.preferredPromotionTypes.message}
                                                </p>
                                            )}
                                            {/* Two-row layout matching the image */}
                                            <div className="flex flex-col items-center gap-4">
                                                {/* First row - 5 items */}
                                                <div className="flex flex-wrap justify-center gap-3">
                                                    {preferredPromotionTypes.slice(0, 5).map((i) => {
                                                        const currentInterests: any = getValues("preferredPromotionTypes") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        return (
                                                            <label
                                                                key={i}
                                                                className="cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    className="hidden peer"
                                                                    {...register("preferredPromotionTypes")}
                                                                />
                                                                <span
                                                                    className={`border-2 rounded-md px-6 py-3 text-lg font-medium
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
                                                {customerEngagementPlatforms.length > 5 && (
                                                    <div className="flex flex-wrap justify-center gap-3 mt-4 mb-4">
                                                        {customerEngagementPlatforms.slice(5).map((i) => {
                                                            const currentInterests: any = getValues("preferredPromotionTypes") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        className="hidden peer"
                                                                        {...register("customerEngagementPlatforms")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-6 py-3 text-lg font-medium
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
                                                What is your <br /> <span className="text-[#dda87c]">
                                                    Estimated Audience Reach?
                                                </span>
                                            </label>

                                            {typicalDealValue.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("typicalDealValue")}
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
                                        <div ref={containerRefs[3]} className="space-y-2">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-6 text-center">
                                                What is your <br /> <span className="text-[#dda87c]">
                                                    Estimated Audience Reach?
                                                </span>
                                            </label>

                                            {offerFrequency.map((a) => (
                                                <label
                                                    key={a}
                                                    className="flex items-center justify-center space-x-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={a}
                                                        {...register("offerFrequency")}
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

                                    {stepQuestion === 7 && (
                                        <div ref={containerRefs[5]} className="space-y-4 w-full ">
                                            <label className="block font-medium text-white text-2xl sm:text-4xl mb-2 text-center">
                                                What platforms do your <span className="text-[#dda87c]">customers<br /> engage</span> you through?
                                            </label>
                                            <p className="text-center text-sm mb-4">Select all that apply (Max 7)</p>
                                            {errors.businessGoalsOnMenu && (
                                                <p className="text-red-500 text-lg text-center mb-4">
                                                    {errors.businessGoalsOnMenu.message}
                                                </p>
                                            )}
                                            {/* Two-row layout matching the image */}
                                            <div className="flex flex-col items-center gap-4">
                                                {/* First row - 5 items */}
                                                <div className="flex flex-wrap justify-center gap-3">
                                                    {businessGoalsOnMenu.slice(0, 5).map((i) => {
                                                        const currentInterests: any = getValues("businessGoalsOnMenu") || [];
                                                        const isChecked = currentInterests.includes(i);
                                                        return (
                                                            <label
                                                                key={i}
                                                                className="cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={i}
                                                                    checked={isChecked}
                                                                    className="hidden peer"
                                                                    {...register("businessGoalsOnMenu")}
                                                                />
                                                                <span
                                                                    className={`border-2 rounded-md px-6 py-3 text-lg font-medium
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
                                                {businessGoalsOnMenu.length > 5 && (
                                                    <div className="flex flex-wrap justify-center gap-3 mt-4 mb-4">
                                                        {businessGoalsOnMenu.slice(5).map((i) => {
                                                            const currentInterests: any = getValues("businessGoalsOnMenu") || [];
                                                            const isChecked = currentInterests.includes(i);
                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        value={i}
                                                                        checked={isChecked}
                                                                        className="hidden peer"
                                                                        {...register("customerEngagementPlatforms")}
                                                                    />
                                                                    <span
                                                                        className={`border-2 rounded-md px-6 py-3 text-lg font-medium
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
                                        onClick={() => setStep(8)}
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
                                    handleSubmit(onSubmit)
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
            <img src="/images/grad.avif" alt="" className="absolute bottom-0 left-0 " />
            <div className="absolute bottom-0 right-10 m-4 flex gap-24">
                <Star height="h-14" width="w-1"  />
                <Star width="w-1" height="h-24" />
            </div>
        </main>
    );
};

export default PartnerOnBoard;