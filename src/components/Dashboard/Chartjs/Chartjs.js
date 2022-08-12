
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
            },

            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: { maxTicksLimit: 10 },
                },
                y: {
                    grid: {
                        drawBorder: false,
                        tickLength: 40,
                    },

                    ticks: {
                        max: 2400,
                        min: 0,
                        stepSize: 400,
                        callback: (context, index) => {
                            return context + 'k';
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            }
};
const labels = ['01 June', '02 June', '03 June', '04 June', '05 June', '06 June', '07 June'];
const datapoints = [400, 1300, 800, 1500, 300, 1200, 600, 2400];
export const data = {
    labels: labels,
    datasets: [
        {
            data: datapoints,
            borderColor: '#0e9f6e',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 1,
        },
    ],
};

export function Chartjs() {
    
  return <Line options={options} data={data} />;
}
