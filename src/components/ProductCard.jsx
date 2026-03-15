import React, { useMemo } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Image from "./Image";
import CartButton from "./CartButton";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const imgSrc =
    Array.isArray(product?.images) && product.images?.[0]?.url
      ? product.images?.[0]?.url
      : "";

  

  return (
    <div
      className=" border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 
    hover:shawod-2xl transition-all p-2 h-max"
    >
      <Image
        src={imgSrc}
        alt={product.title}
        className=" bg-gray-100 aspect-square"
        onClick={() => navigate(`/products/${product.slug}`)}
      />
      <h1 className="line-clamp-2 p-1 m-1 font-semibold min-h-[56px]">
        {product.title}
      </h1>
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>
      <CartButton product={product} addToCartButtonClassName="w-full" />
    </div>
  );
};

export default ProductCard;
