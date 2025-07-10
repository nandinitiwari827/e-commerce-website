import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllOrders } from '../api.js'

function Orders() {
    let navigate=useNavigate()

     let [loading, setLoading]=useState(false)
     let [error, setError] = useState("")
     let [orders, setOrders]=useState([])

     useEffect(()=>{
     let fetchOrders=async()=>{
        try{
          setLoading(true)
          let response=await getAllOrders()
          let transformedOrders=(response.data || []).map(order=>
          ({
            orderId: order._id,
            createdAt: new Date(order.createdAt).toLocaleDateString
            ('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            }),
            status: order.status || 'Delivered',
            deliveredAt: new Date().toLocaleDateString
            ('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            }),
            items: (order.items || []).map(item=>({
              id: item.product._id,
              name: item.product.name,
              price: item.product.price,
              img1: item.product.images[0],
              quantity: item.quantity,
              size: item.size,
            })),
          }))
          setOrders(transformedOrders)
          setLoading(false)
        }catch(err){
          console.error('Error fetching orders: ', err.response?.data)
          setError('Failed to fetch orders')
          setLoading(false)
        }
      }
      fetchOrders()
     }, [])

  if(loading){
     return (
      <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center'>
        <div className="w-14 h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
      </div>
    )
    }

    if(error) {
    return <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>{error}</div>
  }

return (
    <div>
      <div className='flex gap-x-3 items-center border-b-1 border-gray-300 mb-4 py-3 px-3'>
        <button onClick={() => navigate("/clothing")} className='cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
            <path fill="black" fillRule="evenodd"
              d="M14.75 8a.75.75 0 0 1-.75.75H3.81l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 1.06L3.81 7.25H14a.75.75 0 0 1 .75.75"
              clipRule="evenodd" />
          </svg>
        </button>
        <p className='font-bold text-2xl'>Orders</p>
        <p className='text-gray-400 text-2xl'>{orders.length}</p>
      </div>

      <div className='flex flex-col gap-y-7 mb-12 items-center'>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-5 px-3 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 14 14">
              <g fill="none">
                <path fill="#ffd7fb" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" />
                <path stroke="#f83fd5" strokeLinecap="round" strokeLinejoin="round" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" strokeWidth="1" />
                <path stroke="#f83fd5" strokeLinecap="round" strokeLinejoin="round" d="M4.75 5.5a.25.25 0 0 1 0-.5m0 .5a.25.25 0 0 0 0-.5m4.5.5a.25.25 0 0 1 0-.5m0 .5a.25.25 0 0 0 0-.5M4 10c.448-1.428 2.15-2.3 3.85-1.904A3.07 3.07 0 0 1 10 10" strokeWidth="1" />
              </g>
            </svg>
            <p className="font-bold text-2xl mt-4">No Orders Found</p>
            <p className="text-gray-500">Explore more options.</p>
            <button
              onClick={() => navigate('/clothing')}
              className="cursor-pointer font-bold text-sm py-3 px-6 mt-6 border-1 border-pink-500 text-pink-500">
              SHOP NOW
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.orderId} className='text-left border-t-2 border-dotted border-gray-300 w-full max-w-[700px] shadow-md pt-5'>

              <p className='text-sm flex gap-x-1.5 px-3'>Order ID: <span className='font-bold text-gray-500'>{order.orderId}</span></p>
              <p className='text-sm text-gray-500 px-3'>{order.createdAt}</p>

              <div className='text-left border-1 border-gray-300 bg-gray-100 rounded-sm pt-3 mt-3'>
                <p className='font-semibold text-lg pl-4'>{order.status}</p>
                <p className='pl-4 text-sm'>{order.deliveredAt}</p>

       {order.items.map((item) => (
 <div key={`${item.id}-${item.size}`} className='flex items-center justify-between border-1 rounded-sm border-gray-200 bg-white mt-4 py-5 px-4'>

  <div className='flex gap-x-4'>

    <Link to={`/clothing/photo1/${item.id}`} className='rounded-sm'>
      <img className="h-20 w-20 rounded-sm object-cover" src={item.img1} />
    </Link>

    <div className='flex flex-col justify-center'>
      <Link to={`/clothing/photo1/${item.id}`} className='hover:underline text-[16px] font-semibold'>
        {item.name}
      </Link>
      <p className='text-[13px] text-gray-500'>Quantity: {item.quantity}</p>
      <p className='text-[13px] text-gray-500'>Size: {item.size}</p>

      <div className='flex text-sm text-gray-600 gap-x-1 mt-1'>
        <svg className="relative top-[3px]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
          <g fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
            <path d="M.5 9.5h9a4 4 0 1 0 0-8h-3" />
            <path d="m3.5 6.5l-3 3l3 3" />
          </g>
        </svg>
        <p className='font-bold text-black'>7 days</p> return available
      </div>
    </div>

  </div>

  <button onClick={() => navigate(`/orders/${order.orderId}`)} className='ml-auto cursor-pointer flex-shrink-0 hover:bg-gray-100 rounded-lg duration-200'>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
      <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m10 17l5-5l-5-5" />
    </svg>
  </button>
</div>
))}
   </div>
 </div>
       ))
        )}
      </div>
    </div>
  )
}

export default Orders