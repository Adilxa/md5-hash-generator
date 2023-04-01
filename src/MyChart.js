import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChart = ({ hash , Arr}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Calculate the sums

    // Create the chart
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['1-4', '5-8', '9-12', '13-16', '17-20', '21-24', '25-28', '29-32'],
        datasets: [{
          label: 'Number of bits',
          data: Arr,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // Cleanup the chart when the component is unmounted
    return () => chart.destroy();
  }, [hash]);

  return <canvas ref={chartRef} />;
};

export default MyChart;
