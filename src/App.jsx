import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import SignIn from "./pages/SignIn";
import RegisterForm from "./pages/RegisterForm";
import { RequireAuth } from "./components/RequireAuth";
import { RequireGuest } from "./components/RequireGuest";
import { supabase } from "./lib/supabase";
import OrderSummary from "./pages/OrderSummary";
import { AuthProvider, useAuth } from "./Context/AuthContext";

const AppContent = () => {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);

  const { loadSession, handleAuthChange } = useAuth();

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropdown(false);
      } catch (error) {}
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    // 🔔 Listen to auth state changes
    const { data: listener } =
      supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:slug" element={<SingleProduct />}></Route>
        <Route path="/category/:category" element={<CategoryProduct />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart location={location} getLocation={getLocation} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <RequireGuest>
              <SignIn />
            </RequireGuest>
          }
        ></Route>
        <Route path="/summary" element={<OrderSummary />}></Route>
        <Route
          path="/sign-up"
          element={
            <RequireGuest>
              <RegisterForm />
            </RequireGuest>
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
