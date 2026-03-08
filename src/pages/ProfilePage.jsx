import React from "react";

function ProfilePage() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/*  top div  */}
        <div className="h-20 text-xl flex items-center">
          <ul className="flex gap-4 mx-5 text-3xl">
            <li>My Profile</li>
            <li>My Orders</li>
          </ul>
        </div>
        {/* mid portion */}
        <h1 className="mx-5 text-3xl pt-7 pb-7 ">Profile Picture</h1>
        <div className="flex">
          <div>
            <img
              src="https://pyxis.nymag.com/v1/imgs/e58/4e4/fa63c8d6bdbbddcf57c597729a01298bf4-christianbale-blog.1x.rsquare.w1400.jpg"
              alt=""
              className="h-[200px]
               rounded-[50%] bg-contain mx-5"
            />
          </div>

          <div>
            <p className="text-gray-800 ml-6 text-2xl pt-8 pb-8">
              We only support png or jpg.
            </p>
            <div className="flex gap-10  ml-6">
              <button className="bg-red-500 text-white px-5 py-2 text-lg rounded-md cursor-pointer">
                Upload your image
              </button>
              <button className="bg-red-500 text-white px-5 py-2 text-lg rounded-md cursor-pointer">
                Delete image
              </button>
            </div>
          </div>
        </div>

        {/* Address part */}

        
          <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg mb-15 mt-12">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value="Aditya Chakraborty"
                  placeholder="Enter your name"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value="6 A Anandamath Ichapur"
                  placeholder="Enter your address"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value="adi.chakraborty.007@gmai.com"
                  placeholder="Enter your email"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

                 {/* mobile number  */}

                <div>
                <label className="block text-sm text-gray-500 mb-1">
                 Mobile Number
                </label>
                <input
                  type="number"
                  value="6289133990"
                  placeholder="Enter your number"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

                {/* Suburb,Municipalty */}

              <div className="grid grid-cols-2 gap-2">
               {/* suburb */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 Landmark
                </label>
                <input
                  type="text"
                  value="Ichapur"
                  placeholder="Enter your nearest landmark"
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
                {/* Municipalty */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 Municipalty
                </label>
                <input
                  type="suburb"
                  value="North Barrackpore"
                  placeholder="Enter municipalty name"
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
              </div>

             {/* city,pincode */}

              <div className="grid grid-cols-2 gap-2">
               {/* city */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 City
                </label>
                <input
                  type="suburb"
                  value="kolkata"
                  placeholder="Enter your city name"
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
                {/* pincode */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 Pincode
                </label>
                <input
                  type="number"
                  value="743144"
                  placeholder="Enter your pincode"
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
              </div>

              {/* state,district  */}

                   <div className="grid grid-cols-2 gap-2">
               {/* state */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 State
                </label>
                <input
                  type="text"
                  value="West Bengal"
                  placeholder="Enter your state"
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
                {/* districe */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 District
                </label>
                <input
                  type="text"
                  value="North 24 pgs"
                  placeholder="Enter your district"
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
              </div>

              {/* country,empty  */}
                
               <div className="grid grid-cols-2 gap-2">
               {/* country */}
                <div>
                 <label className="block text-sm text-gray-500 mb-1">
                 Country
                </label>
                <input
                  type="text"
                  value="India"
                  disabled
                  className="w-full border rounded-md px-3 py-2"
                />
                </div>
              </div>


            </div>
          </div>
        
      </div>
    </>
  );
}

export default ProfilePage;
