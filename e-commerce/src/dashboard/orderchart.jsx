import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Tooltip,
  Legend
);

function OrderChart({ sellerId }) {
  const [orderdata, setorderdata] = useState([]);

  const orderdetial = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/orderperweek/${sellerId}`
      );

      const result = await res.json();

      setorderdata(result.orderdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sellerId) {
      orderdetial();
    }
  }, [sellerId]);

  const chartData = {
    labels: orderdata?.map((item) => item.day),
    datasets: [
      {
        label: "Revenue",
        data: orderdata?.map((item) => item.total_amount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} />
    </div>
  );
}

export default OrderChart;