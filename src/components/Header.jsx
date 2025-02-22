import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addProdutAPI } from '../services/allApi';

function Header() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userDetails, setUserDetails] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    productImage: ''
  })
  // console.log(product);
  const [imgPreview, setImgPreview] = useState("")
  const [token, setToken] = useState("")

  const location = useLocation();
  const isAdminPath = location.pathname === '/admin';
  const isHomePath = location.pathname === '/';

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('userDetils'));
    setUserDetails(storedUser);
  }, []);

  //set image url
  useEffect(() => {
    if (product.productImage) {
      setImgPreview(URL.createObjectURL(product.productImage))
    }
  }, [product.productImage])

  //get token from session and store to state
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  // logout function
  const handleLogout = () => {
    sessionStorage.removeItem('userDetils');
    sessionStorage.removeItem('token');
    setUserDetails(null);
    alert('Logout sucussfull')
    navigate('/');
  }

  //function to add product
  const handleAddProduct = async (e) => {
    if (!token) {
      alert('Not authorized to upload')
    }
    e.preventDefault()
    const { name, price, stock, productImage } = product

    if (!name || !price || !stock || !productImage) {
      alert('Plese fill all the fillds')
    }
    else {
      //reqBody
      const reqBody = new FormData()
      reqBody.append('name', name)
      reqBody.append('price', price)
      reqBody.append('stock', stock)
      reqBody.append('productImage', productImage)

      //reqHeader
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await addProdutAPI(reqBody, reqHeader)
        // console.log(result);
        if (result.status === 200) {
          alert('Project added succesfully')
          setProduct({ name: "", price: "", stock: "", setImgPreview: "" })
          setIsModalOpen(false)
          window.location.reload();
        }
        else {
          alert(result.response.data);
        }
      }
    }

  }

  return (
    <>
      <div id='header' className="bg-red-700 py-2 text-white mx-auto lg:px-lg-padding xl:px-xl-padding">
        <nav className="flex flex-col sm:flex-row items-center justify-between py-3 px-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <i className="fa-brands fa-shopify text-5xl"></i>
            <Link to={'/'}><h1 className="text-2xl font-bold font-raleway">Y-Shope</h1></Link>
          </div>

          {isHomePath && (
            <div className='hidden text-white xl:flex flex-col sm:flex-row space-x-0 sm:space-x-8 space-y-2 sm:space-y-0'>
              <Link to={'/cart'}>
                <button className="btn btn-outline-light me-2">
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </button>
              </Link>
              {userDetails ? (
                <button onClick={handleLogout} className='btn btn-outline-light rounded-pill'>
                  <i className="fa-solid fa-sign-out"></i> Logout ({userDetails.name})
                </button>
              ) : (
                <Link to={'/login'}>
                  <button className='btn btn-outline-light rounded-pill'>
                    <i className="fa-solid fa-user"></i> Login
                  </button>
                </Link>
              )}
            </div>
          )}

          {isAdminPath && (
            <div className='hidden text-white xl:flex flex-col sm:flex-row space-x-0 sm:space-x-8 space-y-2 sm:space-y-0'>
              <button onClick={() => setIsModalOpen(true)} className='btn btn-outline-light rounded-pill'>
                <i className="fa-solid fa-cart-shopping"></i> Add Product
              </button>
              <Link to={'/allorders'}>
                <button className='btn btn-outline-light rounded-pill'>
                  <i className="fa-solid fa-box"></i> View Orders
                </button>
              </Link>
              <Link to={'/allUsers'}>
                <button className='btn btn-outline-light rounded-pill'>
                  <i className="fa-solid fa-users"></i> View Users
                </button>
              </Link>
            </div>
          )}

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden text-white text-3xl">
            <i className="fa-solid fa-bars"></i>
          </button>
        </nav>

        {/* Sidebar Menu */}
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/3 h-full bg-red-700 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
          <div className="p-5">
            <button onClick={() => setIsMenuOpen(false)} className="text-white text-3xl">
              <i className="fas fa-times"></i>
            </button>
          </div>
          {isHomePath && (
            <nav className="flex flex-col items-start space-y-10 p-5 text-white">
              <Link to={'/cart'}>
                <button className="btn btn-outline-light me-3">
                  <i className="fa-solid fa-cart-shopping"></i> Cart <span className="badge text-bg-secondary"> 0 </span>
                </button>
              </Link>
              {userDetails ? (
                <button onClick={handleLogout} className='btn btn-outline-light rounded-pill'>
                  <i className="fa-solid fa-sign-out"></i> Logout ({userDetails.name})
                </button>
              ) : (
                <Link to={'/login'}>
                  <button className='btn btn-outline-light rounded-pill'>
                    <i className="fa-solid fa-user"></i> Login
                  </button>
                </Link>
              )}
            </nav>
          )}
          {isAdminPath && (
            <nav className="flex flex-col items-start space-y-10 p-5 text-white">
              <button onClick={() => setIsModalOpen(true)} className='btn btn-outline-light me-4 rounded-pill'>
                <i className="fa-solid fa-cart-shopping"></i> Add Product
              </button>
              <Link to={'/allorders'}>
                <button className='btn btn-outline-light me-4 rounded-pill'>
                  <i className="fa-solid fa-box"></i> View Orders
                </button>
              </Link>
              <Link to={'/allUsers'}>
                <button className='btn btn-outline-light me-4 rounded-pill'>
                  <i className="fa-solid fa-users"></i> View Users
                </button>
              </Link>
            </nav>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>

            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full p-2 mb-3 border rounded-md"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Enter Product Price"
                  className="w-full p-2 mb-3 border rounded-md"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Enter Stock Available"
                  className="w-full p-2 mb-3 border rounded-md"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                />
              </div>

              <div className="w-1/2 flex justify-center items-center">
                <label htmlFor="upload" className="cursor-pointer w-full h-[150px] bg-blue-500 flex justify-center items-center rounded-md">
                  <input
                    id="upload"
                    type="file"
                    onChange={(e) => setProduct({ ...product, productImage: e.target.files[0] })}
                    style={{ display: "none" }}
                  />
                  <img
                    src={imgPreview ? imgPreview : "https://cdn-icons-png.flaticon.com/512/1004/1004733.png"}
                    alt="Project Illustration"
                    className="w-auto h-auto max-h-full object-cover"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button onClick={handleAddProduct} className="px-4 py-2 bg-red-500 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Header;
