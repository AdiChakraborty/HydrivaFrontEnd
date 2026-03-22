import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/loding.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext";
import axiosInstance from "../lib/axiosInstance";
import CartButton from "../components/CartButton";
import { AiOutlineShopping } from "react-icons/ai";
import { toast } from "react-toastify";

const SingleProducts = () => {
  const params = useParams();
  const [SingleProduct, setSingleProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const { fetchCartItems } = useCart();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/${params.slug}`);
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
  const getAddress = async () => {
    const res = await axiosInstance.get(`/addresses`);
    const data = res?.data?.length > 0 ? res?.data : [];
    return data;
  };

  async function buyNow(product) {
    try {
      const response = await axiosInstance.post("/cart/add", {
        productId: product.id,
        quantity: 1,
      });

      if (response.data) {
        const addresses = await getAddress();
        const found = addresses.find((address) => address.isDefault === true);
        const selected = found || addresses[0];
        setBuyNowLoading(false);
        fetchCartItems((cartItem) => {
          navigate("/summary", {
            state: {
              order: {
                totalAmount: product.price,
                address: selected,
              },
              items: cartItem,
            },
          });
        });
      }

      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.message);
      setBuyNowLoading(false);
    } finally {
      setBuyNowLoading(false);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, []);
  const OriginalPrice = Math.round(
    SingleProduct.price + (SingleProduct.price * SingleProduct.discount) / 100,
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
                ₹{SingleProduct.price}{" "}
                <span className="line-through text-gray-700">
                  ₹{OriginalPrice}
                </span>{" "}
                <span className="bg-red-500 text-white px-4 py-2 rounded-full">
                  {SingleProduct.discount}% discount
                </span>
              </p>
              <p className="text-gray-600">{SingleProduct.description}</p>

              {/* quantity selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  className="w-20 border cursor-pointer border-gray-300 rounded-lg px-3
                   py-1 focus:outline-none focus:ring-2 foucs:ring-red-500"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-3">
                <CartButton product={SingleProduct} cartQuantity={quantity}/>
                <button
                  onClick={() => buyNow(SingleProduct)}
                  disabled={buyNowLoading}
                  className={
                    "bg-black text-white px-4 py-2 text-lg rounded-md cursor-pointer flex gap-2 items-center justify-center font-semibold " +
                    (buyNowLoading ? " opacity-50 cursor-not-allowed" : "")
                  }
                >
                  <AiOutlineShopping className="w-6 h-6" /> Buy now
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
