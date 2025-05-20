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
import Page404 from "./pages/Page404"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (

    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/404" element={<Page404 />} />

            {/* protected admin routs */}
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

            {/* undefined path */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>

  );
}

export default App;

