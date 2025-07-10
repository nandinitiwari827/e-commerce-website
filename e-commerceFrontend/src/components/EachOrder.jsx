import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOrderById } from '../api.js'

function EachOrder() {

   let { id } = useParams()

  let [loading, setLoading]=useState(false)
  let [error, setError] = useState("")
  let [order, setOrder]=useState(null)

  useEffect(()=>{
    let fetchOrder=async()=>{
      try{
        setLoading(true)
        let response=await getOrderById(id)
        setOrder(response.data)
        setLoading(false)
      }catch(err){
        console.error('Error fetching order: ', err.response?.data)
        setError('Failed to fetch order')
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  useEffect(() => {
  localStorage.removeItem("recentOrderId")
}, [])

  let subtotal = order?.subtotal || 0
  let shipping = order?.shipping || 0
  let totalPrice = order?.totalPrice || "0.00"

   if(loading){
       return (
     <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center'>
 <div className="w-14 h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
 </div>
  )
 }

    if(error || !order){
      return <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>Failed to fetch order</div>
    }

   return (
    <div className="flex justify-center items-center px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-start mt-5 sm:mt-8 w-full max-w-[650px]">
        <p className="py-1 px-2 rounded-2xl bg-gray-100 text-gray-600 text-xs sm:text-sm">
          Order ID: {order._id}
        </p>

        <p className="mt-4 mb-3 font-semibold text-base sm:text-lg md:text-xl">Items</p>
        <div className="border border-gray-200 rounded-sm p-4 sm:p-5 md:p-6 flex flex-col gap-y-4 w-full shadow-md">
          {order.items.map((item) => (
            <div key={`${item.product._id}-${item.size}`} className="flex gap-3 sm:gap-x-4 border-b border-gray-200 pb-4">
              <Link to={`/clothing/photo1/${item.product._id}`} className="rounded-sm">
                <img
                  className="w-full sm:w-20 h-auto max-h-20 rounded-sm object-cover"
                  src={item.product.images[0]}
                />
              </Link>
              <div className="flex flex-col text-left w-full">
                <Link to={`/clothing/photo1/${item.product._id}`} className="hover:underline text-base sm:text-lg md:text-xl">
                 {item.product.name}
                </Link>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  Quantity: {item.quantity}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Size: {item.size}</p>
              </div>
            </div>
          ))}
          <p className="font-semibold text-lg sm:text-xl md:text-2xl text-left">
            Delivered on{' '}
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </p>
        </div>

        <p className="mb-3 sm:mb-4 mt-5 sm:mt-6 font-semibold text-base sm:text-lg md:text-xl">
          Delivery details
        </p>
        <div className="border border-gray-200 rounded-sm w-full">
          <div className="flex border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-5 gap-x-2 sm:gap-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
         <path fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m8 7a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm sm:text-base">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName || ""}
              </p>
              <p className="text-xs sm:text-sm">
                {order.shippingAddress.addressLine}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state}, {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>
          <div className="flex py-3 sm:py-4 px-4 sm:px-5 gap-x-2 sm:gap-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
           <path fill="none" stroke="gray" strokeDasharray="64" strokeDashoffset="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3c0.5 0 2.5 4.5 2.5 5c0 1 -1.5 2 -2 3c-0.5 1 0.5 2 1.5 3c0.39 0.39 2 2 3 1.5c1 -0.5 2 -2 3 -2c0.5 0 5 2 5 2.5c0 2 -1.5 3.5 -3 4c-1.5 0.5 -2.5 0.5 -4.5 0c-2 -0.5 -3.5 -1 -6 -3.5c-2.5 -2.5 -3 -4 -3.5 -6c-0.5 -2 -0.5 -3 0 -4.5c0.5 -1.5 2 -3 4 -3Z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
              </path>
            </svg>
            <div className="text-left">
              <p className="text-xs sm:text-sm">{order.shippingAddress.phoneNumber}</p>
            </div>
          </div>
        </div>

        <p className="mb-3 sm:mb-4 mt-5 sm:mt-6 font-semibold text-base sm:text-lg md:text-xl">
          Order Price
        </p>
        <div className="border border-gray-200 rounded-sm w-full mb-12 sm:mb-16 md:mb-20">
          <p className="text-left font-semibold text-lg sm:text-xl py-3 sm:py-4 px-4 sm:px-5 border-b border-gray-200">
            ${totalPrice}
          </p>
          <div className="px-4 sm:px-5">
            <div className="flex justify-between py-3 sm:py-4 text-xs sm:text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between text-xs sm:text-sm pb-4 sm:pb-5">
              <p className="text-gray-500">Est. Shipping and Handling</p>
              <p>${shipping}</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 py-3 sm:py-4 text-sm sm:text-base">
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 py-3 sm:py-4 text-xs sm:text-sm">
              <p className="text-gray-500">Payment mode</p>
              <p>{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EachOrder