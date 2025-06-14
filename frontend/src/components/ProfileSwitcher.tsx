import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";

interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string;
    availableRoles: string[];
}

const ProfileSwitcher = () => {
    const token = localStorage.getItem("frontendToken");
    const [decoded, setDecoded] = useState<JwtPayload | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const d = jwtDecode<JwtPayload>(token);
                setDecoded(d);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, [token]);

    const handleRoleClick = (role: string) => {
        console.log("Switch to role:", role);
        // In the future you can send this to your backend here
        setIsPopoverOpen(false); // optionally close popover on selection
    };

    return (
        <div className="flex gap-2 items-center justify-center">
            <img src="/images/p1.png" alt="" className="h-8 w-8 rounded-full" />
            <h1 className="text-2xl font-medium text-white">
                {decoded?.name || "Name"}
            </h1>

            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <button className="bg-[#1e1e1e] text-white text-sm font-semibold w-25 py-1 px-4 rounded-md">
                            {decoded?.role || "affiliate"}
                        </button>
                        <div className="text-white">
                            {isPopoverOpen ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-52 p-3 bg-black border border-[#bf9571] text-[#bf9571] rounded-md shadow-lg">
                    <h3 className="text-sm font-semibold mb-2">Switch Role</h3>
                    <ul className="space-y-1">
                        {(decoded?.availableRoles || ["user", "affiliate", "vendor"]).map(
                            (role) => (
                                <li
                                    key={role}
                                    onClick={() => handleRoleClick(role)}
                                    className="cursor-pointer text-sm hover:bg-[#1e1e1e] px-3 py-1 rounded-md transition"
                                >
                                    {role}
                                </li>
                            )
                        )}
                    </ul>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ProfileSwitcher;
