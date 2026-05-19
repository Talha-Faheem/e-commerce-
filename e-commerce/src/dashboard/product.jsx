import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

import {
  Eye,
  ShoppingCart,
  Star,
  DollarSign,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ProductAnalytics = () => {
  const stats = [
    {
      title: "Total Views",
      value: "2,064",
      icon: <Eye size={28} />,
      bg: "from-blue-500 to-blue-600",
    },
    {
      title: "Avg Conversion",
      value: "10.8%",
      icon: <ShoppingCart size={28} />,
      bg: "from-emerald-500 to-green-600",
    },
    {
      title: "Avg Rating",
      value: "4.5",
      icon: <Star size={28} />,
      bg: "from-purple-500 to-fuchsia-600",
    },
    {
      title: "Best Seller",
      value: "Leather Crossbody",
      icon: <DollarSign size={28} />,
      bg: "from-orange-500 to-orange-600",
    },
  ];

  const productPerformanceData = {
    labels: [
      "Smart Watch",
      "Wireless Headphones",
      "Running Shoes",
      "Coffee Table",
      "Yoga Mat",
      "Leather Crossbody",
    ],

    datasets: [
      {
        label: "Sales",
        data: [100, 115, 120, 122, 30, 80],
        backgroundColor: "#8b5cf6",
        borderRadius: 8,
      },
    ],
  };

  const revenueCategoryData = {
    labels: ["Sports", "Fashion", "Home & Garden", "Electronics"],

    datasets: [
      {
        data: [34, 18, 42, 5],

        backgroundColor: [
          "#6366f1",
          "#f59e0b",
          "#ec4899",
          "#8b5cf6",
        ],
      },
    ],
  };

  const ratingData = {
    labels: ["5★", "4★", "3★", "2★", "1★"],

    datasets: [
      {
        label: "Ratings",
        data: [45, 32, 15, 5, 3],
        backgroundColor: "#f59e0b",
        borderRadius: 6,
      },
    ],
  };

  const topProducts = [
    {
      rank: "#1",
      name: "Leather Crossbody Bag",
      views: "470",
      conversion: "14%",
      price: "$89.99",
      rating: "4.3",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    },

    {
      rank: "#2",
      name: "Modern Coffee Table",
      views: "461",
      conversion: "11%",
      price: "$299.99",
      rating: "4.6",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200",
    },

    {
      rank: "#3",
      name: "Running Shoes Ultra",
      views: "381",
      conversion: "17%",
      price: "$129.99",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    },

 
  ];

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="w-[90%] mx-auto flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-medium mb-2">
            Product Analytics
          </h2>

          <p className="text-gray-500">
            Detailed insights into your product performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${item.bg} rounded-3xl p-6 text-white shadow-lg`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <p className="text-md opacity-90">
                {item.title}
              </p>

              <h2 className="text-2xl mt-2">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Product Performance
            </h2>

            <div className="h-[350px]">
              <Bar
                data={productPerformanceData}
                options={{
                  ...chartOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Revenue by Category
            </h2>

            <div className="h-[350px] flex items-center justify-center">
              <Pie
                data={revenueCategoryData}
                options={{
                  responsive: true,

                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Rating Distribution
            </h2>

            <div className="h-[320px]">
              <Bar
                data={ratingData}
                options={{
                  ...chartOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Top Performing Products
            </h2>

            <div className="space-y-5">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-violet-500 to-purple-600 text-white font-bold flex items-center justify-center">
                      {product.rank}
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-lg">
                        {product.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {product.views} views •{" "}
                        {product.conversion} conversion
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h3 className="font-semibold text-lg">
                      {product.price}
                    </h3>

                    <p className="text-yellow-500 text-sm">
                      ★ {product.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;