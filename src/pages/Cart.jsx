import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";
import Image from "../components/Image";
import axiosInstance from "../lib/axiosInstance";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify/unstyled";
import { useAuth } from "../Context/AuthContext";
const defaultForm = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  district: "",
  landmark: "",
  postalCode: "",
  city: "",
  state: "West Bengal",
  phone: "",
  country: "India",
};

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem, loading, createOrder } =
    useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const getAddress = async () => {
    try {
      const res = await axiosInstance.get(`/addresses`);
      const data = await res.data;
      if (data?.length > 0) {
        setAddresses(data);
        setShowAddressForm(false);
        setSelectedAddressId(
          data.find((addr) => addr.isDefault)?.id || data[0].id,
        );
      } else {
        setAddresses([]);
        setSelectedAddressId(null);
        setShowAddressForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setShowAddressForm(true);
    }
  };
  useEffect(() => {
    if (user?.phone) {
      setForm((prev) => ({ ...prev, phone: user.phone }));
    }
  }, [user?.phone]);

  useEffect(() => {
    getAddress();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAddress = () => {
    //all form fields are required except address line 2 and landmark
    if (
      !form.fullName ||
      !form.addressLine1 ||
      !form.city ||
      !form.district ||
      !form.postalCode ||
      !form.phone
    ) {
      alert("Please fill all the required fields");
      return;
    }

    let payload;

    payload = {
      ...form,
      isDefault: true,
    };

    axiosInstance
      .post(`/addresses`, payload)
      .then((res) => {
        if (res?.data) {
          getAddress();
          setForm(defaultForm);
        }
      })
      .catch(() => alert("Something went wrong while saving your address"));
  };

  const totalPrice = cartItem.reduce(
    (total, item) => total + item?.product?.price * item.quantity,
    0,
  );

  const proceedToCheckOut = () => {
    if (!selectedAddressId) {
      alert("Please select an address to proceed");
      return;
    }
    navigate("/summary", {
      state: {
        order: {
          totalAmount: totalPrice,
          address: addresses.find(
            (address) => address.id === selectedAddressId,
          ),
        },
        items: cartItem,
      },
    });
  };

  function selectAddress(id) {
    setSelectedAddressId(id === selectedAddressId ? null : id);
  }

  function decreaseCart(id, count) {
    if (count === 1) {
      deleteItem(id);
      return;
    }
    updateQuantity(id, "decrease");
  }

  return !loading ? (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {cartItem.length > 0 ? (
        <div>
          <h1 className=" font-bold text-2xl px-5">
            My cart ({cartItem.length})
          </h1>
          <div>
            <div className="mt-10">
              {cartItem.map((cartProduct, index) => {
                console.log("Cart Product:", cartProduct);

                const item = cartProduct.product;
                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-5 rounded-md flex gap-3 items-center justify-between mt-3 w-full px-4 md:p-0"
                  >
                    <div
                      className="flex gap-4 items-center cursor-pointer"
                      onClick={() => navigate(`/products/${item.slug}`)}
                    >
                      <Image
                        src={item.images[0]?.url}
                        alt={item.title}
                        className="h-20 w-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2">
                          {item.title}
                        </h1>
                        <p className=" text-red-400 font-semibold text-lg">
                          ₹{item.price * cartProduct.quantity}
                        </p>
                      </div>
                    </div>
                    <div className=" bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                      <button
                        className=" cursor-pointer"
                        onClick={() =>
                          decreaseCart(item.id, cartProduct.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{cartProduct.quantity}</span>
                      <button
                        className=" cursor-pointer"
                        onClick={() => updateQuantity(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/600 transition-all rounded-full p-3 hover:shadow-2xl"
                    >
                      <FaRegTrashAlt className=" bg-red-500 text-white text-2xl cursor-pointer rounded-md" />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-5">
              {/* Delivery info  */}
              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
                {showAddressForm ? (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          name="fullName"
                          onChange={handleChange}
                          value={form.fullName}
                        />
                      </div>

                      {/* address */}
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Address 1 *
                        </label>
                        <input
                          name="addressLine1"
                          onChange={handleChange}
                          value={form.addressLine1}
                          type="text"
                          placeholder="Enter your address"
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      {/* addressline 2 */}

                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Address 2
                        </label>
                        <input
                          name="addressLine2"
                          onChange={handleChange}
                          value={form.addressLine2}
                          type="text"
                          placeholder="Enter your address"
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Email Address *
                        </label>
                        <input
                          name="email"
                          onChange={handleChange}
                          value={user?.email || ""}
                          disabled={!!user?.email}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>

                      {/* mobile number  */}

                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          name="phone"
                          onChange={handleChange}
                          value={form.phone}
                          type="number"
                          disabled={!!user?.phone}
                          placeholder="Enter your number"
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>

                      {/* Suburb,Municipalty */}

                      <div className="grid grid-cols-2 gap-2">
                        {/* suburb */}
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">
                            Landmark
                          </label>
                          <input
                            name="landmark"
                            onChange={handleChange}
                            value={form.landmark}
                            type="text"
                            placeholder="Enter your nearest landmark"
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>

                        {/* city */}
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">
                            City *
                          </label>
                          <input
                            name="city"
                            onChange={handleChange}
                            value={form.city}
                            type="text"
                            placeholder="Enter your city name"
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      {/* pincode */}

                      <div className="grid grid-cols-2 gap-2">
                        {/* pincode */}
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">
                            Pincode *
                          </label>
                          <input
                            name="postalCode"
                            onChange={handleChange}
                            value={form.postalCode}
                            type="text"
                            placeholder="Enter your pincode"
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>

                        {/* District */}

                        <div>
                          <label className="block text-sm text-gray-500 mb-1">
                            District *
                          </label>
                          <input
                            name="district"
                            onChange={handleChange}
                            value={form.district}
                            type="text"
                            placeholder="Enter your district"
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      {/* state,district  */}

                      <div className="grid grid-cols-2 gap-2">
                        {/* state */}
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">
                            State *
                          </label>
                          <input
                            disabled
                            type="text"
                            value="West Bengal"
                            placeholder="Enter your state"
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>
                        {/* country  */}
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">
                            Country *
                          </label>
                          <input
                            type="text"
                            value="India"
                            disabled
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" mx-auto m-w-4xl flex">
                      <button
                        type="button"
                        onClick={submitAddress}
                        className="bg-black text-white text-lg px-10 py-2.5 rounded-md mt-4 mx-auto m-w-4xl cursor-pointer"
                      >
                        Confirm Address{" "}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 pt-4">
                    <h1 className="text-gray-800 font-bold text-xl">
                      Your saved addresses
                    </h1>

                    {/* Always show last 3 addresses */}
                    {addresses.slice(-3).map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white p-5 rounded-xl shadow flex justify-start gap-5 items-center"
                      >
                        <input
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                          className="cursor-pointer"
                          checked={selectedAddressId === addr.id}
                          onChange={(e) => selectAddress(addr.id)}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-green">
                              {addr.fullName}
                            </p>
                            {addr.isDefault && <p>Default</p>}
                          </div>
                          <p className="text-sm text-gray-600">
                            {addr.addressLine1}, {addr.addressLine2},{" "}
                            {addr.city},{addr.state}
                          </p>
                          <p className="text-sm text-gray-500">
                            Phone: {addr.phone}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Dropdown for remaining addresses (everything except last 3) */}
                    {addresses.length > 3 && (
                      <div>
                        <button
                          onClick={() => setShowMore((prev) => !prev)}
                          className="text-sm text-blue-600 font-medium flex items-center gap-1"
                        >
                          {showMore
                            ? "Show less"
                            : `+${addresses.length - 3} more address${addresses.length - 3 > 1 ? "es" : ""}`}
                          <span>{showMore ? "▲" : "▼"}</span>
                        </button>

                        {showMore && (
                          <div className="space-y-4 mt-4">
                            {addresses.slice(0, -3).map((addr) => (
                              <div
                                key={addr.id}
                                className="bg-white p-5 rounded-xl shadow flex justify-start gap-5 items-center"
                              >
                                <input
                                  type="checkbox"
                                  style={{ width: 20, height: 20 }}
                                  checked={selectedAddressId === addr.id}
                                  onChange={(e) => selectAddress(addr.id)}
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold">
                                      {addr.fullName}
                                    </p>
                                    {addr.isDefault && <p>Default</p>}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {addr.addressLine1}, {addr.addressLine2},{" "}
                                    {addr.city}, {addr.state}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Phone: {addr.phone}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Bill section  */}

              <div className="bg-white  border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
                <h1 className=" text-gray-800 font-bold text-xl">
                  Bill details
                </h1>
                <div className=" justify-between flex items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <LuNotebookText />
                    </span>
                    Items total
                  </h1>
                  <p>₹{totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery Charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className=" text-gray-600 line-through">₹25</span>FREE
                  </p>
                </div>
                {/* <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <GiShoppingBag />
                    </span>
                    Handling Charge
                  </h1>
                  <p className="text-red-500 font-semibold">₹5</p>
                </div> */}
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center">
                  <h1 className=" font-semibold text-lg">Grand Total</h1>
                  <p className=" font-semibold text-lg">₹{totalPrice}</p>
                </div>

                <button
                  disabled={loading}
                  className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3"
                  onClick={proceedToCheckOut}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className=" font-bold text-2xl text-red-300 text-muted">
            Ohh noo! Your cart is empty
          </h1>
          <img src={emptyCart} alt="" className=" w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
      <h1 className=" font-bold text-2xl text-red-300 text-muted">
        Loading...
      </h1>
    </div>
  );
};

export default Cart;
