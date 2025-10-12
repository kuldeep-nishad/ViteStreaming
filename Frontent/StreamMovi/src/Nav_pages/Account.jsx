import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUser } from "../Url-Link/ApiUser";
import { FaPen, FaCheck, FaTrash } from "react-icons/fa";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(""); // Currently editing
  const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "" });

  const userEmail = localStorage.getItem("email") || "";

  // Fetch user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!userEmail || activeTab !== "profile") return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${ApiUser}/get-user?email=${userEmail}`);
        const userData = res.data;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
        });
        localStorage.setItem("userId", userData.id);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchUser();
  }, [activeTab, userEmail]);

  const handleUpdate = async () => {
    if (!user) return;

    const confirmUpdate = window.confirm("Are you sure you want to update your details?");
    if (!confirmUpdate) return;

    const updateData = {
      id: user.id,
      name: formData.name,
      email: user.email,
      phoneNumber: formData.phoneNumber,
      otp: user.otp || "",
    };

    try {
      const res = await axios.put(`${ApiUser}`, updateData);
      setUser(res.data);
      setEditingField("");
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account permanently? This action cannot be undone!"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${ApiUser}/${user.id}`);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("❌ Failed to delete account. Try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    }

    if (name === "phoneNumber") {
      const regex = /^\d{0,10}$/;
      if (!regex.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-green-600">Account</h1>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${
              activeTab === "profile" ? "bg-green-50 font-semibold" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="w-4 h-4 bg-green-600 rounded-full"></span>
            <span>Profile </span>
          </li>
          <li
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${
              activeTab === "security" ? "bg-green-50 font-semibold" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("security")}
          >
            <span className="w-4 h-4">🔒</span>
            <span>Account Management</span>
          </li>
          {/* <li
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${
              activeTab === "support" ? "bg-green-50 font-semibold" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("support")}
          >
            <span className="w-4 h-4">👁️</span>
            <span>Help & Support</span>
          </li> */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Profile Details</h2>

            {user ? (
              <div className="space-y-4">
                {/* Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <strong className="w-24 text-gray-600">Name:</strong>
                    {editingField === "name" ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded px-3 py-1 focus:outli ne-green-500"
                      />
                    ) : (
                      <span className="text-gray-800">{user.name}</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editingField === "name" ? (
                      <FaCheck
                        className="text-green-600 cursor-pointer"
                        onClick={handleUpdate}
                      />
                    ) : (
                      <FaPen
                        className="text-gray-400 hover:text-green-600 cursor-pointer"
                        onClick={() => setEditingField("name")}
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <strong className="w-24 text-gray-600">Email:</strong>
                  <span className="text-gray-800">{user.email}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <strong className="w-24 text-gray-600">Phone:</strong>
                    {editingField === "phoneNumber" ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border rounded px-3 py-1 focus:outline-green-500"
                      />
                    ) : (
                      <span className="text-gray-800">{user.phoneNumber}</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editingField === "phoneNumber" ? (
                      <FaCheck
                        className="text-green-600 cursor-pointer"
                        onClick={handleUpdate}
                      />
                    ) : (
                      <FaPen
                        className="text-gray-400 hover:text-green-600 cursor-pointer"
                        onClick={() => setEditingField("phoneNumber")}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Failed to load user details. Please try again.</p>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Account Delete Permanently</h2>
            <button
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleDelete}
            >
              <FaTrash /> <span>Delete My Account</span>
            </button>
          </div>
        )}

        {/* {activeTab === "support" && (
          <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Help & Support</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                console.log("Support submitted:", Object.fromEntries(data));
                alert("Support request submitted");
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full border p-3 rounded focus:outline-green-500"
                required
              />
              <textarea
                name="error"
                placeholder="Describe your issue"
                className="w-full border p-3 rounded focus:outline-green-500"
                rows="4"
                required
              />
              <input type="file" name="file" className="w-full border p-2 rounded" />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </form>
          </div>
        )} */}
      </main>
    </div>
  );
};

export default Account;



