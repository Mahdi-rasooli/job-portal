import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { AppContext } from "../context/contextStore";
import Footer from "./Footer";

const ChangePassword = () => {

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const { userData, userToken } = useContext(AppContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const response = await axios.put(`http://localhost:5000/api/user/update-password/${userData._id}`,
        { password: formData.newPassword },
        { headers: { token: userToken } })

     

      if (response.data.success) {
        toast.success('Password changed successfully')
        setFormData({
          newPassword: "",
          confirmPassword: ""
        })
      }
      else {
        toast.error('Failed to change password')
      }

    } catch (error) {
      toast.error('Something went wrong')
    }

  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="min-h-screen flex items-start justify-center mt-20">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["newPassword", "confirmPassword"].map((field, index) => (
            <div key={index}>
              <label className="block text-gray-600 text-sm mb-2">
                {field === "newPassword" ? "New Password" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword({ ...showPassword, [field]: !showPassword[field] })}
                >
                  {showPassword[field] ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full mb-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;