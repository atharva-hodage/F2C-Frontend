import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import './QCDashboard.css';
function PieChartCC({ data }) {
  const chartRef = useRef(null);


  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');


    // Ensure the previous chart is destroyed
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }


    // Create a new chart
    const newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Assigned', 'Total'],
        datasets: [{
          data: [data.pendingCount, data.assignedCount, data.totalRequests],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
      },
    });


    // Save the reference to the chart
    chartRef.current.chart = newChart;
  }, [data]);


  return (
    <canvas ref={chartRef} className="pie-chart-canvas" width="150" height="150" />
  );
}


export default PieChartCC;
