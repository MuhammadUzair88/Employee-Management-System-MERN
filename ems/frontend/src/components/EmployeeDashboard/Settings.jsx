import React, { useState } from "react";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add password change logic here
    console.log({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="oldPassword"
          >
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Change Password"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
