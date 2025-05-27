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


const NumberOneLead: React.FC<TopThreeLeadProps> = ({ leaderboardData }) => {
    return (
        <div className="w-fit p-4 h-fit flex flex-col gap-3">
            <div className={`h-[20%] flex flex-col items-center justify-between p-3`}>

                <img
                    src={`/images/p1.png`}
                    alt="profile pic"
                    className="w-24 h-24 rounded-sm object-cover"
                />
                <p className="text-white mt-2 text-2xl">{leaderboardData.username}</p>
            </div>
            <div className="relative h-[80%] p-1">
                <img src="/images/lead.avif" alt="" className="object-contain w-80" />
                <div className="bg-[#fdd17a] p-3 z-10  rounded-sm inline-flex items-center justify-center absolute -top-[0.2px] left-32">
                   <FaTrophy size={36} className="text-[#4d4239]" />
                </div>

                <div className="relative gradientTop h-full flex flex-col items-center gap-3 justify-center p-3">
                    <div className="flex flex-col w-full gap-2 mt-6 items-stretch">
                        <div className="gradient2 rounded-sm text-center p-4 flex-1">
                            <p className='text-4xl text-[#ffd4b1] '>300</p>
                            <p>Total Points</p>
                        </div>
                        <div className="text-white p-4 flex-1 flex items-center justify-between gap-4">
                            <div className="flex-1   p-3 ">
                                <p className="text-4xl">{leaderboardData.signupPoints}</p>
                                <p className="text-xl">Signup<br />point</p>
                            </div>
                            <div className="flex-1  p-3 ">
                                <p className="text-4xl">{leaderboardData.dailyLoginPoints}</p>
                                <p className="text-xl"> login<br />point</p>
                            </div>
                        </div>

                        <div className=" text-white p-1 flex-1 flex flex-col gap-3">
                            <div
                                className='w-full bg-[#614b38] rounded-sm p-2  flex gap-1 items-center justify-center'
                            >
                                <p className={`text-[#ffd4b0] text-4xl`}>{leaderboardData.referralPoints}</p>
                                <p className={`text-[#ffd4b0]  text-2xl`}>Referral Points</p>
                            </div>
                            <div
                                className='w-full bg-[#614b38] rounded-sm p-3 flex gap-1 items-center justify-center'
                            >

                                <p className={`text-[#ffd4b0] text-4xl`}>{leaderboardData.wheelRotatePoints}</p>
                                <p className={`text-[#ffd4b0]  text-2xl`}>Wheel Rotate Point</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};


export default NumberOneLead;
