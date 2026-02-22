import React from "react";
import banner from "../assets/banner.png";
import Drinkingwater from "../assets/Drinkingwater.avif";
import { useNavigate } from "react-router-dom";

const MidBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 md:py-24">
      <div
        className=" relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px]"
        style={{
          backgroundImage: `url(${Drinkingwater})`,
          backGroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className=" absolute inset-0 bg-black/60 md:rounded-2xl bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-[180px]">
            <h1 className="text-3xl md:text-5xl lg:text-3xl font-bold mb-4 ">
              HYDRIVA mugs are designed to keep your drink hot or cold for hours
              — perfect for desks, drives, and long days.
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Stay hydrated wherever life takes you.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6
             rounded-lg transition duration-300 cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
