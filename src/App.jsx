import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Cart from "./pages/Cart"
import Admin from "./pages/Admin"
import Footer from "./components/Footer"
import AllUsers from "./pages/AllUsers"
import AllOrders from "./pages/AllOrders"


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/productSlice";
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    // <>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/register" element={<Auth />} />
    //     <Route path="/login" element={<Auth />} />
    //     <Route path="/cart" element={<Cart />} />
    //     <Route path="/admin" element={<Admin />} />
    //     <Route path="/allUsers" element={<AllUsers />} />
    //     <Route path="/allorders" element={<AllOrders />} />
    //   </Routes>
    //   <Footer />
    // </>

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
  
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/allUsers"
          element={
            <PrivateRoute>
              <AllUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/allorders"
          element={
            <PrivateRoute>
              <AllOrders />
            </PrivateRoute>
          }
        />
      </Routes>
    </>

  );
}

export default App;

