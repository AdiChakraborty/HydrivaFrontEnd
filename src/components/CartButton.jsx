import React from "react";
import { useCart } from "../Context/CartContext";
import { IoCartOutline } from "react-icons/io5";

const CartButton = ({ addToCartButtonClassName, product }) => {
  const { addToCart, cartItem, updateQuantity, loading } = useCart();

  const cartProduct = React.useMemo(() => {
    return cartItem.find((item) => item.product.id === product.id);
  }, [cartItem, product.id]);
  return (
    <>
      {cartProduct ? (
        <div className="flex justify-evenly items-center bg-red-500 text-white gap-4 p-2 rounded-md font-bold text-xl">
          <button
            className=" cursor-pointer"
            disabled={loading}
            onClick={() => updateQuantity(product.id, "decrease")}
          >
            -
          </button>
          <span className="flex justify-center items-center">
            <IoCartOutline className="w-6 h-6 mr-2" /> {cartProduct.quantity}
          </span>
          <button
            className=" cursor-pointer"
            disabled={loading}
            onClick={() => updateQuantity(product.id, "increase")}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
          disabled={loading}
          className={
            " bg-red-500 text-white px-4 py-2 text-lg rounded-md cursor-pointer flex gap-2 items-center justify-center font-semibold " +
            addToCartButtonClassName
          }
        >
          <IoCartOutline className="w-6 h-6" /> Add to cart
        </button>
      )}
    </>
  );
};

export default CartButton;
