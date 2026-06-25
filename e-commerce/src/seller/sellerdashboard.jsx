
import React from "react";
import Card from "./card";
import Orderchart from "./orderchart";
import Sellweek from "./sellweek";
import Toprated from "./toprated";
import Recentorder from "./Recentorder";
import { FaCircleExclamation } from "react-icons/fa6";
import { LuDollarSign } from "react-icons/lu";
import { SlBag } from "react-icons/sl";
import { FaBox } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function Sellerdashboard({ data }) {
  const lowStockProducts =
    data?.products?.filter(
      (product) => product.stock <= 5
    ) || [];

  const dashboardCards = [
    {
      title: "Revenue",
      value: `$${Number(
        data?.revenue || 0
      ).toFixed(2)}`,
      description: "Total revenue",
      text: "+12%",
      Icon: LuDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: data?.totalorder || 0,
      description: "Orders received",
      text: "+8%",
      Icon: SlBag,
      color: "bg-blue-500",
    },
    {
      title: "Products",
      value: data?.products?.length || 0,
      description: "Active products",
      text: "+3%",
      Icon: FaBox,
      color: "bg-yellow-500",
    },
    {
      title: "Rating",
      value: Number(
        data?.seller?.[0]?.rating || 0
      ).toFixed(1),
      description:
        "Average customer rating",
      text: "+0.2",
      Icon: CiStar,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="w-[90%] mx-auto mt-4 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-medium mb-2">
          Dashboard Overview
        </h2>

        <p className="text-gray-500">
          Welcome back! Here's what's
          happening with your store.
        </p>
      </div>

      <div className="flex gap-4 md:justify-between flex-wrap justify-center">
        {dashboardCards.map(
          (card, index) => (
            <Card
              key={index}
              title={card.title}
              value={card.value}
              description={
                card.description
              }
              text={card.text}
              Icon={card.Icon}
              color={card.color}
            />
          )
        )}
      </div>

      <div className="flex gap-5 p-4 bg-yellow-100 rounded-lg w-full mx-auto px-6">
        <div>
          <FaCircleExclamation className="text-white bg-yellow-400 p-2 text-4xl rounded-md" />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-yellow-800 font-medium text-lg">
            Low Stock Alert
          </h4>

          <p className="text-yellow-800">
            {
              lowStockProducts.length
            }{" "}
            products running low on
            inventory
          </p>

          <div>
            <button className="bg-yellow-400 text-white p-3 rounded-lg">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
          <div className="w-full h-full">
            <Orderchart />
          </div>
        </div>

        <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
          <div className="w-full h-full">
            <Sellweek />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between px-3">
              <h2 className="text-xl font-medium">
                Recent Orders
              </h2>

              <p className="text-md">
                View all
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {data?.order
                ?.slice(0, 3)
                .map((order) => (
                  <Recentorder
                    key={order.id}
                    order={order}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between px-3">
              <h2 className="text-xl font-medium">
                Top Rated Products
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {data?.topProducts?.map(
                (
                  product,
                  index
                ) => (
                  <Toprated
                    key={product.id}
                    product={
                      product
                    }
                    rank={
                      index + 1
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sellerdashboard;

