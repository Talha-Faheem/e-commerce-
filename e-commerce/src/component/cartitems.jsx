import axios from "axios";
import { GoDash } from "react-icons/go";
import { IoAddSharp } from "react-icons/io5";

function Cartitems({
  item,
  refreshCart,
}) {
  const increase = async () => {
    try {
      await axios.put(
        `http://localhost:3000/cart/increase/${item.id}`
      );

      refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decrease = async () => {
    try {
      await axios.put(
        `http://localhost:3000/cart/decrease/${item.id}`
      );

      refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/cart/remove/${item.id}`
      );

      refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100 p-3 rounded-lg gap-3 mb-3">
      <img
        src={`http://localhost:3000/product-image/${item.product_id}`}
        alt={item.name}
        className="w-[100px] h-[100px] object-cover rounded-md"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/100x100?text=No+Image";
        }}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <h3 className="font-medium">
            {item.name}
          </h3>

          <p className="font-medium">
            ${item.price}
          </p>
        </div>

        <p className="text-gray-500 mt-1">
          Subtotal: $
          {Number(
            item.subtotal || 0
          ).toFixed(2)}
        </p>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={decrease}
              className="cursor-pointer"
            >
              <GoDash />
            </button>

            <p>{item.quantity}</p>

            <button
              onClick={increase}
              className="cursor-pointer"
            >
              <IoAddSharp />
            </button>
          </div>

          <button
            onClick={remove}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cartitems;