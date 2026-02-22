import React from "react";
import { getData } from "../Context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  pricerange,
  setPricerange,//
  category,
  setCategory,
   handleCategoryChange
}) => {
  const { onlyCategory } = getData();
  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max  hidden md:block">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />
      {/* category only data */}
      <h1 className=" font-semibold mt-5 text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {
          onlyCategory?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                className=" cursor-pointer"
                name={item}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
              />
              <button className=" cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>
      {/* price range */}
      <h1 className=" font-semibold mt-5 text-xl">Price Range</h1>
      <div className=" flex flex-col gap-2">
        <label htmlFor="">
          Price Range: ${pricerange[0]} - ${pricerange[1]}
        </label>
        <input
          type="range"
          name=""
          id=""
          min={0}
          max={5000}
          value={pricerange[1]}
          onChange={(e) =>
            setPricerange([pricerange[0], Number(e.target.value)])//
          }
        />
      </div>
      <button className=" bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
      onClick={()=>{setSearch(''); setCategory('ALL');setPricerange([0,5000])}}//
      >
        Reset Filter
      </button>
    </div>
  );
};

export default FilterSection;
