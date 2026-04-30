// import hydrivalogo from '../assets/hydrivalogo.png'

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function ResetPassword() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, error } = useAuth();

  async function handleResetPassword() {
    if (!password || !confirmPassword) {
      alert("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    const isSuccess = await resetPassword(password);
    console.log(isSuccess);
    if (isSuccess) {
      alert("Password changed successfully");
      navigation("/");
    }
  }

  return (
    <>
      <div className="bg-gray-50">
        <div className="md:min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <div className="text-lg text-center mb-3">
              <span className="text-red-600 hover:underline font-semibold">
                {error || ""}
              </span>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Reset Password
              </h1>
              <form className="mt-12 space-y-6">
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="!mt-12">
                  <button
                    type="button"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
