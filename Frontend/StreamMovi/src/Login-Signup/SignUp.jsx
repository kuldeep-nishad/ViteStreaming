import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiUser } from "../Url-Link/ApiUser";
import { FaEnvelope, FaKey, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  // Restrict name: letters and spaces only
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setName(value);
    }
  };

  // Restrict phone: digits only
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhone(value);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|in|org|gov)$/i.test(email);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setMsg("❌ Name and Email are required");
      return;
    }
    if (!validateEmail(email)) {
      setMsg("❌ Invalid Email format (must include @ and end with .com, .in, or .org)");
      return;
    }

    try {
      await axios.post(`${ApiUser}/generate-otp`, { email });
      setOtpSent(true);
      setMsg("✅ OTP sent to your email");
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Error sending OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMsg("❌ OTP is required");
      return;
    }
    try {
      const res = await axios.post(`${ApiUser}/verify-otp`, {
        name,
        email,
        phone: phone || null,
        otp,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
    localStorage.setItem("userId", res.data.id || res.data.userAccountId);
      setMsg("✅ Signup successful!");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 via-white to-purple-50">
      <form className="flex flex-col gap-4 w-96 p-8 border rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-purple-600">📝 Sign Up</h2>

        {!otpSent ? (
          <>
            <label className="text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded p-2">
              <FaUserAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={handleNameChange} // restricted
                required
                className="flex-1 outline-none"
              />
            </div>

            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 outline-none"
              />
            </div>

            <label className="text-sm font-medium text-gray-700">
              Phone <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex items-center border rounded p-2">
              <FaPhoneAlt className="text-gray-400 mr-2" />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={handlePhoneChange} // restricted
                className="flex-1 outline-none"
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition"
            >
              📩 Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="text-sm font-medium text-gray-700">
              OTP <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded p-2">
              <FaKey className="text-gray-400 mr-2" />
              <input
                type={showOtp ? "text" : "password"}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="flex-1 outline-none"
              />
              <span
                className="cursor-pointer text-gray-500 ml-2"
                onClick={() => setShowOtp(!showOtp)}
              >
                {showOtp ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
            >
              ✅ Verify & Signup
            </button>
          </>
        )}

        <p
          className="text-center text-sm text-purple-700 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          🔑 Already a user? Login
        </p>

        {msg && (
          <p
            className={`text-center font-medium ${
              msg.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
};
