import React from "react";
import axiosInstance from "../lib/axiosInstance";

const Contact = () => {
  const formRef = React.useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //get form data
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // name is mandatory, either email or phone is mandatory, message is mandatory
    if (!data.name) {
      alert("Name is required");
      return;
    }
    if (!data.email && !data.phone) {
      alert("Either email or phone is required");
      return;
    }
    if (!data.message) {
      alert("Message is required");
      return;
    }

    //send form data to backend
    try {
      const response = await axiosInstance.post("/contact", data);
      if (response.status === 200) {
        alert("Message sent successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again later.");
    }

    formRef.current.reset();
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="md:text-4xl text-2xl font-bold text-white text-center mb-10">
          Get in Touch with <span className="text-red-400">Hydriva</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="text-white space-y-6">
            <div>
              <h3 className="md:text-2xl text-xl font-semibold">
                Contact Info
              </h3>
              <p className="text-gray-300">
                Have a question or need support? We're here to help you.
              </p>
            </div>
            <div>
              <p>
                <strong>📍 Address:</strong> 45/1 Titas Apartment Santoshpur Jadavpur,Kolkata 700075
              </p>
              <p>
                <strong>📧 Email:</strong> hydrivaofficial@gmail.com
              </p>
              <p>
                <strong>📞 Phone:</strong> +91 6289168373
              </p>
            </div>  
          </div>

          {/* Form Section */}
          <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Hydriva official"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="hydriva@example.com"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Phone Number</label>
              <input
                type="string"
                name="phone"
                placeholder="9999999999"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Your Message</label>
              <textarea
                rows="4"
                name="message"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
