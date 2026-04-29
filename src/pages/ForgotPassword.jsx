// import hydrivalogo from '../assets/hydrivalogo.png'

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function ForgotPassword() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");

  const { sendPasswordResetLink, error } = useAuth();

  async function handleForgotPassword() {
    const isSuccess = await sendPasswordResetLink(
      email,
      import.meta.env.VITE_SITE_URL + "/reset-password",
    );
    console.log(isSuccess);
    if (isSuccess) {
      alert("Password reset link sent to your email!");
      navigation("/sign-in");
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
                Forgot Password
              </h1>
              <form className="mt-12 space-y-6">
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    User Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="!mt-12">
                  <button
                    type="button"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Send Reset Link
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

export default ForgotPassword;
