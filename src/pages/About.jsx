import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold  text-center">About Hydriva</h1>

        <p className="text-gray-700 text-lg">
          HYDRIVA is built for people who live life on the move. From early
          morning coffee to long workdays and workouts, we believe hydration
          should be effortless, reliable, and stylish. Our products are designed
          to blend seamlessly into your everyday routine — whether you’re at
          your desk, in the gym, or on the road. With a focus on quality
          materials, thoughtful design, and lasting performance, HYDRIVA helps
          you enjoy every sip at the right temperature. HYDRIVA stands for
          minimal aesthetics, durability, and products you’ll want to carry
          every day. Because staying hydrated isn’t just a habit — it’s a
          lifestyle.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            To design premium hydration essentials that seamlessly fit into
            modern lifestyles, delivering performance, simplicity, and lasting
            value.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">
            Why Choose Hydriva?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Top-quality electronic products from trusted brands</li>
            <li>Lightning-fast and secure shipping</li>
            <li>Reliable customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            To redefine everyday hydration by building a brand known for minimal
            design, reliable quality, and conscious living.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Join the Hydriva Family
          </h3>
          <p className="text-gray-700 mb-4">
           Stay hydrated wherever life takes you.
          </p>
          <Link to={"/products"}>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
