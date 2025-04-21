import { cn } from "@/lib/utils";

const Star = ({
    width = "w-2",
    height = "h-20",
    rotations = [-10, -60, 40, 85],
    shouldRotate = false,
    className = "",
}) => {
    return (
        <div
            className={`group relative w-full h-full flex justify-center  items-center transform transition-transform duration-500 ${shouldRotate ? 'rotate-[-180deg]' : ''}  group-hover:bg-white`}
        >

            {rotations.map((angle, index) => (
                <div
                    key={index}
                    className={`${width} ${height} bg-black absolute origin-center transition-colors duration-300 ${className} ${cn("dark:bg-[#E2b489] bg-black")}`}
                    style={{ transform: `rotate(${angle}deg)` }}
                />
            ))}
        </div>
    );
};
export default Star