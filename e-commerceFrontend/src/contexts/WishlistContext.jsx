import React, {createContext, useContext, useState} from 'react'

let WishlistContext=createContext()

export let useWishlist=()=>useContext(WishlistContext)

export function WishlistProvider({children}) {
    let [wishlist, setWishlist]=useState([])
     let [likedItems, setLikedItems] = useState([])

    let addItemToWishlist=(item)=>{
    if (!wishlist.find(w => w.id === item.id)){
     setWishlist([...wishlist, item])
    setLikedItems([...likedItems, item.id])
    }
    }

    let removeItemFromWishlist=(id)=>{
    setWishlist(wishlist.filter((item) => item.id !== id))
    setLikedItems(likedItems.filter(itemId=> itemId!==id))
    }


  return (
    <WishlistContext.Provider value={{wishlist, setWishlist, addItemToWishlist, removeItemFromWishlist}}>
        {children}
    </WishlistContext.Provider>
  )
}
