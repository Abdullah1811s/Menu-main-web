import { cn } from "@/lib/utils";

const Star = ({
    width = "w-2",
    height = "h-20",
    rotations = [-10, -60, 40, 85],
    shouldRotate = true,
    className = "",
    className1 = "",
}) => {
    return (
        <div
            className={`group relative w-full h-full transition-transform duration-500 ${className1} ${shouldRotate ? 'rotate-180' : ''}`}
            style={{ transformOrigin: 'center center' }} // This ensures it rotates in place
        >


            {rotations.map((angle, index) => (
                <div
                    key={index}
                    className={`${width} ${height} bg-black absolute origin-center transition-colors duration-300  ${cn("dark:bg-[#E2b489] bg-black")} ${className}`}
                    style={{ transform: `rotate(${angle}deg)` }}
                />
            ))}
        </div>
    );
};
export default Star