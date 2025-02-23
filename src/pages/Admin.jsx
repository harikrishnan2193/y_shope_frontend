import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../services/baseUrl';
import { updateStockAPI } from '../services/allApi';
import Header from '../components/Header';
import Swal from 'sweetalert2';
import { fetchProducts } from '../redux/productSlice';

function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stock, setStock] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const products = useSelector((state) => state.products.items);
  
  const dispatch = useDispatch();

  const handleStockUpdate = async () => {
    if (!selectedProductId || !stock) {
      Swal.fire("Please enter a valid stock quantity")
      return;
    }

    const reqBody = { stock: Number(stock) };
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    try {
      const result = await updateStockAPI(selectedProductId, reqBody, reqHeader);
      if (result.status === 200) {
        Swal.fire("Stock updated successfully")
        setIsModalOpen(false)
        dispatch(fetchProducts())
        setStock('')
      } else {
        Swal.fire(result.message)
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      Swal.fire('Something went wrong')
    }
  }

  return (
    <>
      <Header />
      <div className="mx-auto lg:px-lg-padding xl:px-xl-padding py-10">
        <div className="container mx-auto py-3 px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-3">
                  <img src={`${BASE_URL}/uploads/${item.productImage}`} alt={item.name} className="w-full h-[250px] object-cover rounded-md" />
                  <div className="text-center py-3">
                    <h5 className="font-bold text-lg">
                      {item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}
                    </h5>
                    <span className="text-primary text-xl">${item.price}</span>
                    <h2 className="text-sm">Available stock: {item.stock}</h2>
                    <div className="flex justify-center p-2">
                      <button
                        className="border border-green-500 text-green-500 px-4 py-2 rounded-md transition duration-300 hover:bg-green-500 hover:text-white"
                        onClick={() => {
                          setSelectedProductId(item._id);
                          setIsModalOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-arrow-trend-up"></i> <p>Update Stock</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Update Stock</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <label className="block text-sm font-medium text-gray-700">Enter New Added Stock</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter new stock level"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleStockUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
