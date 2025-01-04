import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Product = () => {
  const [role, setRole] = useState("");

  // Function to handle role change
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="bg-gray-100 font-inter">
      <Navbar />
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg mt-8 max-w-xl relative">
        {/* Background animation of humans */}
        <div className="human-animation">
          <div className="human"></div>
          <div className="human"></div>
          <div className="human"></div>
          <div className="human"></div>
        </div>

        <h1 className="text-4xl text-center text-gray-800 font-semibold mb-6">
          Inventory Management System
        </h1>
        <h2 className="text-2xl text-gray-600 mb-6 text-center">
          User Management
        </h2>

        {/* Role Selection Section */}
        <div className="flex flex-col items-center gap-6 mb-6">
          <input
            type="text"
            className="input-field p-4 rounded-md text-lg w-80"
            placeholder="Enter Username"
          />
          <input
            type="password"
            className="input-field p-4 rounded-md text-lg w-80"
            placeholder="Enter Password"
          />
          <select
            onChange={handleRoleChange}
            className="input-field p-4 rounded-md text-lg w-80"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="STAFF">Staff</option>
          </select>
        </div>

        {/* Features Section */}
        {role === "ADMIN" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-purple-600 font-bold mb-4">
              Admin: Manage System
            </h3>
            <button className="btn w-full mb-3">Manage Products</button>
            <button className="btn w-full mb-3">Manage Users</button>
            <button className="btn w-full">Manage Suppliers</button>
          </div>
        )}

        {role === "MANAGER" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-purple-600 font-bold mb-4">
              Manager: Manage Products
            </h3>
            <button className="btn w-full mb-3">Add Product</button>
            <button className="btn w-full mb-3">Edit Product</button>
            <button className="btn w-full">Delete Product</button>
          </div>
        )}

        {role === "STAFF" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-purple-600 font-bold mb-4">
              Staff: Manage Inventory
            </h3>
            <button className="btn w-full">Update Inventory</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
