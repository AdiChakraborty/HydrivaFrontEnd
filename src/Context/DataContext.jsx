import axios from "axios";
import { createContext, useContext, useState } from "react";
import { fetchData } from "./fetchData";

export const DataContext = createContext(null)

export const DataProvider = ({children}) => {
    const [data,setData]=useState()

    //Fetching all products from apis

    const fetchAllProducts = async() => {
       let data = await fetchData()
       setData(data)
    }

    const getUniqueCatagory = (data,property) =>{
      let newVal = data?.map((curElem)=>{
        return curElem[property]
      })
       newVal=[...new Set(newVal)];
       return newVal;
    }

    const categoryOnlyData = getUniqueCatagory(data,"category");
    // console.log(categoryOnlyData );

    const onlyCategory = ['ALL',...new Set(categoryOnlyData.map(property => property.slug))]

    return <DataContext.Provider value = {{data,setData,fetchAllProducts,onlyCategory}}>
        {children}
    </DataContext.Provider>
}

export const getData = () => useContext(DataContext)