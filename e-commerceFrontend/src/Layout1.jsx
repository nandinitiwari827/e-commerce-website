import React from 'react'
import OrderHeader from './components/header/OrderHeader'
import { Outlet } from 'react-router-dom'

function Layout1() {
  return (
      <>
    <OrderHeader/>
    <Outlet/>
    </>
  )
}

export default Layout1