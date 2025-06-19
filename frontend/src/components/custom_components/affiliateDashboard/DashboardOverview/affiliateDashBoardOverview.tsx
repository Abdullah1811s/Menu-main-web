import { useState } from "react";
import CustomButton from "../../customButton";
import Payout from "./Payout";
import Overview from "./overview";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Copy } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import UserStatsProfile from "./UserStatsProfile";

const data = {
  "user": {
    "name": "Linton",
    "referralLink": "http://themenuportal.co.za/isi-hodsndri21"
  },
  "stats": {
    "totalReferrals": 1293,
    "activeCampaigns": 3,
    "earningsThisMonth": 2400,
    "growthVsLastMonth": 36.8,
    "pendingPayouts": 850
  },
  "monthlyTrend": [
    { "month": "Jan", "referrals": 120, "earnings": 800 },
    { "month": "Feb", "referrals": 145, "earnings": 950 },
    { "month": "Mar", "referrals": 132, "earnings": 880 },
    { "month": "Apr", "referrals": 160, "earnings": 1050 },
    { "month": "May", "referrals": 185, "earnings": 1200 },
    { "month": "Jun", "referrals": 210, "earnings": 1400 },
    { "month": "Jul", "referrals": 198, "earnings": 1300 },
    { "month": "Aug", "referrals": 175, "earnings": 1150 },
    { "month": "Sep", "referrals": 168, "earnings": 1100 }
  ],
  "recentActivity": [
    {
      "user": "John M.",
      "action": "Completed a payment",
      "earned": 50,
      "timestamp": "2 hours ago"
    },
    {
      "user": "Sarah K.",
      "action": "Signed up",
      "earned": 25,
      "timestamp": "5 hours ago"
    },
    {
      "user": "Mike T.",
      "action": "Completed a payment",
      "earned": 75,
      "timestamp": "1 day ago"
    }
  ],
  "campaigns": [
    {
      "id": 1,
      "name": "Summer Special",
      "status": "active",
      "startDate": "2023-05-15",
      "referrals": 342
    },
    {
      "id": 2,
      "name": "New User Bonus",
      "status": "completed",
      "startDate": "2023-06-01",
      "referrals": 215
    },
    {
      "id": 3,
      "name": "Premium Upgrade",
      "status": "active",
      "startDate": "2023-04-10",
      "referrals": 178
    }
  ]
};

const AffiliateDashBoardOverview = () => {
  const [referralLink, setReferralLink] = useState<string>(data.user.referralLink);
  const [originalLink] = useState(referralLink); // store original value
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Handle input change
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setReferralLink(newValue);
    setShowSaveButton(newValue !== originalLink); // Show Save if changed
  };

  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral Link has been copied to clipboard")
  };

  // referral link change send to backend
  const handleSaveLink = async () => {
    try {
      await axios.post("/your-backend-endpoint", { referralLink });
      alert("Link updated successfully!");
      setShowSaveButton(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update link.");
    }
  };

  const handleCreateCompetitions = async () => {
    alert("Function will be implemented later!!")
  }

  return (
    <section className="w-full h-screen flex flex-col items-start justify-center gap-2 ">
      <div className="h-[10%] w-full">
        <h1 className="text-4xl font-medium">Hi {data.user.name}!</h1>
        <p className="text-[#a4a4a4]">
          Here's how your campaigns and referrals are doing today!
        </p>
      </div>
      <div className="grid grid-cols-4 grid-rows-7 gap-7 w-full h-[90%]">

        {/* Overview section */}
        <div className="col-span-2 h-full row-span-5 border rounded-lg p-4 border-[#ba8d68]">
          <Overview data={data} />
        </div>

        {/* payout */}
        <div className="col-span-2 row-span-5 col-start-3 row-start-1 border border-[#ba8d68] rounded-lg p-4 ">
          <Payout data={data} />
        </div>

        {/* completed campaigns and activity */}
        <div className="col-span-2 bg-[#0f0f0f] row-span-2 col-start-1 row-start-6 rounded-lg flex gap-2 h-full">

          {/* Completed Campaigns */}
          <div className="flex-1 h-full rounded-lg border border-[#ba8d68] flex items-center justify-center p-6 bg-[#121212]">
            <div className="flex items-center gap-4">
              <div style={{ width: 120, height: 80 }}>
                <CircularProgressbar
                  value={(data.campaigns.filter(c => c.status === "completed").length / data.campaigns.length) * 100}
                  text={`${data.campaigns.filter(c => c.status === "completed").length}`}
                  strokeWidth={10}
                  styles={buildStyles({
                    textSize: '24px',
                    textColor: '#ffffff',
                    pathColor: '#ba8d68',
                    trailColor: '#2e2e2e',
                  })}
                />
              </div>
              <div>
                <p className="text-4xl font-semibold text-white">
                  {data.campaigns.filter(c => c.status === "completed").length}
                </p>
                <p className="text-sm text-gray-400">Completed Campaigns</p>
              </div>
            </div>
          </div>

          {/* Last Activity */}
          <div className="flex-1 h-full rounded-lg border border-[#ba8d68] p-4 bg-[#121212] flex flex-col justify-center">
            <p className="text-sm text-gray-400 mb-1">Last Activity</p>
            <p className="text-xl font-semibold text-white">{data.recentActivity[0].user}</p>
            <p className="text-sm text-gray-300">
              {data.recentActivity[0].action} - you earned <span className="text-[#ba8d68]">R{data.recentActivity[0].earned}</span>
            </p>
            <p className="text-sm text-[#ba8d68] mt-3">{data.recentActivity[0].timestamp}</p>
          </div>

        </div>



        <div className="col-span-2 row-span-2 col-start-3 row-start-6 border border-[#ba8d68] rounded-lg  flex flex-col items-center justify-center">

          <div className="flex flex-col gap-2">
            <div className="flex items-center bg-[#1a1a1a] border border-[#ba8d68] rounded-md overflow-hidden mb-4">
              <input
                type="text"
                value={referralLink}
                onChange={handleLinkChange}
                className="bg-transparent text-white px-4 py-2 w-full outline-none"
              />
              {showSaveButton ? (
                <button
                  onClick={handleSaveLink}
                  className="bg-[#ba8d68] hover:bg-[#cfa883] text-black font-semibold px-2 py-1 mr-1 rounded-lg ml-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleCopyLink}
                  className="bg-[#1a1a1a] hover:bg-[#3a3a3a] rounded-lg text-[#c79b74] px-3 py-2"
                >
                  <Copy size={15} />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <CustomButton
                label="Create Competitions"
                className="flex justify-center text-[#c79b74] items-center w-fit h-12 rounded-md border-2 border-[#c79b74] hover:border-[#b48761] transition-colors duration-500"
                onClick={handleCreateCompetitions}
              />
              <CustomButton
                label="WithDraw"
                className="flex justify-center text-[#c79b74] items-center w-fit h-12 rounded-md border-2 border-[#c79b74] hover:border-[#b48761] transition-colors duration-500"
                onClick={handleCreateCompetitions}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-7 col-start-5  row-start-1 border border-[#ba8d68]  rounded-lg  ">
         <UserStatsProfile data={data} />
        </div>
      </div>
    </section >
  );
};

export default AffiliateDashBoardOverview;