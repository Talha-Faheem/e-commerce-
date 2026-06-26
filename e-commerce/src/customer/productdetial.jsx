import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { CiStar } from "react-icons/ci";
import { FaTruck } from "react-icons/fa";
import { FiBox, FiShoppingCart } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";

function Productdetial() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [quantity, setQuantity] =
    useState(1);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const customerId =
    user?.customer_id;

  const getProduct =
    async () => {
      try {
        const res =
          await axios.get(
            `https://e-commerce-backend-l9wv.onrender.com/product/${id}`
          );

        setProduct(
          res.data.product
        );

        setReviews(
          res.data.reviews ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getProduct();
  }, [id]);

  const addToCart =
    async () => {
      try {
        if (!customerId) {
          alert(
            "Please login first"
          );
          return;
        }

        if (quantity < 1) {
          alert(
            "Please select a valid quantity"
          );
          return;
        }

        await axios.post(
          "https://e-commerce-backend-l9wv.onrender.com/cart/add",
          {
            customer_id:
              customerId,
            product_id:
              product.id,
            quantity:
              Number(
                quantity
              ),
          }
        );

        alert(
          `${quantity} item(s) added to cart`
        );
      } catch (error) {
        console.log(error);
      }
    };

  const submitReview =
    async () => {
      try {
        if (!customerId) {
          alert(
            "Please login first"
          );
          return;
        }

        await axios.post(
          "https://e-commerce-backend-l9wv.onrender.com/review",
          {
            customer_id:
              customerId,
            product_id:
              product.id,
            rating,
            comment,
          }
        );

        setComment("");

        getProduct();

        alert(
          "Review Added"
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!product) {
    return (
      <div className="w-[90%] mx-auto mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[90%] mt-5 mx-auto flex flex-col gap-4">

      <button
        onClick={() =>
          navigate(-1)
        }
        className="flex items-center gap-2"
      >
        <IoMdArrowRoundBack size={22} />
        Back Catalog
      </button>

      <div className="flex gap-16 flex-wrap">

        <div className="lg:w-[46%] w-full">
          <img
            src={`https://e-commerce-backend-l9wv.onrender.com/product-image/${product.id}`}
            alt={product.name}
            className="w-full rounded-2xl object-cover"
            onError={(
              e
            ) => {
              e.target.src =
                "https://via.placeholder.com/600x600";
            }}
          />
        </div>

        <div className="lg:w-[44%] w-full flex flex-col gap-4">

          <h2 className="text-3xl font-semibold">
            {product.name}
          </h2>

          <div className="flex items-center gap-2">
            <CiStar />

            <span>
              {Number(
                product.rating ||
                  0
              ).toFixed(1)}
            </span>

            <span>
              (
              {product.review_count ||
                0}
              {" "}Reviews)
            </span>
          </div>

          <h2 className="text-3xl">
            $
            {Number(
              product.price ||
                0
            ).toFixed(2)}
          </h2>

          <p>
            {
              product.description
            }
          </p>

          <div className="flex flex-col gap-3">

            <p className="flex items-center gap-3">
              <FiBox />

              Stock:

              <span className="text-green-500">
                {
                  product.stock
                }
              </span>
            </p>

            <p className="flex items-center gap-3">
              <FaTruck />
              Free Shipping On
              Orders Over $50
            </p>

            <p>
              Category:
              {" "}
              {
                product.category_name
              }
            </p>

          </div>

          <div className="flex gap-6 items-end">

            <div>
              <p className="mb-2">
                Quantity
              </p>

              <input
                type="number"
                min="1"
                max={
                  product.stock
                }
                value={
                  quantity
                }
                onChange={(
                  e
                ) =>
                  setQuantity(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                className="border rounded p-2 w-[80px]"
              />
            </div>

            <button
              onClick={
                addToCart
              }
              className="bg-black text-white px-6 py-3 rounded flex items-center gap-3"
            >
              <FiShoppingCart />
              Add To Cart
            </button>

          </div>

          <div className="border-t pt-5">

            <h2 className="text-xl font-semibold mb-4">
              Customer Reviews
            </h2>

            <div className="flex flex-col gap-4">

              {reviews.length >
              0 ? (
                reviews.map(
                  (
                    review
                  ) => (
                    <div
                      key={
                        review.id
                      }
                      className="bg-gray-100 p-3 rounded"
                    >
                      <div className="flex items-center gap-2">

                        <CiStar />

                        <span>
                          {
                            review.rating
                          }
                          /5
                        </span>

                        <span className="font-semibold">
                          {
                            review.customer_name
                          }
                        </span>

                      </div>

                      <p className="mt-2">
                        {
                          review.comment
                        }
                      </p>

                    </div>
                  )
                )
              ) : (
                <p>
                  No Reviews
                  Yet
                </p>
              )}

            </div>

          </div>

          <div className="border rounded-lg p-4 flex flex-col gap-3">

            <h3 className="font-semibold">
              Write Review
            </h3>

            <select
              value={rating}
              onChange={(
                e
              ) =>
                setRating(
                  Number(
                    e.target
                      .value
                  )
                )
              }
              className="border p-2 rounded"
            >
              <option value={5}>
                5 Stars
              </option>

              <option value={4}>
                4 Stars
              </option>

              <option value={3}>
                3 Stars
              </option>

              <option value={2}>
                2 Stars
              </option>

              <option value={1}>
                1 Star
              </option>
            </select>

            <textarea
              rows="4"
              value={
                comment
              }
              onChange={(
                e
              ) =>
                setComment(
                  e.target
                    .value
                )
              }
              placeholder="Write review..."
              className="border rounded p-2"
            />

            <button
              onClick={
                submitReview
              }
              className="bg-black text-white py-2 rounded"
            >
              Submit Review
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Productdetial;