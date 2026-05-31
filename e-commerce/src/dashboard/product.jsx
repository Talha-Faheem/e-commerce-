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

import {
  Bar,
  Pie,
} from "react-chartjs-2";

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

function ProductAnalytics({ data }) {
  const stats = [
    {
      title: "Revenue",
      value: `$${Number(
        data?.revenue || 0
      ).toFixed(2)}`,
      icon: <DollarSign size={28} />,
      bg: "from-blue-500 to-blue-600",
    },
    {
      title: "Orders",
      value: data?.totalorder || 0,
      icon: <ShoppingCart size={28} />,
      bg: "from-emerald-500 to-green-600",
    },
    {
      title: "Rating",
      value: Number(
        data?.seller?.[0]?.rating || 0
      ).toFixed(1),
      icon: <Star size={28} />,
      bg: "from-purple-500 to-fuchsia-600",
    },
    {
      title: "Products",
      value:
        data?.products?.length || 0,
      icon: <Eye size={28} />,
      bg: "from-orange-500 to-orange-600",
    },
  ];

  const productPerformanceData = {
    labels:
      data?.topProducts?.map(
        (item) => item.name
      ) || [],
    datasets: [
      {
        label: "Stock",
        data:
          data?.topProducts?.map(
            (item) =>
              Number(
                item.stock || 0
              )
          ) || [],
        backgroundColor:
          "#8b5cf6",
        borderRadius: 8,
      },
    ],
  };

  const revenueCategoryData = {
    labels:
      data?.topProducts?.map(
        (item) => item.name
      ) || [],
    datasets: [
      {
        data:
          data?.topProducts?.map(
            (item) =>
              Number(
                item.price || 0
              )
          ) || [],
        backgroundColor: [
          "#6366f1",
          "#f59e0b",
          "#ec4899",
          "#8b5cf6",
          "#14b8a6",
          "#ef4444",
        ],
      },
    ],
  };

  const ratingData = {
    labels:
      data?.topProducts?.map(
        (item) => item.name
      ) || [],
    datasets: [
      {
        label: "Rating",
        data:
          data?.topProducts?.map(
            (item) =>
              Number(
                item.rating || 0
              )
          ) || [],
        backgroundColor:
          "#f59e0b",
        borderRadius: 6,
      },
    ],
  };

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
            Detailed insights into
            your product performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map(
            (item, index) => (
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

                <h2 className="text-2xl mt-2 font-bold">
                  {item.value}
                </h2>
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Product Stock
            </h2>

            <div className="h-[350px]">
              <Bar
                data={
                  productPerformanceData
                }
                options={{
                  ...chartOptions,
                  maintainAspectRatio:
                    false,
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Product Price
              Distribution
            </h2>

            <div className="h-[350px] flex items-center justify-center">
              <Pie
                data={
                  revenueCategoryData
                }
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position:
                        "right",
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
              Product Ratings
            </h2>

            <div className="h-[320px]">
              <Bar
                data={ratingData}
                options={{
                  ...chartOptions,
                  maintainAspectRatio:
                    false,
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Top Rated Products
            </h2>

            <div className="space-y-5">
              {data?.topProducts
                ?.length > 0 ? (
                data.topProducts.map(
                  (
                    product,
                    index
                  ) => (
                    <div
                      key={
                        product.id
                      }
                      className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-violet-500 to-purple-600 text-white font-bold flex items-center justify-center">
                          #
                          {index +
                            1}
                        </div>

                        <img
                          src={
                            product.thumbnail ||
                            "https://via.placeholder.com/100"
                          }
                          alt={
                            product.name
                          }
                          className="w-14 h-14 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-lg">
                            {
                              product.name
                            }
                          </h3>

                          <p className="text-gray-500 text-sm">
                            Stock:{" "}
                            {
                              product.stock
                            }
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <h3 className="font-semibold text-lg">
                          $
                          {Number(
                            product.price ||
                              0
                          ).toFixed(
                            2
                          )}
                        </h3>

                        <p className="text-yellow-500 text-sm">
                          ★
                          {Number(
                            product.rating ||
                              0
                          ).toFixed(
                            1
                          )}
                        </p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No products found
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductAnalytics;

