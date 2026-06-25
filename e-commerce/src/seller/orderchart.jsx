import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Orderchart() {
  const [orderdata, setOrderdata] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const sellerId =
    user?.seller_id;

  useEffect(() => {
    const fetchOrders =
      async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/orderperday/${sellerId}`
          );

          const result =
            await res.json();

          setOrderdata(
            result.orderdata || []
          );
        } catch (error) {
          console.log(error);
        }
      };

    if (sellerId) {
      fetchOrders();
    }
  }, [sellerId]);

  const maxOrders =
    orderdata.length > 0
      ? Math.max(
          ...orderdata.map(
            (item) =>
              Number(
                item.total_orders
              )
          )
        ) + 1
      : 5;

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },

      title: {
        display: true,
        text: "Orders Per Day",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: maxOrders,

        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const data = {
    labels: orderdata.map(
      (item) => item.day
    ),

    datasets: [
      {
        label: "Orders",

        data: orderdata.map(
          (item) =>
            Number(
              item.total_orders
            )
        ),

        borderColor:
          "rgb(255, 99, 132)",

        backgroundColor:
          "rgba(255, 99, 132, 0.5)",

        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Line
        options={options}
        data={data}
      />
    </div>
  );
}

export default Orderchart;