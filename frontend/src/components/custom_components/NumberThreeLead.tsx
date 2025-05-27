import { FaTrophy } from 'react-icons/fa';
import './Topthree.css'

interface LeaderboardDataInterface {
    rank?: number;
    username?: string;
    handle?: string;
    signupPoints?: number;
    dailyLoginPoints?: number;
    referralPoints?: number;
    wheelRotatePoints?: number;
    totalPoints?: number;
    avatar?: string;
    imgSrc?: string
}


interface TopThreeLeadProps {
    leaderboardData: LeaderboardDataInterface;
}


const NumberThreeLead: React.FC<TopThreeLeadProps> = ({ leaderboardData }) => {
    return (
        <div className="w-fit p-3 h-fit mt-16 flex flex-col gap-2.5">
            <div className="h-[20%] flex flex-col items-center justify-between p-2.5">
                <img
                    src={`/images/p1.png`}
                    alt="profile pic"
                    className="w-16 h-16 rounded-sm object-cover"
                />
                <p className="text-white mt-2 text-xl">{leaderboardData.username}</p>
            </div>
            <div className="relative h-[60%] p-1.5">
                <img src="/images/lead.avif" alt="" className="object-contain w-52" />
                <div className="bg-[#7b6b4a] p-2.5 z-10  rounded-sm inline-flex items-center justify-center absolute -top-[0.2px] left-22 ">
                   <FaTrophy size={36} className="text-white" />
                </div>

                <div className="relative gradientTop h-full flex flex-col items-center gap-1 justify-center p-2.5 w-52">
                    <div className="flex flex-col w-full gap-1.5 mt-6 items-stretch">
                        <div className="gradient2 rounded-sm text-center p-3 flex-1">
                            <p className="text-4xl text-[#ffd4b1]">300</p>
                            <p className="text-base">Total Points</p>
                        </div>
                        <div className="text-white p-3 flex-1 flex items-center justify-between gap-3">
                            <div className="flex-1 p-2">
                                <p className="text-3xl">{leaderboardData.signupPoints}</p>
                                <p className="text-base">Signup<br />point</p>
                            </div>
                            <div className="flex-1 p-2">
                                <p className="text-3xl">{leaderboardData.dailyLoginPoints}</p>
                                <p className="text-base">login point</p>
                            </div>
                        </div>

                        <div className="text-white p-1 flex-1 flex flex-col gap-2.5">
                            <div className="w-full bg-[#614b38] rounded-sm p-2 flex gap-1 items-center justify-center">
                                <p className="text-[#ffd4b0] text-3xl">{leaderboardData.referralPoints}</p>
                                <p className="text-[#ffd4b0] text-base">Referral Points</p>
                            </div>
                            <div className="w-full bg-[#614b38] rounded-sm p-3 flex gap-1 items-center justify-center">
                                <p className="text-[#ffd4b0] text-3xl">{leaderboardData.wheelRotatePoints}</p>
                                <p className="text-[#ffd4b0] text-base ">Wheel Rotate Point</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default NumberThreeLead;
