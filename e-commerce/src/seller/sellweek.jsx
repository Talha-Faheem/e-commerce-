import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Sellweek() {
  const [salesData, setSalesData] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const sellerId =
    user?.seller_id;

  useEffect(() => {
    const getSalesData =
      async () => {
        try {
          const res = await fetch(
            `https://e-commerce-backend-l9wv.onrender.com/salesperday/${sellerId}`
          );

          const data =
            await res.json();

          setSalesData(
            data.salesdata || []
          );
        } catch (error) {
          console.log(error);
        }
      };

    if (sellerId) {
      getSalesData();
    }
  }, [sellerId]);

  const maxRevenue =
    salesData.length > 0
      ? Math.max(
          ...salesData.map(
            (item) =>
              Number(
                item.revenue
              )
          )
        ) + 100
      : 1000;

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },

      title: {
        display: true,
        text: "Sales Revenue (Last 7 Days)",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: maxRevenue,
      },
    },
  };

  const chartData = {
    labels: salesData.map(
      (item) => item.day
    ),

    datasets: [
      {
        label: "Revenue ($)",

        data: salesData.map(
          (item) =>
            Number(
              item.revenue
            )
        ),

        borderColor:
          "rgb(75, 192, 192)",

        backgroundColor:
          "rgba(75, 192, 192, 0.5)",

        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Line
        options={options}
        data={chartData}
      />
    </div>
  );
}

export default Sellweek;