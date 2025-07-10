import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function OrderHeader() {
    let location=useLocation()

    let isBag=location.pathname.includes('/cart/bag')
    let isAddress=location.pathname.includes('/cart/address')
    let isPayment=location.pathname.includes('/cart/payment')

    let handlePreventClick = (e) => {
        e.preventDefault();
    }

return (
    <div className='sticky mt-4 bg-white pt-2 flex justify-between px-2 sm:px-4'>
      <div className='flex flex-wrap w-full gap-x-3 gap-y-2 items-center justify-center text-base sm:text-lg'>

        <NavLink
          onClick={handlePreventClick}
          to='/cart/bag'
          className={() => `font-bold cursor-default duration-200 ${(isBag || isAddress || isPayment) ? "text-pink-500" : "text-gray-500"}`}>
          My Bag
        </NavLink>

        <span className={`text-[16px] sm:text-[18px] ${(isAddress || isPayment) ? "text-pink-500" : "text-gray-500"} font-bold duration-200 cursor-default`}>
          --------
        </span>

        <NavLink
          onClick={handlePreventClick}
          to='/cart/address'
          className={() => `font-bold cursor-default duration-200 ${(isAddress || isPayment) ? "text-pink-500" : "text-gray-500"}`}>
          Address
        </NavLink>

        <span className={`text-[16px] sm:text-[18px] ${(isPayment) ? "text-pink-500" : "text-gray-500"} font-bold duration-200 cursor-default`}>
          --------
        </span>

        <NavLink
          onClick={handlePreventClick}
          to='/cart/payment'
          className={() => `font-bold cursor-default duration-200 ${(isPayment) ? "text-pink-500" : "text-gray-500"}`}>
          Payment
        </NavLink>

      </div>
    </div>
  )
}

export default OrderHeader