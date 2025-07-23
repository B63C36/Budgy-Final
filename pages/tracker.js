import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import Sidebar from './tools/sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Tracker() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Income vs. Expenses' },
    },
    scales: { y: { beginAtZero: true } }
  };

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const incomeData = new Array(12).fill(0);
    const spendingData = new Array(12).fill(0);

    transactions.forEach(t => {
      const month = new Date(t.date).getMonth();
      if (t.type === 'income') {
        incomeData[month] += t.amount;
      } else if (t.type === 'expense') {
        spendingData[month] += t.amount;
      }
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Spending',
          data: spendingData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <h1>Monthly Expense Tracker</h1>
        <div className="chart-container">
          <Bar options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}