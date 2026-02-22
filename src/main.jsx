import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./Context/DataContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./Context/AuthContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <App />
          {/* <ScrollToTop smooth/> */}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
);
