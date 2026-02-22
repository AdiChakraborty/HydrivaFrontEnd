import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Video from "../assets/loding.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "./ProductListView";

function CategoryProduct() {
  const [searchData, setSearchData] = useState([]);
  const params = useParams();
  const category = params.category;
  const navigate = useNavigate()
  // console.log(category); 

  const getFilterData = async () => {
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products`);
      // const data = res.data;
      const filteredData = res.data?.filter(
        (item) => item.category.slug.toLowerCase() === category.toLowerCase()
      );
      setSearchData(filteredData);
      console.log("searchData",searchData); ////////////////////
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0,0)
  }, [category]);

  return (
    <div>
      {searchData?.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button onClick={()=>navigate('/')} className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center">
            <ChevronLeft />
            Back
          </button>
          {
            searchData.map((product)=>{
              return <ProductListView key={product.id} product={product}/>
            })
          }
        </div>
      ) : (
        <div className=" flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Video} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct;
