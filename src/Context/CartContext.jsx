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
    if (!isAuthenticated || loading || !accessToken) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get("/cart");
      console.log("Cart items fetched:", response.data.items);
      setCartItem(response.data.items || []);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
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
      if (loading) return;
      if (!isAuthenticated) {
        toast.error("Please sign in to add items to cart");
        return;
      }
      setLoading(true);

      try {
        const response = await axiosInstance.post("/cart/add", {
          productId: product.id,
          quantity,
        });
        if (response.data) {
          setLoading(false);
          fetchCartItems();
        }

        toast.success("Product added to cart!");
      } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, fetchCartItems, loading],
  );

  const createOrder = async (addressId) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/orders/create", {
        addressId,
      });
      setLoading(false);
      return response?.data;
    } catch (error) {
      console.log("Error in createOrder", err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const getCurrentQuantity = (productId) => {
    const item = cartItem.find((item) => item.product.id === productId);
    return item ? item?.quantity : 0;
  };

  // Update quantity via API
  const updateQuantity = useCallback(
    async (productId, action) => {
      if (loading) return;
      if (!isAuthenticated) {
        toast.error("Please sign in");
        return;
      }
      setLoading(true);
      const currentQuantity = getCurrentQuantity(productId);
      if (currentQuantity === 1 && action === "decrease") {
        deleteItem(productId);
      } else {
        try {
          const response = await axiosInstance.put("/cart/update", {
            productId,
            quantity:
              action === "increase"
                ? getCurrentQuantity(productId) + 1
                : getCurrentQuantity(productId) - 1,
          });
          if (response.data) {
            setLoading(false);
            fetchCartItems();
          }

          toast.success("Product quantity updated!");
        } catch (err) {
          console.error("Error updating quantity:", err);
          toast.error(err?.response?.data?.message || "Failed to update cart");
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    },
    [isAuthenticated, cartItem, getCurrentQuantity, loading, fetchCartItems],
  );

  // Delete item via API
  const deleteItem = useCallback(
    async (productId) => {
      if (loading) return;
      if (!isAuthenticated) {
        toast.error("Please sign in");
        return;
      }
      setLoading(true);

      try {
        const response = await axiosInstance.delete(
          "/cart/remove/" + productId,
        );
        if (response.data) {
          fetchCartItems();
          setLoading(false);
        }

        toast.success("Product removed from cart!");
      } catch (err) {
        console.error("Error deleting item:", err);
        toast.error(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, fetchCartItems, loading],
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
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
