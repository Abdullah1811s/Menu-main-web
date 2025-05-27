import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff, Phone, Gift } from 'lucide-react';


const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    countryCode: z.string().nonempty("Country code is required"),
    mobileNumber: z.string()
      .min(9, "Please enter a valid mobile number")
      .regex(/^\d+$/, "Mobile number must be numeric"),
    referralCode: z.string().optional(),
    streetAddress: z.string().min(2, "Street Address is required"),
    suburb: z.string().min(2, "Suburb is required"),
    province: z.string().min(2, "Province is required"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().min(4, "Postal Code is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>

export default function UserOnBoard() {
  const [step, setStep] = useState<number>(1)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  const defaultValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+27",
    mobileNumber: "",
    referralCode: "",
    streetAddress: "",
    suburb: "",
    province: "",
    city: "",
    postalCode: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const handleStepChange = async (newStep: number) => {
    if (newStep < step) {

      setStep(newStep);
      return;
    }
    let isValid = false;
    if (newStep === 2) {
      isValid = await trigger([
        "fullName",
        "email",
        "password",
        "confirmPassword",
        "countryCode",
        "mobileNumber",
      ]);
    } else if (newStep === 3) {
      isValid = await trigger([
        "streetAddress",
        "suburb",
        "province",
        "city",
        "postalCode",
      ]);
    }
    if (isValid) {
      setStep(newStep);
    }
  };

  const onSubmit = async (data: SignupFormData, e?: React.BaseSyntheticEvent) => {
    if (e) e.preventDefault();
    console.log("Form submitted:", data);

  };

  const isStepComplete = (stepNumber: number) => {
    const values = getValues();

    if (stepNumber === 1) {
      return (
        values.fullName &&
        values.email &&
        values.password &&
        values.confirmPassword &&
        values.countryCode &&
        values.mobileNumber &&
        !errors.fullName &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword &&
        !errors.countryCode &&
        !errors.mobileNumber
      );
    }

    if (stepNumber === 2) {
      return (
        values.streetAddress &&
        values.suburb &&
        values.province &&
        values.city &&
        values.postalCode &&
        !errors.streetAddress &&
        !errors.suburb &&
        !errors.province &&
        !errors.city &&
        !errors.postalCode
      );
    }

    return false;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181818]">
      <img src="/images/login.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full p-5 bg-[#181818] rounded-lg shadow-[0_0_10px_#c59f7aaa] mt-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="bg-black p-2 w-fit rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            <img src="/images/wheel.png" alt="" />
          </div>
          <h1 className="text-center text-3xl text-white">Let's Get You On Board</h1>
          <p className="text-gray-400 text-xs text-center mb-4">
            Already have an account?{" "}
            <Link to="/Login" className="text-[#c59f7a] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full">
          <div className="relative flex justify-between w-full max-w-md mx-auto">
            <div className="absolute h-1 bg-white top-3 left-0 right-0 -translate-y-1/2"></div>
            <div
              className="absolute h-1 bg-[#d9a57a] top-3 left-0 -translate-y-1/2"
              style={{ width: `${(step - 1) / (4 - 1) * 100}%` }}
            ></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className={`w-6 h-6 text-black flex items-center justify-center rounded-full font-bold z-10 cursor-pointer
                  ${step >= n ? 'bg-[#d9a57a] text-black text-center' : 'bg-white text-center text-black'}
                  ${isStepComplete(n) ? 'bg-white' : ''}`}
                onClick={() => handleStepChange(n)}
              >
                {n}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <>
                  <div className="relative w-full mb-2.5 rounded-md">
                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      className="border bg-black rounded-md text-white px-9 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Enter your full name"
                      {...register('fullName')}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

                  <div className="relative w-full mb-2.5 rounded-md">
                    <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      className="border bg-black rounded-md text-white px-9 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Enter your email"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                  <div className="relative w-full mb-2.5 rounded-md">
                    <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="border bg-black rounded-md text-white px-9 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Enter password"
                      {...register('password')}
                    />
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                  <div className="relative w-full mb-2.5 rounded-md">
                    <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="border bg-black rounded-md text-white px-9 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Confirm password"
                      {...register('confirmPassword')}
                    />
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                  )}

                  <div className="relative w-full mb-2.5 flex gap-2">
                    <div className="w-1/3 relative">
                      <select
                        className="border bg-black text-white py-2 pl-2 pr-4 w-full rounded-md"
                        {...register('countryCode')}
                      >
                        <option value="+27">🇿🇦 +27 (SA)</option>
                        <option value="+966">🇸🇦 +966 (KSA)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                        <option value="+91">🇮🇳 +91 (IN)</option>
                      </select>
                    </div>
                    <div className="relative w-2/3">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        className="border bg-black rounded-md text-white px-9 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                        placeholder="Mobile number"
                        {...register('mobileNumber')}
                      />
                    </div>
                  </div>

                  {(errors.mobileNumber || errors.countryCode) && (
                    <p className="text-red-500 text-sm">
                      {errors.countryCode?.message || errors.mobileNumber?.message}
                    </p>
                  )}

                  <div className="relative w-full mb-2.5 rounded-md">
                    <Gift className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      className="border bg-black rounded-md text-white px-9 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Referral Code (optional)"
                      {...register('referralCode')}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStepChange(2)}
                    className="w-full bg-[#c59f7a] text-black font-semibold py-2 rounded-md mt-4 hover:bg-[#b68856] transition"
                  >
                    Next
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="relative w-full mb-2.5 rounded-md">
                    <input
                      className="border bg-black rounded-md text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Street Address"
                      {...register('streetAddress')}
                    />
                  </div>
                  {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress.message}</p>}

                  {/* Province Dropdown */}
                  <div className="relative w-full mb-2.5 rounded-md">
                    <select
                      className="border bg-black rounded-md text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      {...register('province')}
                      onChange={(e) => {
                        const selectedProvince = e.target.value;
                        setSelectedProvince(selectedProvince);
                        setValue('province', selectedProvince);
                        setValue('city', '');
                      }}
                    >
                      <option value="">Select Province</option>
                      {Object.keys(provinceCities).map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}

                  {/* City Dropdown */}
                  <div className="relative w-full mb-2.5 rounded-md">
                    <select
                      className="border bg-black rounded-md text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      {...register('city')}
                      disabled={!selectedProvince}
                    >
                      <option value="">Select City</option>
                      {selectedProvince &&
                        provinceCities[selectedProvince]?.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

                  {/* Suburb/Town */}
                  <div className="relative w-full mb-2.5 rounded-md">
                    <input
                      className="border bg-black rounded-md text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Suburb/Town"
                      {...register('suburb')}
                    />
                  </div>
                  {errors.suburb && <p className="text-red-500 text-sm">{errors.suburb.message}</p>}

                  {/* Postal Code */}
                  <div className="relative w-full mb-2.5 rounded-md">
                    <input
                      className="border bg-black rounded-md text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#d9a57a] focus:border-[#d9a57a]"
                      placeholder="Postal Code"
                      {...register('postalCode')}
                    />
                  </div>
                  {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStepChange(1)}
                      className="w-1/2 bg-gray-500 text-white font-semibold py-2 rounded-md mt-4 hover:bg-gray-600 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-[#c59f7a] text-black font-semibold py-2 rounded-md mt-4 hover:bg-[#b68856] transition"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}