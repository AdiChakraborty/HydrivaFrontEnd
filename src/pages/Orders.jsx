import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

function Orders() {
  const navigation = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/my-orders");

        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <h2>Loading orders...</h2>;

  if (!orders.length) return <h2>No orders yet</h2>;

  return (
    <>
      {/* top portion */}
      <div className="h-20 text-xl flex items-center max-w-6xl mx-auto">
        <ul className="flex flex-wrap text-sm font-medium text-center text-body border-b border-default">
          <li className="me-2 text-xl ">
            <a
              href="#"
              aria-current="page"
              className="inline-block p-4 text-fg-brand bg-neutral-secondary-soft rounded-t-base active"
              onClick={() => navigation("/profile")}
            >
              Profile
            </a>
          </li>
          <li className="me-2 text-xl">
            <a
              href="#"
              className="inline-block p-4 rounded-t-base hover:text-heading hover:bg-neutral-secondary-soft"
              onClick={() => navigation("/orders")}
            >
              Order History
            </a>
          </li>
        </ul>
      </div>

      {/* mid part  */}
      <div className="max-w-6xl mx-auto">
        <div style={{ padding: "20px" }}>
          <h1 className="pb-2 border-b border-gray-800 w-fit">My Orders</h1>

          {orders.map((order) => (
            <div
              key={order.id}
              className="border-black border mt-5 mb-5 p-4 rounded-md px-10"
            >
              <div className="flex justify-between">
                <div>
                  {/* Items */}
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.title}
                        width="80"
                        height="80"
                        style={{ objectFit: "cover", marginRight: "15px" }}
                      />

                      <div>
                        <h4>{item.product.title}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{item.price}</p>
                      </div>
                    </div>
                  ))}

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div
                      style={{
                        marginTop: "10px",
                        background: "#f7f7f7",
                        padding: "10px",
                        borderRadius: "6px",
                      }}
                    >
                      <strong>Delivery Address</strong>
                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.district},{" "}
                        {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Order Header */}
                <div className="mb-3 flex flex-col items-center justify-center text-center">
                  <strong>Order #{order.id}</strong>

                  <span>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>

                  <span>
                    Status:{" "}
                    <b
                      className={
                        order.status === "PAID"
                          ? "text-green-500"
                          : order.status === "FAILED"
                            ? "text-red-500"
                            : order.status === "PENDING"
                              ? "text-yellow-500"
                              : ""
                      }
                    >
                      {order.status}
                    </b>
                  </span>

                  <span>Total: ₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
