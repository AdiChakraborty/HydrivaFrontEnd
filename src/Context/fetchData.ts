import axiosInstance from "../lib/axiosInstance";

export const fetchData = async () => {
  try {
    const res = await axiosInstance.get("/products");

    if (res) {
      const productsData = res.data;
      return productsData;
    }
  } catch (error) {
    console.log(error);
  }
};
