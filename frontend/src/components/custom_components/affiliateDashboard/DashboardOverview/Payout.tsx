/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Wallet } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Banknote } from 'lucide-react';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyTrend {
  month: string;
  referrals: number;
  earnings: number;
}

interface Stats {
  totalReferrals: number;
  activeCampaigns: number;
  earningsThisMonth: number;
  growthVsLastMonth: number;
  pendingPayouts: number;
}

interface Data {
  user: {
    name: string;
    referralLink: string;
  };
  stats: Stats;
  monthlyTrend: MonthlyTrend[];
}

interface PayoutProps {
  data: Data;
}

const Payout: React.FC<PayoutProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Sep');

  const allMonths = data.monthlyTrend.map(m => m.month);
  const selectedIndex = allMonths.indexOf(selectedMonth);
  const filteredData = data.monthlyTrend.slice(0, selectedIndex + 1);

  const chartData = {
    labels: filteredData.map(item => item.month),
    datasets: [
      {
        label: 'Earnings ( R)',
        data: filteredData.map(item => item.earnings),
        backgroundColor: '#ba8d68',
        borderColor: '#ba8d68',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            label += ' R' + context.parsed.y;
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Earnings ( R)'
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return ' R' + value;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-lg font-semibold">Payout</h2>
        <select
          className="border border-gray-300 rounded px-3 py-1 w-20 text-sm bg-black text-white"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {data.monthlyTrend.map((monthData) => (
            <option
              key={monthData.month}
              value={monthData.month}
              className="bg-black text-white"
            >
              {monthData.month}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 shrink-0 text-black">
        <div className="bg-[#bd906a] p-4 rounded-lg">
          <div className='flex items-center gap-2'>
            <Banknote size={15} strokeWidth={2.5} />
            <p className="text-base font-semibold">This Month</p>
          </div>
          <p className="text-4xl font-bold mb-2">
            R{data.stats.earningsThisMonth.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#171717] p-4 text-white rounded-lg">
          <div className='flex gap-2 items-center '>
            <Wallet size={15}/>
          <p className="text-sm text-white mb-1">Pending Payouts</p>
          </div>
          <div className='flex gap-3 items-center'>
            <p className="text-4xl font-bold mb-2">
              R{data.stats.pendingPayouts}
            </p>
            <div className='flex flex-col mt-2 items-start gap-0.5'>
              <div className='border border-green-300  w-fit rounded py-0.5 bg-[#e5ffee] text-green-500 text-xs'>
                <p>↑ {data.stats.growthVsLastMonth}%</p>
              </div>
              <p className="text-[10px] text-[#8a8a8a]">vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Make the chart take remaining space and scroll if needed */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};


export default Payout;