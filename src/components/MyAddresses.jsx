import { useEffect, useRef, useState } from "react";
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

const defaultErrors = {
  addressLine1: "",
  addressLine2: "",
  phone: "",
};

export default function MyAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [showAddAddressform, setShowAddAddressform] = useState(false);
  const bottomLocator = useRef(null);
  const { user } = useAuth();

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState(defaultErrors);
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error for this field as soon as the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = { addressLine1: "", addressLine2: "", phone: "" };
    let valid = true;

    if (!form.addressLine1.trim()) {
      newErrors.addressLine1 = "Address line 1 is required";
      valid = false;
    }
    if (!form.addressLine2.trim()) {
      newErrors.addressLine2 = "Address line 2 is required";
      valid = false;
    }
    if (!form.phone.toString().trim()) {
      newErrors.phone = "Mobile number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(form.phone.toString().trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitAddress = () => {
    if (!validate()) return;

    let payload;
    if (editingId) {
      payload = form;
      axiosInstance
        .put(`/addresses/${editingId}`, payload)
        .then((res) => {
          if (res?.data) {
            getAddress();
            setForm(defaultForm);
            setErrors(defaultErrors);
            setEditingId(null);
             setShowAddAddressform(false);
          }
        })
        .catch(() => alert("Something went wrong while saving your address"));
      return;
    }

    payload = addresses.length === 0 ? { ...form, isDefault: true } : form;

    axiosInstance
      .post(`/addresses`, payload)
      .then((res) => {
        if (res?.data) {
          getAddress();
          setForm(defaultForm);
          setErrors(defaultErrors);
           setShowAddAddressform(false);
        }
      })
      .catch(() => alert("Something went wrong while saving your address"));
  };

  const editAddress = (addr) => {
    bottomLocator.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setShowAddAddressform(true);
    setForm(addr);
    setErrors(defaultErrors);
    setEditingId(addr.id);
  };

  const deleteAddr = async (id) => {
    const response = await axiosInstance.delete(`/addresses/${id}`);
    if (response.data) getAddress();
  };

  const makeDefault = (id) => {
    axiosInstance
      .put(`/addresses/${id}/default`)
      .then((res) => { if (res?.data) getAddress(); })
      .catch(() => alert("Something went wrong while updating your address"));
  };

  const onAddAddressClick = () => {
    bottomLocator.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setShowAddAddressform(!showAddAddressform);
  };

  // Reusable inline error message component
  const FieldError = ({ message }) =>
    message ? (
      <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
          <rect x="5.5" y="3" width="1" height="4" rx="0.5" fill="currentColor" />
          <rect x="5.5" y="8" width="1" height="1" rx="0.5" fill="currentColor" />
        </svg>
        {message}
      </p>
    ) : null;

  return (
    <>
      <div className="px-5 mx-auto">
        {addresses?.length > 0 && (
          <>
            <div className="flex justify-between mb-6 mt-6">
              <h1 className="md:text-2xl text-xl font-semibold">My Addresses</h1>
              <button
                className="md:text-lg text-sm md:px-6 px-3 md:py-3 py-2 bg-black text-white rounded-md cursor-pointer"
                onClick={onAddAddressClick}
              >
                + Add Address
              </button>
            </div>

            <div className="space-y-4 pb-5">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-5 rounded-xl shadow flex justify-between">
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
                      {addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.state}
                    </p>
                    <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <button onClick={() => editAddress(addr)} className="text-blue-600 cursor-pointer">Edit</button>
                    {!addr.isDefault && (
                      <button onClick={() => makeDefault(addr.id)} className="text-gray-600 cursor-pointer">Make Default</button>
                    )}
                    <button onClick={() => deleteAddr(addr.id)} className="text-red-600 cursor-pointer">Delete</button>
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
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="fullName"
                  onChange={handleChange}
                  value={form.fullName}
                />
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address 1 *</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.addressLine1
                      ? "border-red-500 bg-red-50 focus:ring-red-300"
                      : "focus:ring-blue-400"
                  }`}
                  name="addressLine1"
                  onChange={handleChange}
                  value={form.addressLine1}
                />
                <FieldError message={errors.addressLine1} />
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address 2 *</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.addressLine2
                      ? "border-red-500 bg-red-50 focus:ring-red-300"
                      : "focus:ring-blue-400"
                  }`}
                  name="addressLine2"
                  onChange={handleChange}
                  value={form.addressLine2}
                />
                <FieldError message={errors.addressLine2} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email Address</label>
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

              {/* Mobile Number */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Mobile Number *</label>
                <input
                  type="number"
                  placeholder="Enter your number"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-500 bg-red-50 focus:ring-red-300"
                      : "focus:ring-blue-400"
                  }`}
                  name="phone"
                  onChange={handleChange}
                  value={form.phone}
                />
                <FieldError message={errors.phone} />
              </div>

              {/* Landmark + City */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Landmark</label>
                  <input
                    name="landmark"
                    onChange={handleChange}
                    value={form.landmark}
                    type="text"
                    placeholder="Enter your nearest landmark"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">City</label>
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

              {/* Pincode + District */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Pincode</label>
                  <input
                    name="postalCode"
                    onChange={handleChange}
                    value={form.postalCode}
                    type="text"
                    placeholder="Enter your pincode"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">District</label>
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

              {/* State + Country */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">State</label>
                  <input disabled type="text" value="West Bengal" className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Country</label>
                  <input disabled type="text" value="India" className="w-full border rounded-md px-3 py-2" />
                </div>
              </div>
            </div>

            <div className="mx-auto m-w-4xl flex">
              <button
                type="button"
                onClick={submitAddress}
                className="bg-black text-white text-lg px-10 py-2.5 rounded-md mt-4 mx-auto cursor-pointer"
              >
                Confirm Address
              </button>
            </div>
          </div>
        )}

        <div ref={bottomLocator}></div>
      </div>
    </>
  );
}