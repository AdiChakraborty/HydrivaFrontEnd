import axios from "axios";

export const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    
    if (res) {
      const productsData = res.data;
      return productsData;
    }
  } catch (error) {
    console.log(error);
  }
};
