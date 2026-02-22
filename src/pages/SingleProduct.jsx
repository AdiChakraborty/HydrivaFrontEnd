import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/loding.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProducts = () => {
  const params = useParams();
  const [SingleProduct, setSingleProduct] = useState("");
    const [qunatity,setQuantity] = useState(1)
  // console.log(params);
  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${params.slug}`
      );
      const product = res.data;
      const temp = {
        brand: "",
        category: product.category.name,
        color: "",
        description: product.description,
        discount: 0,
        id: product.id,
        image: product.images[0],
        model: "",
        popular: false,
        price: product.price,
        title: product.title,
      };
      
      setSingleProduct(temp);
    } catch (error) {
      console.log("Error");
    }
  };
  console.log(params)

  console.log(SingleProduct?.image?.url)
  useEffect(() => {
    getSingleProduct();
  }, []);
  const OriginalPrice = Math.round(
    SingleProduct.price + (SingleProduct.price * SingleProduct.discount) / 100
  );

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={SingleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image */}
            <div className="w-full">
              <img
                src={SingleProduct?.image?.url}
                alt={SingleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* product details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                {SingleProduct.title}
              </h1>
              <div className="text-gray-700">
                {SingleProduct.category?.toUpperCase()}
              </div>
              <p className="text-xl text-red-500 font-bold">
                ${SingleProduct.price}{" "}
                <span className="line-through text-gray-700">
                  ${OriginalPrice}
                </span>{" "}
                <span className="bg-red-500 text-white px-4 py-2 rounded-full">
                  {SingleProduct.discount}% discount
                </span>
              </p>
              <p className="text-gray-600">{SingleProduct.description}</p>

              {/* qunatity selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={qunatity}
                  className="w-20 border cursor-pointer border-gray-300 rounded-lg px-3
                   py-1 focus:outline-none focus:ring-2 foucs:ring-red-500"
                    onChange={(e)=>setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => addToCart(SingleProduct,qunatity)}
                  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md"
                >
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProducts;
