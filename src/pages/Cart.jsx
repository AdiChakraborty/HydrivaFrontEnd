import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useNavigate } from "react-router-dom";
import emptyCart from '../assets/empty-cart.png'


const Cart = ({location,getLocation }) => {
  const { updateQuantity,deleteItem} = useCart();
  const navigate = useNavigate()
  const cartItem  = [
    {
        "id": 8,
        "title": "Classic Red Jogger Sweatpants",
        "slug": "classic-red-jogger-sweatpants",
        "price": 98,
        "description": "Experience ultimate comfort with our red jogger sweatpants, perfect for both workout sessions and lounging around the house. Made with soft, durable fabric, these joggers feature a snug waistband, adjustable drawstring, and practical side pockets for functionality. Their tapered design and elastic cuffs offer a modern fit that keeps you looking stylish on the go.",
        "category": {
            "id": 1,
            "name": "clothes m",
            "slug": "clothes-m",
            "image": "https://i.imgur.com/ZANVnHE.jpeg",
            "creationAt": "2026-02-11T09:03:51.000Z",
            "updatedAt": "2026-02-11T12:21:33.000Z"
        },
        "images": [
            "https://i.imgur.com/9LFjwpI.jpeg",
            "https://i.imgur.com/vzrTgUR.jpeg",
            "https://i.imgur.com/p5NdI6n.jpeg"
        ],
        "creationAt": "2026-02-11T09:03:51.000Z",
        "updatedAt": "2026-02-11T09:03:51.000Z",
        "quantity": 1
    }
]

 const totalPrice = cartItem.reduce((total,item)=> total + item.price * item.quantity,0)


  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {cartItem.length > 0 ? (
        <div>
          <h1 className=" font-bold text-2xl">My cart ({cartItem.length})</h1>
          <div>
            <div className="mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full px-4 md:p-0"
                  >
                    <div className=" flex gap-4 items-center">
                      <img
                        src={item.images}
                        alt={item.title}
                        className="h-20 w-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>
                        <p className=" text-red-400 font-semibold text-lg">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className=" bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                      <button className=" cursor-pointer" onClick={()=>updateQuantity(cartItem,item.id,'decrease')}>-</button>
                      <span>{item.quantity}</span>
                      <button className=" cursor-pointer" onClick={()=>updateQuantity(cartItem,item.id,'increase')}>+</button>
                    </div>
                    <span onClick={()=>deleteItem(item.id)} className="hover:bg-white/600 transition-all rounded-full p-3 hover:shadow-2xl">
                      <FaRegTrashAlt className=" bg-red-500 text-white text-2xl cursor-pointer rounded-md" />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-20">
              <div className=" bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className=" rounded-md p-2"
                    // value={user?.fullName}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className=" rounded-md p-2"
                    value={location?.country}
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      className=" rounded-md p-2 w-full"
                      value={location?.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">PostCode</label>
                    <input
                      type="text"
                      placeholder="Enter your postcode"
                      className=" rounded-md p-2 w-full"
                      value={location?.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country</label>
                    <input
                      type="text"
                      placeholder="Enter your Country"
                      className=" rounded-md p-2 w-full"
                      value={location?.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter your Phone number"
                      className=" rounded-md p-2 w-full"
                      // value={user.phoneNumber}
                    />
                  </div>
                </div>
                <button className=" bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                  Submit
                </button>
                <div className="flex items-center justify-center w-full text-gray-700">
                  ------OR------
                </div>
                <div className="flex justify-center">
                  <button className=" bg-red-500 text-white px-3 py-2 rounded-md " onClick={getLocation}>
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white  border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
                <h1 className=" text-gray-800 font-bold text-xl">Bill details</h1>
                <div className=" justify-between flex items-center">
                  <h1 className="flex gap-1 items-center text-gray-700"><span><LuNotebookText/></span>Items total</h1>
                  <p>${totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                   <h1 className="flex gap-1 items-center text-gray-700"><span><MdDeliveryDining/></span>Delivery Charge</h1>
                    <p className="text-red-500 font-semibold"><span className=" text-gray-600 line-through">$25</span>FREE</p>
                </div>
                <div className="flex justify-between items-center">
                   <h1 className="flex gap-1 items-center text-gray-700"><span><GiShoppingBag/></span>Handling Charge</h1>
                    <p className="text-red-500 font-semibold">$5</p>
                </div>
                <hr className="text-gray-200 mt-2"/>
                <div className="flex justify-between items-center">
                  <h1 className=" font-semibold text-lg">Grand Total</h1>
                  <p className=" font-semibold text-lg">${totalPrice + 5}</p>
                </div>
                <div>
                  <h1 className=" mt-7 mb-3 font-semibold text-gray-700">Apply promo code</h1>
                  <div className="flex gap-3">
                    <input type="text" placeholder="Enter code" className=" p-2 rounded-md w-full" />
                    <button className=" bg-white text-black border border-gray-200 px-4 py-1 cursor-pointer rounded-md">Apply</button>
                  </div>
                </div>
                <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3" onClick={ ()=>navigate("/summary")}>Proceed to checkout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className=" font-bold text-2xl text-red-300 text-muted">Ohh noo! Your cart is empty</h1>
          <img src={emptyCart} alt="" className=" w-[400px]"  />
          <button onClick={()=>navigate('/products')} className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
