import React, { useEffect, useRef, useState } from "react";
import MyAddresses from "../components/MyAddresses";
import { defaultProfileImg } from "../constants";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";

function ProfilePage({ location, getLocation }) {
  const [profileFile, setProfileFile] = useState(null);
  const fileInputRef = useRef();
  const navigation = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    axiosInstance
      .get("/profile")
      .then((res) => {
        if (res?.data?.profileImage) {
          setProfileFile(res.data.profileImage);
        }
      })
      .catch(() =>
        toast.error("Something went wrong while fetching your profile picture"),
      );
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    let uploadResponse;
    if (file) {
      //logic to upload the file to the server
      try {
        uploadResponse = await axiosInstance.post(
          "/upload/product-image",
          {
            image: file,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } catch (error) {
        alert("Something went wrong. Please make sure you're uploading images of size less than 5MB")
      }
      if (uploadResponse?.data?.url) {
        setProfileFile(uploadResponse.data.url);
        axiosInstance
          .put("/profile", {
            profileImage: uploadResponse.data.url,
          })
          .then((res) => {
            if (res?.data) {
              toast.success("Profile picture updated successfully");
            }
          })
          .catch(() =>
            toast.error(
              "Something went wrong while updating your profile picture",
            ),
          );
      }
    }
  };
  const handleDeleteImage = async (e) => {
    axiosInstance
      .put("/profile", {
        profileImage: "",
      })
      .then((res) => {
        if (res?.data) {
          toast.success("Profile picture deleted successfully");
        }
      })
      .catch(() =>
        toast.error("Something went wrong while deleting your profile picture"),
      );
  };
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/*  top div  */}
        <div className="h-20 md:text-xl text-sm flex items-center">
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
                onClick={() => navigation("/orders")}
              >
                Order History
              </a>
            </li>
          </ul>
        </div>
        {/* mid portion */}
        <h1 className="mx-5 md:text-3xl text-xl pt-7 pb-7 ">Profile Picture</h1>
        <div className="flex">
          <div>
            <img
              src={
                profileFile
                  ? typeof profileFile === "object"
                    ? URL.createObjectURL(profileFile)
                    : profileFile
                  : defaultProfileImg
              }
              alt=""
              className="md:w-[200px] md:h-[200px] rounded-[50%] object-contain mx-5 w-[100px] h-[100px] "
            />
          </div>

          <div>
            <p className="text-gray-800 ml-2 md:ml-6 md:text-2xl text-xs py-3 md:py-8">
              We only support png or jpg (max 5 MB)
            </p>
            <div className="flex md:gap-10 gap-2 md:gap-5 ml-2 md:ml-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handleClick}
                className="bg-red-500 text-white md:px-5 px-3 md:py-2 py-1 md:text-lg text-xs rounded-md  cursor-pointer"
              >
                Upload Image
              </button>

              <button
                className="bg-red-500 text-white md:px-5 px-3 md:py-2 py-1 md:text-lg text-xs mr-5 rounded-md cursor-pointer"
                onClick={handleDeleteImage}
              >
                Delete Image
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
