import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";
import { useAuth } from "./AuthContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, accessToken } = useAuth();

  // Fetch cart items from API
  const fetchCartItems = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get("/cart");
      console.log("Cart items fetched:", response.data.items);
      setCartItem(response.data.items || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load cart on mount and when accessToken changes
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems, isAuthenticated]);

  // Add to cart via API
  const addToCart = useCallback(
    async (product, quantity = 1) => {
      if (!isAuthenticated) {
        toast.error("Please sign in to add items to cart");
        return;
      }

      try {
        const response = await axiosInstance.post("/cart/add", {
          productId: product.id,
          quantity,
        });
        if (response.data) {
          fetchCartItems();
        }

        toast.success("Product added to cart!");
      } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error(err.message);
      }
    },
    [isAuthenticated],
  );

  const getCurrentQuantity = (productId) => {
    const item = cartItem.find((item) => item.product.id === productId);
    return item ? item.product.quantity : 0;
  };

  // Update quantity via API
  const updateQuantity = useCallback(
    async (productId, action) => {
      if (!isAuthenticated) {
        toast.error("Please sign in");
        return;
      }

      try {
        const response = await axiosInstance.post("/cart/update", {
          productId,
          quantity:
            action === "increase"
              ? getCurrentQuantity(productId) + 1
              : getCurrentQuantity(productId) - 1,
        });
        if (response.data) {
          fetchCartItems();
        }

        toast.success("Product quantity updated!");
      } catch (err) {
        console.error("Error updating quantity:", err);
        toast.error(err.message);
      }
    },
    [isAuthenticated],
  );

  // Delete item via API
  const deleteItem = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        toast.error("Please sign in");
        return;
      }

      try {
        const response = await axiosInstance.post("/cart/delete", {
          productId,
        });
        if (response.data) {
          fetchCartItems();
        }

        toast.success("Product removed from cart!");
      } catch (err) {
        console.error("Error deleting item:", err);
        toast.error(err.message);
      }
    },
    [isAuthenticated],
  );

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        deleteItem,
        loading,
        error,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
