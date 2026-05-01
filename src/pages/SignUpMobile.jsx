import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

function SignUpMobile() {
  const navigation = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [step, setStep] = useState("phone"); // "phone" | "otp"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  const location = useLocation();

  //if query string has otpstep=true then show otp step directly
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("otpstep") === "true") {
      setStep("otp");
      startTimer();
    }
    if (params.get("phone")) {
      setPhone(params.get("phone"));
    }
    if (params.get("countryCode")) {
      setCountryCode(params.get("countryCode"));
    }
  }, [location.search]);

  const { signInWithOtp, verifyOtp } = useAuth();

  function startTimer() {
    setTimer(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleSendOtp() {
    if (!phone || phone.length < 6) {
      setError("Please enter a valid mobile number");
      return;
    }
    //VALIDATE PHONE NUMBER FORMAT
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    const isSucess = await signInWithOtp(countryCode, phone);
    if (isSucess) {
      navigation(
        "?otpstep=true&countryCode=" + countryCode + "&phone=" + phone,
      );
    } else {
      setError("Failed to send OTP. Please try again.");
    }
  }

  async function handleVerifyOtp() {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setError("");
    const success = await verifyOtp(countryCode, phone, fullOtp);
    if (success) navigation("/");
    alert("OTP Verified! Login successful.");
  }

  function handleOtpChange(index, value) {
    const val = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  }

  function handleResend() {
    setOtp(["", "", "", "", "", ""]);
    startTimer();
    otpRefs.current[0]?.focus();
  }

  function handleBack() {
    clearInterval(timerRef.current);
    setOtp(["", "", "", "", "", ""]);
    setStep("phone");
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
                Sign in with Mobile
              </h1>

              {/* Step 1 — Phone Number */}
              {step === "phone" && (
                <div className="mt-12 space-y-6">
                  <div>
                    <label className="text-slate-900 text-sm font-medium mb-2 block">
                      Mobile Number
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="absolute left-0 h-full border-r border-slate-300 bg-transparent text-slate-900 text-sm px-2 outline-none rounded-l-md"
                        style={{ minWidth: "70px" }}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+971">+971</option>
                        <option value="+65">+65</option>
                      </select>
                      <input
                        type="text"
                        maxLength={10}
                        required
                        className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                        style={{ paddingLeft: "80px" }}
                        placeholder="Enter your mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {/* phone icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        className="w-4 h-4 absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.707 12.293a1 1 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 0L5.981 5.015c-.552.55-.724 1.342-.472 2.521.818 3.976 4.96 8.118 8.936 8.937.52.107.985.16 1.398.16 1.13 0 1.924-.4 2.462-.938l1.707-1.707a1 1 0 0 0 0-1.414z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-red-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-slate-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="!mt-12">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
                    >
                      Send OTP
                    </button>
                  </div>

                  <p className="text-slate-900 text-sm mt-6 text-center">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigation("/sign-up")}
                      className="text-red-600 hover:underline ml-1 font-semibold cursor-pointer"
                    >
                      Register here
                    </span>
                  </p>
                  <p className="text-slate-900 text-sm mt-6 text-center">
                    Sign in with Email...{" "}
                    <span
                      onClick={() => navigation("/sign-in")}
                      className="text-red-600 hover:underline ml-1 font-semibold cursor-pointer"
                    >
                      Click Here
                    </span>
                  </p>
                </div>
              )}

              {/* Step 2 — OTP */}
              {step === "otp" && (
                <div className="mt-10 space-y-6">
                  <div className="text-center mb-2">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                      {/* phone icon in red */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#dc2626"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.707 12.293a1 1 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 0L5.981 5.015c-.552.55-.724 1.342-.472 2.521.818 3.976 4.96 8.118 8.936 8.937.52.107.985.16 1.398.16 1.13 0 1.924-.4 2.462-.938l1.707-1.707a1 1 0 0 0 0-1.414z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500">
                      OTP sent to{" "}
                      <span className="font-semibold text-slate-900">
                        {countryCode} {phone}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-900 text-sm font-medium mb-3 block">
                      Enter OTP
                    </label>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpRefs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-11 h-12 text-center text-lg font-semibold text-slate-900 border border-slate-300 rounded-lg outline-blue-600 focus:border-red-500"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-center text-sm">
                    {!canResend ? (
                      <span className="text-slate-500">
                        Resend OTP in{" "}
                        <span className="font-semibold text-red-600">
                          {timer}s
                        </span>
                      </span>
                    ) : (
                      <span
                        onClick={handleResend}
                        className="text-red-600 font-semibold cursor-pointer hover:underline"
                      >
                        Resend OTP
                      </span>
                    )}
                  </div>

                  <div className="!mt-10 space-y-3">
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
                    >
                      Verify & Sign In
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-2 px-4 text-[15px] font-medium rounded-md text-slate-500 border border-slate-300 hover:bg-slate-50 cursor-pointer"
                    >
                      Change Number
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpMobile;
