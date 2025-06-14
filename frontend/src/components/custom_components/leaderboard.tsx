"use client"

import React from "react"

import NumberOneLead from "./NumberOneLead"
import NumberTwoLead from "./NumberTwoLead"
import NumberThreeLead from "./NumberThreeLead"
import CustomButton from "./customButton"

interface LeaderboardEntry {
  rank: number
  username: string
  handle: string
  signupPoints: number
  dailyLoginPoints: number
  referralPoints: number
  wheelRotatePoints: number
  totalPoints: number
  avatar: string
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "Henrietta O' Conell",
    handle: "@henrietta",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 0,
    wheelRotatePoints: 20,
    totalPoints: 215,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 2,
    username: "James Wilson",
    handle: "@jwilson",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 5,
    wheelRotatePoints: 30,
    totalPoints: 230,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 3,
    username: "Sofia Rodriguez",
    handle: "@sofia_r",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 10,
    wheelRotatePoints: 40,
    totalPoints: 245,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 4,
    username: "Henrietta O' Conell",
    handle: "@henrietta",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 0,
    wheelRotatePoints: 20,
    totalPoints: 215,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 5,
    username: "Henrietta O' Conell",
    handle: "@henrietta",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 0,
    wheelRotatePoints: 20,
    totalPoints: 215,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 6,
    username: "Henrietta O' Conell",
    handle: "@henrietta",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 0,
    wheelRotatePoints: 20,
    totalPoints: 215,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 7,
    username: "Henrietta O' Conell",
    handle: "@henrietta",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 0,
    wheelRotatePoints: 20,
    totalPoints: 215,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 8,
    username: "Alex Johnson",
    handle: "@alexj",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 15,
    wheelRotatePoints: 10,
    totalPoints: 220,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 9,
    username: "Taylor Swift",
    handle: "@tswift",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 20,
    wheelRotatePoints: 20,
    totalPoints: 235,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 10,
    username: "John Doe",
    handle: "@johndoe",
    signupPoints: 125,
    dailyLoginPoints: 70,
    referralPoints: 5,
    wheelRotatePoints: 10,
    totalPoints: 210,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Leaderboard(): React.ReactElement {

  const filteredData: LeaderboardEntry[] = leaderboardData.filter(user => user.rank >= 4)

  const initialDisplayCount: number = 4
  const [displayCount, setDisplayCount] = React.useState<number>(initialDisplayCount)

  const handleViewMore = (): void => {
    setDisplayCount(filteredData.length)
  }

  return (
    <section className="flex flex-col mt-12 sm:mt-16 md:mt-20 mb-3 sm:mb-4 md:mb-5 w-full h-fit px-2 p-2 box-border bg-black">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 text-center md:text-left">Gamified Elements</h2>
      <div className="w-full bg-black text-white">

        {/* Mobile Podium Layout */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center gap-4 p-2 sm:p-4">
            <NumberOneLead leaderboardData={leaderboardData[0]} />
            <div className="flex gap-4 w-full justify-center">
              <NumberTwoLead leaderboardData={leaderboardData[0]} />
              <NumberThreeLead leaderboardData={leaderboardData[0]} />
            </div>
          </div>
        </div>

        {/* Desktop Podium Layout */}
        <div className="hidden md:flex max-w-6xl mx-auto p-4 gap-8 lg:gap-12 xl:gap-16 items-center justify-center">
          <NumberTwoLead leaderboardData={leaderboardData[0]} />
          <NumberOneLead leaderboardData={leaderboardData[0]} />
          <NumberThreeLead leaderboardData={leaderboardData[0]} />
        </div>

        <div className="max-w-6xl mx-auto p-2 sm:p-4">
          <div className="overflow-x-auto">
            {/* Mobile Card Layout */}
            <div className="block md:hidden space-y-3">
              {filteredData.slice(0, displayCount).map((user: LeaderboardEntry) => (
                <div
                  key={user.rank}
                  className="bg-[#241c15] hover:bg-[#272727] transition-colors rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-lg font-bold">#{user.rank}</div>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.username}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base">{user.username}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{user.handle}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-400">Signup:</span> {user.signupPoints}
                    </div>
                    <div>
                      <span className="text-gray-400">Login:</span> {user.dailyLoginPoints}
                    </div>
                    <div>
                      <span className="text-gray-400">Referral:</span> {user.referralPoints}
                    </div>
                    <div>
                      <span className="text-gray-400">Wheel:</span> {user.wheelRotatePoints}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="text-right">
                      <span className="text-[#d1a77d] font-bold text-sm sm:text-base">
                        Total: {user.totalPoints}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <table className="hidden md:table w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left">
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Rank</th>
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Username</th>
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Signup Points</th>
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Daily Login Points</th>
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Referral Points</th>
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Wheel Rotate Points</th>
                  <th className="py-3 px-2 lg:px-4 font-medium text-sm lg:text-base">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, displayCount).map((user: LeaderboardEntry) => (
                  <tr
                    key={user.rank}
                    className="bg-[#241c15] hover:bg-[#272727] transition-colors rounded-lg overflow-hidden"
                  >
                    <td className="py-3 px-2 lg:px-3 rounded-l-lg text-sm lg:text-base">{user.rank}</td>
                    <td className="py-3 px-2 lg:px-3">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.username}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm lg:text-base">{user.username}</div>
                          <div className="text-gray-400 text-xs lg:text-sm">{user.handle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 lg:px-3 text-sm lg:text-base">{user.signupPoints}</td>
                    <td className="py-3 px-2 lg:px-3 text-sm lg:text-base">{user.dailyLoginPoints}</td>
                    <td className="py-3 px-2 lg:px-3 text-sm lg:text-base">{user.referralPoints}</td>
                    <td className="py-3 px-2 lg:px-3 text-sm lg:text-base">{user.wheelRotatePoints}</td>
                    <td className="py-3 px-2 lg:px-3 rounded-r-lg text-sm lg:text-base">{user.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {displayCount < filteredData.length && (
              <div className="flex justify-center mt-4 sm:mt-6 mb-2 sm:mb-4">
                <CustomButton label="View more" onClick={handleViewMore} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}