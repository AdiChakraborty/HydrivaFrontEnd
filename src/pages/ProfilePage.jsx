import React, { useRef, useState } from "react";
import MyAddresses from "../components/MyAddresses";
import { defaultProfileImg } from "../constants";
import { useNavigate } from "react-router-dom";

function ProfilePage({ location, getLocation }) {
   const [profileFile, setProfileFile] = useState(null)
    const fileInputRef = useRef();
    const navigation = useNavigate()

  function UploadImage() {
    const fileInputRef = useRef();
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfileFile(file)
  };
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/*  top div  */}
        <div className="h-20 text-xl flex items-center">
          <ul className="flex flex-wrap text-sm font-medium text-center text-body border-b border-default">
            <li className="me-2 text-lg ">
              <a
                href="#"
                aria-current="page"
                className="inline-block p-4 text-fg-brand bg-neutral-secondary-soft rounded-t-base active"
              >
                Profile
              </a>
            </li>
            <li className="me-2 text-lg">
              <a
                href="#"
                className="inline-block p-4 rounded-t-base hover:text-heading hover:bg-neutral-secondary-soft"
                onClick={()=>navigation('/orders')}
              >
               Order History
              </a>
            </li>
       
          
          </ul>
        </div>
        {/* mid portion */}
        <h1 className="mx-5 text-3xl pt-7 pb-7 ">Profile Picture</h1>
        <div className="flex">
          <div>
            <img
              src={profileFile ? typeof profileFile ==='object' ? URL.createObjectURL(profileFile): profileFile : defaultProfileImg}
              alt=""
              className="w-[200px] h-[200px] rounded-[50%] object-contain mx-5"
            />
          </div>

          <div>
            <p className="text-gray-800 ml-6 text-2xl pt-8 pb-8">
              We only support png or jpg.
            </p>
            <div className="flex gap-10  ml-6">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={handleClick}
                  className="bg-red-500 text-white px-5 py-2 text-lg rounded-md cursor-pointer"
                >
                  Upload your image
                </button>
              </div>
              <button className="bg-red-500 text-white px-5 py-2 text-lg rounded-md cursor-pointer">
                Delete image
              </button>
            </div>
          </div>
        </div>

        {/* Address part */}

        <MyAddresses location={location} getLocation={getLocation} />
      </div>
    </>
  );
}

export default ProfilePage;
