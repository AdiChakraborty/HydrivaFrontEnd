import React, { useMemo } from "react";
import { CartContext, useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";
import Image from "../components/Image";
import { startPayment } from "../services/paymentService";

const OrderSummary = ({ location, getLocation }) => {
  const { updateQuantity, deleteItem } = useCart();
  const { state } = useLocation();
  const [paymentInProgress, setPaymentInProgress] = React.useState(false);
  const navigate = useNavigate();

  const { order, items: cartItem } = state || { items: [], order: {} };

  const createOrder = async () => {
    setPaymentInProgress(true);
    await startPayment({
      onSuccess: () => {
        navigate("/orders");
        setPaymentInProgress(false);
      },
      addressId: order.addressId,
      onFailure: () => setPaymentInProgress(false),
    });
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-10 px-4">
      {cartItem?.length > 0 ? (
        <>
          <h1 className="font-bold text-2xl mb-6">
            Order Summary ({cartItem.length})
          </h1>

          {/* MAIN LAYOUT */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT: CART ITEMS */}
            <div className="flex-1 space-y-4">
              {cartItem.map((cartProduct) => {
                const item = cartProduct?.product;
                return (
                  <div
                    key={item.id}
                    className="bg-gray-100 p-4 rounded-md flex items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <Image
                        src={item.images[0]?.url}
                        alt={item.title}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div>
                        <h1 className="line-clamp-2 max-w-[300px]">
                          {item.title}
                        </h1>
                        <p className="text-red-400 font-semibold text-lg">
                          ${item.price * cartProduct.quantity}
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
                );
              })}
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
                  <span>{order?.totalAmount}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center gap-1">
                    <MdDeliveryDining /> Delivery Charge
                  </span>
                  <span className="text-red-500 font-semibold">
                    <span className="line-through text-gray-500 mr-1">$25</span>
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
                  <span>${order?.totalAmount + 5}</span>
                </div>

                

                <button
                  className="bg-red-500 text-white py-2 rounded-md w-full mt-4 cursor-pointer"
                  onClick={createOrder}
                >
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
            disabled={paymentInProgress}
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
