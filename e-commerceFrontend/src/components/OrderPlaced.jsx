import React from 'react'
import { useNavigate } from 'react-router-dom'
import stars from "../assets/stars.png"
import { motion } from 'framer-motion'

function OrderPlaced() {
    let navigate=useNavigate()
    let recentOrderId = localStorage.getItem("recentOrderId")
    
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>

        <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex flex-col items-center'>

          <button
          onClick={() => navigate("/")}
          className='absolute cursor-pointer group top-[230px] right-10 sm:top-[200px] sm:right-28 md:top-[170px] md:right-[250px] lg:top-[140px] lg:right-[360px]'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                className='fill-gray-600 group-hover:fill-black duration-200'
                fill="currentColor"
                d="M10.772 2.688a2 2 0 0 1 2.456 0l8.384 6.52c.753.587.337 1.792-.615 1.792H20v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8h-.997c-.953 0-1.367-1.206-.615-1.791zM5.625 9.225c.229.185.375.468.375.785V19h12v-8.99c0-.317.146-.6.375-.785L12 4.267z"
              />
            </g>
          </svg>
        </button>

        <div
          className='flex items-center justify-center w-[320px] sm:w-[370px] h-[220px] sm:h-[250px] mb-4'
          style={{
            background: `url(${stars})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}>
          <div className='w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 rounded-full flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m2.75 8.75l3.5 3.5l7-7.5" /></svg>
          </div>
        </div>

        <p className='text-xl sm:text-2xl font-bold mt-4 text-center'>Thank you for ordering!</p>
        <p className='text-sm text-gray-400 w-[280px] sm:w-[400px] mt-3 text-center'>
          We'll inform you once the shipping status updates and you can contact us for any further queries.
        </p>

        <div className='flex flex-col sm:flex-row gap-y-4 sm:gap-x-6 mt-8'>
          <button
            onClick={() => navigate(`/orders/${recentOrderId}`)}
            className='w-[250px] py-2 border-1 border-gray-400 cursor-pointer hover:bg-gray-200 rounded-sm font-semibold'>
            VIEW ORDER
          </button>

          <button
            onClick={() => navigate("/clothing")}
            className='py-2 cursor-pointer hover:bg-pink-400 rounded-sm w-[250px] font-semibold bg-pink-500 text-white border-1 border-pink-600'>
            CONTINUE SHOPPING
          </button>
        </div>
        </motion.div>
    </div>
  )
}

export default OrderPlaced