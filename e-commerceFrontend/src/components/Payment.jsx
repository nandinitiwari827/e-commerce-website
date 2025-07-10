import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder, clearCart } from '../api.js'
import { useCartlist } from '../contexts/CartContext.jsx'

function Payment() {
    let navigate=useNavigate()

     let {setCartlist, cartlist} = useCartlist()

    let [selectedOption, setSelectedOption]=useState("COD")
     let [subtotal, setSubtotal] = useState(0)
      let [shipping, setShipping] = useState(0)
      let [total, setTotal] = useState("0.00")
    let [loading, setLoading]=useState(false)
    let [error, setError]=useState("")
    let [shippingAddress, setShippingAddress]=useState({})

    useEffect(()=>{
      let savedAddress=JSON.parse(localStorage.getItem("shippingAddress")) || {}
      setShippingAddress(savedAddress)

      let computedSubtotal = (cartlist || []).reduce((acc, item) => {
      let price = parseFloat(item.price) || 0;
      let quantity = parseFloat(item.selectedQuantity) || 1;
      return acc + price * quantity;
    }, 0);
    setSubtotal(parseFloat(computedSubtotal.toFixed(2)));

    let computedShipping = computedSubtotal * 0.1;
    setShipping(parseFloat(computedShipping.toFixed(2)));

    let computedTotal = (computedSubtotal + computedShipping).toFixed(2);
    setTotal(computedTotal);
    }, [])

   let handlePlaceOrder=async(e)=>{
    e.preventDefault()
    setLoading(true)
  
      try{
        let userData = JSON.parse(localStorage.getItem("user"));
        let user = userData?._id
          if (!user) {
            navigate("/login")
            setLoading(false)
            return
        }
       
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
       
        let items = cartItems.map(item => ({
              product: item.id,
              size: item.selectedSize || item.size,
              quantity: item.selectedQuantity || item.quantity
          }));

          let paymentMethod=selectedOption
          let shippingAddress=JSON.parse(localStorage.getItem("shippingAddress")) || {}
  
          let orderData={
              user,
              items,
              paymentMethod,
              shippingAddress,
              subtotal,
              shipping,
              total,
          }
  
          let res=await createOrder(orderData)
          if(res.data && res.data._id){
            await clearCart()
            localStorage.setItem("cartItems", JSON.stringify([]))
            setCartlist([])
            localStorage.setItem("recentOrderId", res.data._id)
          }
          navigate("/orderPlaced")
      }catch(error){
       console.error("Order placing error: ", error.response?.data || error.message)
       setError(error.response?.data?.message || "Failed to make payment")
       alert("Failed to make payment")
      }finally{
   setLoading(false)
  }}

return (
    <div className='flex flex-col justify-center items-center mt-8 px-4 sm:px-6'>
      <div className='text-left w-full max-w-[750px]'>
        <div className='p-3 border border-gray-300 rounded-sm'>
          <p className='font-semibold text-pink-700'>Deliver To: {shippingAddress.firstName} {shippingAddress.lastName || ""}, {shippingAddress.postalCode}</p>
          <p className='text-[13px] text-gray-500'>{shippingAddress.addressLine}, {shippingAddress.city}</p>
         <button onClick={() => navigate("/cart/address")} className='cursor-pointer hover:text-pink-600 font-semibold text-lg text-pink-700 mt-2 sm:mt-0 sm:absolute sm:right-16 sm:top-16 md:right-24 md:top-20 lg:right-[275px] lg:top-[168px]' style={{ fontFamily: "monospace" }}>CHANGE</button>
        </div>

        <p className='mt-8 font-semibold text-lg'>Payment Options</p>
        <div className='mt-4 space-y-3'>
          {['NetBanking', 'UPI', 'Card', 'COD'].map((option) => (
            <label key={option} className="flex items-center justify-between border border-gray-300 py-3 px-5 rounded-sm cursor-pointer">
              <span className="text-gray-700">{option}</span>
              <input type="radio" name="paymentOptions" value={option} checked={selectedOption === option} onChange={() => setSelectedOption(option)} className="w-5 h-5 text-blue-600 border-gray-300 cursor-pointer" />
            </label>
          ))}
        </div>
      </div>

      <button onClick={handlePlaceOrder} className='py-3 font-bold bg-blue-600 w-44 rounded-sm mb-5 cursor-pointer hover:bg-blue-800 text-white mt-9 text-lg'>Place Order</button>

      {loading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="w-12 h-12 border-8 border-dotted border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>{error}</div>
      )}
    </div>
  )
}

export default Payment