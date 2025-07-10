import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../contexts/WishlistContext'
import { useCartlist } from '../contexts/CartContext'
import { getCartlist, getWishlist, removeFromCart, addToWishlist } from '../api'

function Cart() {

  let {wishlist, addItemToWishlist, setWishlist}=useWishlist()
  let {cartlist, removeItemFromCart, setCartlist} = useCartlist()

  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setShipping] = useState(0)
  let [total, setTotal] = useState("0.00")

  let [saveForLaterLoader, setSaveForLaterLoader]=useState(false)
  let [loading, setLoading]=useState(true)
  let [error, setError]=useState(null)

 useEffect(()=>{
let fetchCartlist = async () => {
  try {
    setLoading(true);
    let response = await getCartlist()
    let transformedCartlist = (response.data.items || []).map(item => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      img1: item.product.images[0],
      selectedSize: item.size,
      selectedQuantity: item.quantity
    }));

    setCartlist(transformedCartlist);
    setLoading(false);
  } catch (err) {
    setError("Failed to fetch cart. Please try again.");
    setCartlist([]);
    setLoading(false);
  }
};

  fetchCartlist();
}, [setCartlist])

useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        cartlist.map(item => ({
          id: item.id,
          size: item.selectedSize,
          quantity: item.selectedQuantity
        }))
      )
    );
  }, [cartlist])

  let handleSaveForLater=async(e, item)=>{
     e.preventDefault()
     e.stopPropagation()
     setSaveForLaterLoader(true)
     try{
       if (wishlist.some((cartitem) => cartitem.id === item.id)) {
         alert("Item already in wishlist")
      }else{
        await addToWishlist(item.id)
        addItemToWishlist(item)

        let response=await getWishlist()
        let transformedWishlist = (response.data.products || []).map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        img1: product.images[0],
        img2: product.images[1],
        sizes: product.sizes,
        selectedSize: product.selectedSize, 
        selectedQuantity: product.quantity
      }))
        setWishlist(transformedWishlist)
        
        await removeFromCart(item.id, item.selectedSize)
        removeItemFromCart(item.id, item.selectedSize)
      }
    }catch(err){
        console.error('Save for later error: ', err)
        alert('Failed to save for later')
      }finally{
        setSaveForLaterLoader(false)
      }      
    }

    let handleCheckout=()=>{
       let userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || !userData._id) {
            navigate("/login")
            setLoading(false)
            return
        }
        navigate("/cart/address")
    }

   let handleCross=async(e, id, selectedSize)=>{
     e.preventDefault();
    e.stopPropagation();
   try {
    await removeFromCart(id, selectedSize);
    removeItemFromCart(id, selectedSize);
  } catch (err) {
    console.error("Remove from cart error:", err.response?.data || err.message)
    alert("Failed to remove item from cart");
  }
}

 useEffect(() => {
  let computedSubtotal = (cartlist || []).reduce((acc, item) => {
    let price = parseFloat(item.price) || 0
    let quantity = parseFloat(item.selectedQuantity) || 1
    return acc + price * quantity;
  }, 0);
  setSubtotal(parseFloat(computedSubtotal.toFixed(2)))

  let computedShipping = computedSubtotal * 0.1
  setShipping(parseFloat(computedShipping.toFixed(2)))

  let computedTotal = (computedSubtotal + computedShipping).toFixed(2)
  setTotal(computedTotal)
}, [cartlist])

  let totalItems = (cartlist || []).reduce((acc, item) => acc + (item.selectedQuantity || 1), 0)
  let navigate=useNavigate()

   if(loading){
    return (
      <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center'>
    <div className="w-14 h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
    </div>
    )}

    if(error){
      return <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>{error || "Failed to fetch cart"}</div>
    }
 
  return (
   <>
      {cartlist.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center mt-10 sm:mt-16 md:mt-20 mb-20 sm:mb-24 md:mb-30 px-4 sm:px-6">
          <img
            className="w-full max-w-[300px] h-auto object-cover"
            src="https://i.pinimg.com/736x/29/f3/ac/29f3acfd62182ca148aba47963dddc50.jpg"
            alt="Empty cart illustration"
            loading="lazy"
          />
          <p className="font-bold text-xl sm:text-2xl md:text-3xl mt-4 sm:mt-6">Hey, it feels so light!</p>
          <p className="text-gray-500 text-sm sm:text-base mt-2">Explore more options.</p>
          <button
            onClick={() => navigate("/wishlist")}
            className="cursor-pointer font-bold text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6 mt-4 sm:mt-5 border border-pink-500 text-pink-500 hover:bg-pink-50 rounded-sm">
            ADD ITEMS FROM WISHLIST
          </button>
        </div>
      ) : (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          <p className="text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 md:mt-10 flex gap-x-2 items-center">
            My Bag <span className="text-gray-500 text-xl sm:text-2xl md:text-3xl">{totalItems} items</span>
          </p>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-7 mb-12">
             
              <div className="flex flex-col gap-y-4 sm:gap-y-5 mb-12 sm:mb-16 md:mb-20 w-full lg:w-2/3">
                {cartlist.map(item => (
                  <div key={item.id} className="flex w-full max-w-[700px] border border-gray-200 rounded-sm p-4 sm:p-5">
                    <div className="flex sm:flex-row gap-4 sm:gap-x-5 w-full">
                      <Link to={`/clothing/photo1/${item.id}`}>
                        <img className="w-30 lg:w-full sm:w-32 md:w-40 h-auto max-h-40 object-cover"
                          src={item.img1}
                        />
                      </Link>
                      <div className="flex flex-col text-left w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                          <Link to={`/clothing/photo1/${item.id}`} className="hover:underline text-lg sm:text-xl md:text-2xl">
                            {item.name}
                          </Link>
                          <p className="font-bold text-lg sm:text-xl md:text-2xl">${item.price}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                          Quantity: {item.selectedQuantity} at ${item.price}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Size: {item.selectedSize}</p>
                        <div className="flex gap-x-4 sm:gap-x-6 text-xs sm:text-sm mt-3 sm:mt-4">
                          <button
                            onClick={() => navigate(`/clothing/photo1/${item.id}`)}
                            className="underline cursor-pointer hover:text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={e => handleSaveForLater(e, item)}
                            className="underline cursor-pointer hover:text-blue-600"
                          >
                            Save For Later
                          </button>
                        </div>
                        <div className="flex text-xs sm:text-sm text-gray-600 gap-x-1 mt-3">
                          <svg
                            className="relative top-[2px] sm:top-[3px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                          >
                            <g fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                              <path d="M.5 9.5h9a4 4 0 1 0 0-8h-3" />
                              <path d="m3.5 6.5l-3 3l3 3" />
                            </g>
                          </svg>
                          <p className="font-bold text-black">7 days return available</p>
                        </div>
                      </div>
                      <button
                        onClick={e => handleCross(e, item.id, item.selectedSize)}
                        className="relative z-10 bottom-[80px] left-[6px] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                         <path fill="none" stroke="gray" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/wishlist")}
                  className="flex items-center hover:underline cursor-pointer w-full max-w-[700px] mt-4 sm:mt-6 text-left border border-gray-200 py-3 sm:py-4 rounded-sm text-xs sm:text-sm font-semibold"
                >
                  <svg
                    className="ml-3 mr-1 w-5 h-5 sm:w-6 sm:h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                  >
                    <path fill="black" d="M6 19.5V4h12v15.5l-6-2.583zm1-1.55l5-2.15l5 2.15V5H7zM7 5h10z" />
                  </svg>
                  Add More From Wishlist
                  <svg
                    className="ml-auto mr-3 w-4 h-4 sm:w-5 sm:h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="black"
                      d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full lg:w-1/3 max-w-[400px] border border-gray-200 rounded-sm p-4 sm:p-6 flex flex-col">
                <p className="text-left font-bold text-xl sm:text-2xl">Order Summary</p>
                <div className="flex flex-col border-t border-gray-200 mt-4 gap-y-4 sm:gap-y-5 pt-4 sm:pt-5">
                  <div className="flex text-base sm:text-lg w-full justify-between">
                    Subtotal <p className="font-bold">${subtotal}</p>
                  </div>
                  <div className="flex text-base sm:text-lg w-full justify-between">
                    Est. Shipping and Handling <p className="font-bold">${shipping}</p>
                  </div>
                  <div className="flex text-base sm:text-lg w-full justify-between">
                    Est. Sales Tax <p className="font-bold">*TBD</p>
                  </div>
                </div>
                <button className="flex w-full justify-between text-xl sm:text-2xl border-t border-b border-gray-200 py-4 sm:py-5 mt-3 sm:mt-4">
                  Total <p className="font-bold">${total}</p>
                </button>
                <p className="text-xs sm:text-sm mt-4 sm:mt-6 text-gray-500 font-semibold text-left">
                  *Tax estimated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  className="py-2 sm:py-3 font-bold bg-blue-600 rounded-sm hover:bg-blue-800 text-white mt-4 sm:mt-7 text-base sm:text-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
        {saveForLaterLoader && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-8 border-dotted border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </>
  )
}

export default Cart