import axios from "axios";
import { loadRazorpay } from "../utils/loadRazorpay";
import axiosInstance from "../lib/axiosInstance";

export const startPayment = async ({ addressId, onSuccess, onFailure }) => {
  try {
    // 1️⃣ Load Razorpay SDK
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 2️⃣ Create Order in backend
    const orderResponse = await axiosInstance.post("/orders/create", {
      addressId,
    });

    const orderId = orderResponse.data.id;

    // 3️⃣ Create Razorpay Order
    const paymentResponse = await axiosInstance.post("/payment/create", {
      orderId,
    });

    const { razorpayOrderId, amount, currency, key } = paymentResponse.data;

    // 4️⃣ Razorpay Options
    const options = {
      key,
      amount,
      currency,
      name: "Hydriva",
      description: "Hydriva Order Payment",
      order_id: razorpayOrderId,

      handler: async function (response) {
        // 5️⃣ Verify payment
        await axiosInstance.post("/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        });

        alert("Payment successful 🎉");
        onSuccess();
      },

      theme: {
        color: "#fb2c36",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again.");
      onFailure();
    });
  } catch (error) {
    console.error(error);
    alert("Payment failed. Please try again.");
    onFailure();
  }
};
