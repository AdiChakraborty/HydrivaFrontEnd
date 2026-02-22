import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const OrderSummary = ({ location, getLocation }) => {
  const { updateQuantity, deleteItem } = useCart();
  const navigate = useNavigate();

  // SAME mock data (logic unchanged)
  const cartItem = [
    {
      id: 8,
      title: "Classic Red Jogger Sweatpants",
      price: 98,
      images: ["https://i.imgur.com/9LFjwpI.jpeg"],
      quantity: 1,
    }
  ];

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-10 px-4">
      {cartItem.length > 0 ? (
        <>
          <h1 className="font-bold text-2xl mb-6">
            Order Summary ({cartItem.length})
          </h1>

          {/* MAIN LAYOUT */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT: CART ITEMS */}
            <div className="flex-1 space-y-4">
              {cartItem.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-md flex items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div>
                      <h1 className="line-clamp-2 max-w-[300px]">
                        {item.title}
                      </h1>
                      <p className="text-red-400 font-semibold text-lg">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT: BILL DETAILS */}
            <div className="w-full lg:w-[380px]">
              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 space-y-3">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill details
                </h1>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center gap-1">
                    <LuNotebookText /> Items total
                  </span>
                  <span>${totalPrice}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center gap-1">
                    <MdDeliveryDining /> Delivery Charge
                  </span>
                  <span className="text-red-500 font-semibold">
                    <span className="line-through text-gray-500 mr-1">
                      $25
                    </span>
                    FREE
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center gap-1">
                    <GiShoppingBag /> Handling Charge
                  </span>
                  <span className="text-red-500 font-semibold">$5</span>
                </div>

                <hr />

                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Grand Total</span>
                  <span>${totalPrice + 5}</span>
                </div>

                <div className="pt-3">
                  <h1 className="mb-2 font-semibold text-gray-700">
                    Apply promo code
                  </h1>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="p-2 rounded-md w-full border"
                    />
                    <button className="bg-white border px-4 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>

                <button className="bg-red-500 text-white py-2 rounded-md w-full mt-4">
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="font-bold text-2xl text-red-300">
            Ohh noo! Your cart is empty
          </h1>
          <img src={emptyCart} alt="Empty cart" className="w-[350px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;