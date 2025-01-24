import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ActivityLogsChartProps {
    data: {
        getCount: number;
        createCount: number;
        updateCount: number;
        deleteCount: number;
        totalLogs: number;
    };
}

const ActivityLogsChart: React.FC<ActivityLogsChartProps> = ({ data }) => {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '45%'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['GET', 'CREATE', 'UPDATE', 'DELETE']
        },
        colors: ['#3b82f6', '#22c55e', '#eab308', '#ef4444'], // blue, green, yellow, red
        tooltip: {
            y: {
                formatter: (val) => `${val} logs`
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            markers: {
                width: 12,
                height: 12,
                radius: 12
            },
            labels: {
                colors: '#000'
            },
            itemMargin: {
                horizontal: 10
            }
        },
        series: [{
            name: 'Logs',
            data: [
                data.getCount,
                data.createCount,
                data.updateCount,
                data.deleteCount
            ]
        }]
    };

    return (
        // <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Activity Logs Distribution</h2>
                <div className="text-sm text-gray-600">
                    Total Logs: {data.totalLogs}
                </div>
            </div>
            <ReactApexChart 
                options={chartOptions} 
                series={chartOptions.series} 
                type="bar" 
                height={350} 
            />
        </div>
    );
};

export default ActivityLogsChart;