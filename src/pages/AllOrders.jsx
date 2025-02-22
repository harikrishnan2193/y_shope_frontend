import React, { useEffect, useState } from "react";
import { getAllOrdersAPI } from "../services/allApi";
import { BASE_URL } from "../services/baseUrl";

function AllOrders() {
  const [orders, setOrders] = useState([]);

  // function to fetch all orders
  const getAllOrders = async () => {
    try {
      const response = await getAllOrdersAPI();
      if (response.status === 200) {
        console.log("Fetched Orders:", response.data);
        setOrders(response.data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 my-10">
      <h3 className="text-center text-3xl font-bold mb-5">
        All <span className="text-red-500">Orders</span>
      </h3>

      <div className="bg-white shadow-lg rounded-lg p-5">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Ordered Item</th>
                <th className="p-3">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{order.username}</td>
                    <td className="p-3">{order.email}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={`${BASE_URL}/uploads/${order.productImage}`}
                        alt="Product"
                        className="w-12 h-12 rounded"
                      />
                      <span>{order.productName}</span>
                    </td>
                    <td className="p-3 font-bold text-teal-500">{order.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-5">
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
