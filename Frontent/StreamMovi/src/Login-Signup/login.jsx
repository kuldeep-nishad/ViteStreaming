
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUser } from "../Url-Link/ApiUser";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { UserContext } from "../Helper/Helper-to-UseraccuntId";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const onFormSubmit = (e) => e.preventDefault();

  const handleSendOtp = async () => {
    setMsg("");
    if (!email.trim()) {
      setMsg("❌ Email is required");
      return;
    }

    try {
      setSendingOtp(true);

      await axios.get(`${ApiUser}/get-user`, { params: { email: email.trim() } });
      const res = await axios.post(`${ApiUser}/generate-otp`, { email: email.trim() });

      setOtpSent(true);
      setMsg(res.data?.message || "✅ OTP sent");
    } catch (err) {
      if (err.response?.status === 404) {
        setMsg("⚠️ Account not found. Redirecting to signup...");
        setTimeout(() => navigate("/signup"), 1500);
      } else {
        setMsg(err.response?.data?.message || "⚠️ Network/server error");
      }
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMsg("❌ Please enter OTP");
      return;
    }

    try {
      setVerifying(true);
      setMsg("");

      const payload = { Email: email.trim(), Otp: otp.trim() };
      const res = await axios.post(`${ApiUser}/verify-otp`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, userAccountId, name, email: userEmail } = res.data;

      if (!token || !userAccountId) {
        setMsg("❌ Invalid OTP or token missing");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);  
localStorage.setItem("userId",  userAccountId); 
      login({ userAccountId, name, email: userEmail });

      setMsg("✅ Login successful!");
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      console.error("OTP verification error:", err.response || err);
      if (err.response?.status === 401) setMsg("❌ OTP invalid or expired. Please request a new OTP.");
      else setMsg(err.response?.data?.message || "❌ Server error");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <form className="flex flex-col gap-4 w-96 p-8 border rounded-xl shadow-lg bg-white" onSubmit={onFormSubmit}>
        <h2 className="text-3xl font-bold text-center text-blue-600">🔐 Login</h2>

        {!otpSent ? (
          <>
            <label>Email <span className="text-red-500">*</span></label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 outline-none" />
            </div>
            <button type="button" onClick={handleSendOtp} disabled={sendingOtp}
              className={`bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition ${sendingOtp ? "opacity-60 cursor-not-allowed" : ""}`}>
              {sendingOtp ? "📩 Sending..." : "📩 Send OTP"}
            </button>
          </>
        ) : (
          <>
            <label>OTP <span className="text-red-500">*</span></label>
            <div className="flex items-center border rounded p-2">
              <FaKey className="text-gray-400 mr-2" />
              <input type={showOtp ? "text" : "password"} value={otp} onChange={(e) => setOtp(e.target.value)} className="flex-1 outline-none" />
              <span className="ml-2 cursor-pointer" onClick={() => setShowOtp(!showOtp)}>
                {showOtp ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <button type="button" onClick={handleVerifyOtp} disabled={verifying}
              className={`bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition ${verifying ? "opacity-60 cursor-not-allowed" : ""}`}>
              {verifying ? "🔍 Verifying..." : "✅ Verify & Login"}
            </button>
            <button type="button" onClick={() => { setOtpSent(false); setOtp(""); setMsg(""); }}
              className="text-sm text-gray-500 underline mt-2">
              ✉️ Use different email
            </button>
          </>
        )}

        <p className={`text-center ${msg.includes("✅") ? "text-green-600" : "text-red-500"}`}>{msg}</p>
        <p className="text-center text-sm text-blue-700 cursor-pointer" onClick={() => navigate("/signup")}>🆕 New user? Sign Up</p>
      </form>
    </div>
  );
};
