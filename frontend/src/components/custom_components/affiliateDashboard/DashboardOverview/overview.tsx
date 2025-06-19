/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Users } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  growthVsLastMonth: number;
}

interface Data {
  user: {
    name: string;
  };
  stats: Stats;
  monthlyTrend: MonthlyTrend[];
}

interface OverviewProps {
  data: Data;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Jun');

  // Get all month names for filtering
  const allMonths = data.monthlyTrend.map(m => m.month);
  const selectedIndex = allMonths.indexOf(selectedMonth);
  const filteredData = data.monthlyTrend.slice(0, selectedIndex + 1);

  const chartData = {
    labels: filteredData.map(item => item.month),
    datasets: [
      {
        label: 'Referrals',
        data: filteredData.map(item => item.referrals),
        borderColor: '#ba8d68',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        yAxisID: 'y',
      },

    ]
  };

  const chartOptions: any = {
    responsive: true,
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
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 1) { // Earnings dataset
              label += '$' + context.parsed.y;
            } else {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Referrals'
        },
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },

      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Overview</h2>
        <select
          className="border border-gray-300 rounded px-3 py-1 w-20  text-sm bg-black text-white"
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

      <div className="grid grid-cols-2 gap-4 mb-6 text-black">
        <div className="bg-[#bd906a] p-4 rounded-lg">
          <div className='flex items-center gap-2'>
            <Users size={15} strokeWidth={2.5} />
            <p className="text-base font-semibold">Referrals</p>
          </div>
          <p className="text-4xl font-bold mb-2">
            {data.stats.totalReferrals.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#171717] p-4 text-white rounded-lg ">
          <p className="text-sm text-white mb-1">Active Campaigns</p>
          <div className='flex gap-3 items-center'>
            <p className="text-4xl font-bold mb-2">
              {data.stats.activeCampaigns}
            </p>
            <div className='flex flex-col mt-2 items-start gap-0.5'>
              <div className='border border-green-300 font-medium w-fit rounded px-1.5 py-0.5 bg-[#e5ffee] text-green-500 text-xs'>
                <p>↑ {data.stats.growthVsLastMonth}%</p>
              </div>
              <p className="text-[10px] text-[#8a8a8a]">
                vs last month
              </p>
            </div>
          </div>


        </div>
      </div>

      <div className="h-64 w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Overview;