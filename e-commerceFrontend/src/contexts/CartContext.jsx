import React, {createContext, useContext, useState} from 'react'

let CartContext=createContext()
export let useCartlist=()=>useContext(CartContext)

export function CartlistProvider({children}){
    let [cartlist, setCartlist]=useState([])

    let addItemToCart=(item)=>{
    setCartlist((prevCartlist) => {
      let existingItem = prevCartlist.find(
        (w) => w.id === item.id && w.selectedSize === item.selectedSize
      )

      if (existingItem) {
        return prevCartlist.map((w) =>
          w.id === item.id && w.selectedSize === item.selectedSize
            ? {
                ...w,selectedQuantity: Math.min((w.selectedQuantity || 1) + (item.selectedQuantity || 1), 6),
              }
                   : w
        )
      } else {
        return [...prevCartlist, { ...item, selectedQuantity: item.selectedQuantity || 1 }]
      }
    })
    }

     let removeItemFromCart = (id, selectedSize) => {
  setCartlist(cartlist.filter((item) => !(item.id === id && item.selectedSize === selectedSize)));
};

     return (
    <CartContext.Provider value={{cartlist, setCartlist, addItemToCart, removeItemFromCart}}>
        {children}
    </CartContext.Provider>
  )
}

