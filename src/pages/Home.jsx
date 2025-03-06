import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { BASE_URL } from "../services/baseUrl";
import { addToCartAPI } from "../services/allApi";
import Swal from "sweetalert2";

function Home() {
  const products = useSelector((state) => state.products.items)
  const [token, setToken] = useState("")
  const [isRoleAdmin, setIsRoleAdmin] = useState(false)


  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('userDetils'));
    //check user role is admin
    if (storedUser?.role === "admin") {
      setIsRoleAdmin(true);
    }

    //get token from session
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }

  }, [])

  // function to add item to cart
  const handleAddToCart = async (product) => {
    if (isRoleAdmin) {
      Swal.fire("Admin not allowed to book items");
      return;
    }
    if (!token) {
      Swal.fire({
        title: "Not authorized to add items!",
        text: "Please login",
        icon: "warning",
        confirmButtonColor: "#ff0000",
      })
      return;
    }

    const reqBody = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      productImage: product.productImage,
    }
    // console.log(reqBody);

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }

    try {
      const result = await addToCartAPI(reqBody, reqHeader);

      if (result.status === 200) {
        // console.log(result);
        Swal.fire(result.data.message)
      } else {
        Swal.fire(result.response.data.message)
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Something went wrong while adding the item to the cart.")
    }
  }


  return (
    <>
      <Header />
      <div className="mx-auto lg:px-lg-padding xl:px-xl-padding py-10">
        <div className="container mx-auto py-3 px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.length > 0 ? (
              products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={`${BASE_URL}/uploads/${item.productImage}`}
                    alt={item.name}
                    className="w-full h-[250px] object-cover rounded-t-lg"
                  />
                  <div className="text-center py-3">
                    <h5 className="font-bold text-lg">{item.name}</h5>
                    <span className="text-primary text-xl">${item.price}</span>
                  </div>
                  <div className="flex justify-center p-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="border border-green-500 text-green-500 px-4 py-2 rounded-md transition duration-300 hover:bg-green-500 hover:text-white"
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products currently available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
