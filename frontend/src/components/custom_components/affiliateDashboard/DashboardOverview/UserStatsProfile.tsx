import React from 'react'
import { Trophy, Medal, Award } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserStatsProfile = ({ data }: { data: any }) => {
    // Top 3 + current user leaderboard data
    const leaderboardData = [
        {
            id: 1,
            name: "Jayvion Simon",
            points: "8.2k Points",
            rank: 1
        },
        {
            id: 2,
            name: "Lucian Obrien",
            points: "86.6k Points",
            rank: 2
        },
        {
            id: 3,
            name: "Deja Brady",
            points: "73.9k Points",
            rank: 3
        },
        {
            id: 4,
            name: "Linton Reddy",
            points: "43.9k Points",
            rank: 12,
            isCurrentUser: true
        }
    ]

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-5 h-5 text-yellow-500" />
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />
            case 3:
                return <Award className="w-5 h-5 text-amber-600" />
            default:
                return null
        }
    }

    return (
        <div className="bg-black text-white rounded-2xl overflow-hidden max-w-md mx-auto">
            {/* Header with gradient background */}
            <img src="/images/bg.avif" alt="" className='w-full object-contain' />

            {/* Profile section */}
            <div className="relative px-6 pb-6">
                {/* Profile image - positioned to overlap header */}
                <div className="flex justify-center -mt-8 mb-4">
                    <img
                        src="/images/p1.png"
                        alt="profile"
                        className="w-16 h-16 rounded-full object-cover border-4 border-gray-800"
                    />
                </div>

                {/* User info */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold" style={{ color: '#c99972' }}>
                        {data?.user?.name || 'Linton Reddy'}
                    </h2>
                    <p className="text-gray-400 text-sm">Affiliate</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                        <p className="text-gray-400 text-xs mb-1">Campaigns</p>
                        <p className="text-gray-400 text-xs mb-1">Running</p>
                        <p className="font-semibold" style={{ color: '#c99972' }}>
                            {data?.stats?.activeCampaigns || 3} Active
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-400 text-xs mb-1">Referral</p>
                        <p className="text-gray-400 text-xs mb-1">Conversion %</p>
                        <p className="font-semibold" style={{ color: '#c99972' }}>27%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-400 text-xs mb-1">Unread</p>
                        <p className="text-gray-400 text-xs mb-1">Notifications</p>
                        <p className="font-semibold" style={{ color: '#c99972' }}>24</p>
                    </div>
                </div>

                {/* Top Affiliates section - Only this part is modified */}
                <div className="max-h-[250px] overflow-y-auto">
                    <h3 className="font-semibold mb-3" style={{ color: '#c99972' }}>Top Affiliates</h3>
                    <div className="space-y-2">
                        {leaderboardData.map((affiliate) => (
                            <div
                                key={affiliate.id}
                                className={`flex items-center justify-between p-2 rounded-lg ${affiliate.isCurrentUser
                                    ? 'border-2 border-dashed bg-black'
                                    : 'bg-black-900'
                                    }`}
                                style={{
                                    borderColor: affiliate.isCurrentUser ? '#c99972' : 'transparent'
                                }}
                            >
                                <div className="min-w-0">
                                    <p className="font-medium truncate" style={{ color: '#c99972' }}>
                                        {affiliate.name}
                                    </p>
                                    <p className="text-gray-400 text-sm truncate">{affiliate.points}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {getRankIcon(affiliate.rank)}
                                    {affiliate.rank > 3 && (
                                        <span className="font-bold text-lg" style={{ color: '#c99972' }}>
                                            #{affiliate.rank}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStatsProfile