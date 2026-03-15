import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../lib/axiosInstance";

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

export default function MyAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [showAddAddressform, setShowAddAddressform] = useState(false);

  const { user } = useAuth();

  const [form, setForm] = useState(defaultForm);

  const [editingId, setEditingId] = useState(null);

  const getAddress = async () => {
    const res = await axiosInstance.get(`/addresses`);
    const data = res?.data?.length > 0 ? res?.data : [];
    data?.length > 0 ? setAddresses(data) : setShowAddAddressform(true);
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAddress = () => {
    let payload;
    if (addresses.length === 0) {
      payload = {
        ...form,
        isDefault: true,
      };
    } else {
      payload = form;
    }
    axiosInstance
      .post(`/addresses`, form)
      .then((res) => {
        if (res?.data) {
          getAddress();
          setForm(defaultForm);
        }
      })
      .catch(() => alert("Something went wrong while saving your address"));
  };

  const editAddress = (addr) => {
    setForm(addr);
    setEditingId(addr.id);
  };

  const makeDefault = (id) => {};

  return (
    <>
      <div className="px-5 mx-auto">
        {/* Header */}
        {addresses?.length > 0 && (
          <>
            <div className="flex justify-between mb-6 mt-6">
              <h1 className="text-2xl font-semibold">My Addresses</h1>
              <button
                className="text-lg px-6 py-2 bg-black text-white rounded-md cursor-pointer"
                onClick={() => setShowAddAddressform(!showAddAddressform)}
              >
                + Add Address
              </button>
            </div>{" "}
            <div className="space-y-4 pb-5">
              {/* Address List */}
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white p-5 rounded-xl shadow flex justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{addr.fullName}</p>

                      {addr.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600">
                      {addr.addressLine1}, {addr.addressLine2}, {addr.city},{" "}
                      {addr.state}
                    </p>

                    <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <button
                      onClick={() => editAddress(addr)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    {!addr.isDefault && (
                      <button
                        onClick={() => makeDefault(addr.id)}
                        className="text-gray-600"
                      >
                        Make Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showAddAddressform && (
          <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg mb-5 mt-5">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Full Name
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
                  Address 1
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
                  Email Address
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={user?.email || ""}
                  disabled
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* mobile number  */}

              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Mobile Number
                </label>
                <input
                  name="phone"
                  onChange={handleChange}
                  value={form.phone}
                  type="number"
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
                    City
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
                    Pincode
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
                    District
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
                    State
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
                    Country
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
          </div>
        )}
      </div>
    </>
  );
}
