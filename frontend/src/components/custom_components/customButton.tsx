import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Star from "./Star";

interface DecoratedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    className?: string;
    shouldRotate?: boolean;
}

const CustomButton: React.FC<DecoratedButtonProps> = ({
    label,
    onClick,
    className = "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    shouldRotate = true,
    ...rest
}) => {
    const [exploreRotate, setExploreRotate] = useState<boolean>(false);
    const rotateStar = () => {
        setExploreRotate(prev => !prev);
    }
    return (
        <button
            onClick={onClick}
            onMouseEnter={rotateStar}
            className={cn(
                "group bg-transparent relative border rounded px-6 py-3 transition-transform duration-500 hover:scale-95 hidden sm:flex items-center justify-center text-xl font-medium  overflow-hidden hover:bg-black dark:border-[#e2b489] dark:hover:text-black dark:hover:bg-[#e2b489] border-black hover:text-white",
                className
            )}
            {...rest}
        >
            <span className="z-10">{label}</span>

            {/* Built-in Star Decorations */}
            <div className="absolute bottom-[1px] right-[3px] z-0">
                <Star
                    width="w-[3px]"
                    height="h-10"
                    rotations={[97, 50, -60, -20]}
                    shouldRotate={exploreRotate}
                    className={cn("dark:group-hover:bg-black group-hover:bg-white")}
                    className1='flex justify-center  items-center'
                />
            </div>
            <div className="absolute bottom-[-2px] right-10 z-0">
                <Star
                    width="w-[3px]"
                    height="h-7"
                    rotations={[-10, -60, 40, 90]}
                    shouldRotate={exploreRotate}
                    className={cn("dark:group-hover:bg-black group-hover:bg-white")}
                    className1='flex justify-center  items-center'
                />
            </div>
        </button>
    );
};

export default CustomButton;
