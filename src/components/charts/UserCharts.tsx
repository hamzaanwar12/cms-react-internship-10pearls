import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface UserTypeChartProps {
    data: {
        totalUsers: number;
        adminUsers: number;
        nonAdminUsers: number;
    };
}

const UserTypeChart: React.FC<UserTypeChartProps> = ({ data }) => {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'pie',
            height: 350,
            toolbar: {
                show: false
            }
        },
        labels: ['Admin Users', 'Non-Admin Users'],
        colors: ['#ef4444', '#22c55e'], // Tailwind red-500 and green-500
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontFamily: 'inherit',
            labels: {
                colors: '#000'
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12
            },
            itemMargin: {
                horizontal: 10
            }
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} users`
            }
        }
    };

    const series = [data.adminUsers, data.nonAdminUsers];

    return (
        // <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">User Distribution</h2>
                <div className="text-sm text-gray-600">
                    Total Users: {data.totalUsers}
                </div>
            </div>
            <ReactApexChart 
                options={chartOptions} 
                series={series} 
                type="pie" 
                height={350} 
            />
        </div>
    );
};

export default UserTypeChart;