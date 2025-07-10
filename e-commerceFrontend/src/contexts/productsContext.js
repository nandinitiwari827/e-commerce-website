import { createContext, useContext } from "react";

export let ProductsContext=createContext({
    productss:[
        {
            id: 1,
            name: "something",
            price: "$69",
            img1: "",
            img2: "",
        }
    ],

    addProduct: (product1)=>{},
    deleteProduct: (id,product1)=>{},
})

export let useProduct=()=>{
    return useContext(ProductsContext)
}

export let ProductsProvider=ProductsContext.Provider