import React, { useEffect, useState } from "react";
import { getData } from "../Context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/loding.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import noDataAni from "../assets/noDataAni.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [pricerange, setPricerange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    // console.log(e.target.value);
    if (category === e.target.value) {
      setCategory("All");
      return;
    }
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false)
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0,0)
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category.toLowerCase() === "all" ||
        item.category.name.toLowerCase() === category.toLowerCase()) &&
      item.price >= pricerange[0] &&
      item.price <= pricerange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {/* <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          pricerange={pricerange}
          setPricerange={setPricerange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
        /> */}
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              {/* <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                pricerange={pricerange}
                setPricerange={setPricerange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
              /> */}
              {filteredData?.length > 0 ? (
                <div className=" flex flex-col justify-center items-center">
                  <div className=" grid grid-cols-2 md:grid-cols-4 md:gap-7 gap-2 mt-10 ">
                    {filteredData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>
                  {/* <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  /> */}
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={noDataAni} classID="w-[500px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
