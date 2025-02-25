import React, { useEffect, useState } from "react";
import { deleteCartItemAPI, getCartItemsAPI, updateCartItemAPI } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../services/baseUrl";

function Cart() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userDetails = sessionStorage.getItem("userDetils");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      setUserId(parsedUser._id);
    }
  }, [])

  useEffect(() => {
    if (userId) {
      getCartItems()
    }
  }, [userId])

  // fetch cart items from the backend
  const getCartItems = async () => {
    try {
      const result = await getCartItemsAPI(userId);
      if (result.status === 200) {
        setCartItems(result.data);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }

  // handle quantity change
  const updateQuantity = async (itemId, newQuantity) => {
    newQuantity = Number(newQuantity);
    if (newQuantity < 1) {
      Swal.fire(`It's an invalid quantity`)
    }
    else {
      const result = await updateCartItemAPI(itemId, newQuantity)
      // console.log(result);
      if (result.status === 200) {
        // Swal.fire(result.data.message)
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        )
      }
      else {
        Swal.fire(result.response.data.message)
      }
    }

  }

  // function to delete a product from cart
  const handleProductDelete = async (itemId, quantity) => {
    const result = await deleteCartItemAPI(itemId, quantity);

    if (result.status === 200) {
      Swal.fire(result.data)
      getCartItems()
    }
    else {
      Swal.fire('Not able to delete')
    }
  }

  //function for clicking checkout 
  const handleCheckout = () => {
    //checkout - navigate only
    Swal.fire('Checkout succussfull')
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="my-10">
        <h3 className="text-center text-3xl font-bold mb-5">
          Cart <span className="text-red-500">Summary</span>
        </h3>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-5">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">#</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Item Image</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <tr key={item._id} className="border-b">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 flex items-center space-x-3">
                          <img
                            src={`${BASE_URL}/uploads/${item.productImage}`}
                            alt="Product"
                            className="w-14 h-16 "
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 bg-gray-300 rounded"
                              onClick={() => updateQuantity(item._id, Math.max(0, Number(item.quantity) - 1))}>-
                            </button>
                            <input type="text" value={item.quantity} className="w-10 text-center border rounded" readOnly />
                            <button className="px-3 py-1 bg-gray-300 rounded"
                              onClick={() => updateQuantity(item._id, Number(item.quantity) + 1)}>+
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-teal-500 font-bold">₹{item.price}</td>
                        <td className="p-3">
                          <button onClick={() => handleProductDelete(item._id, item.quantity)} className="text-red-500 hover:text-red-700">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-5">No items in the cart</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-5 flex flex-col items-center h-44 min-h-[180px]">
            <h3 className="text-2xl font-bold">
              Grand <span className="text-red-500">Total</span>: ₹
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </h3>
            <button onClick={handleCheckout} className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
