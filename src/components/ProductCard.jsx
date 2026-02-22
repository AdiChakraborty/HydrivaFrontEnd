import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  // console.log(product );
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const imgSrc =
    Array.isArray(product?.images) && product.images?.[0]?.url
      ? product.images?.[0]?.url
      : "";

  console.log("imgSrc from productcard", imgSrc);

  return (
    <div
      className=" border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 
    hover:shawod-2xl transition-all p-2 h-max"
    >
      <img
        src={imgSrc}
        alt=""
        className=" bg-gray-100 aspect-square"
        onClick={() => navigate(`/products/${product.slug}`)}
      />
      <h1 className="line-clamp-2 p-1 m-1 font-semibold min-h-[56px]">
        {product.title}
      </h1>
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className=" bg-red-500 text-white px-3 py-2 text-lg rounded-md w-full
       cursor-pointer flex gap-2 items-center justify-center font-semibold"
      >
        {" "}
        <IoCartOutline className="w-6 h-6" /> Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
