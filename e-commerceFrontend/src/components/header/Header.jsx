import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartlist } from '../../contexts/CartContext';
import { logoutUser, deleteAccount } from '../../api.js';

function Header() {
  let { cartlist } = useCartlist()
  let navigate = useNavigate()
  let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  let [showDropDown, setShowDropDown] = useState(false)
  let [showMobileMenu, setShowMobileMenu] = useState(false)
  let [deleteAccountClicked, setDeleteAccountClicked] = useState(false)
  let [cartItemCount, setCartItemCount] = useState(0)
  let modalRef = useRef(null)

  useEffect(() => {
    let totalItems = cartlist.reduce((acc, item) => acc + (item.selectedQuantity || 1), 0)
    setCartItemCount(totalItems)
  }, [cartlist])

  useEffect(() => {
    let handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDropDown(false)
        setDeleteAccountClicked(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  let handleSignUp = () => {
    navigate('/account')
    setShowMobileMenu(false)
  }

  let handleLogout = async () => {
    try {
      await logoutUser()
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
      alert('User logged out successfully !!!')
      navigate('/login')
      setShowMobileMenu(false)
    } catch (error) {
      console.error('Logout failed: ', error.message)
      alert('Failed to logout')
    }
  }

  let handleDeleteAccount = async () => {
    try {
      await deleteAccount(user._id)
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.clear()
      alert('Account deleted successfully !!!')
      setUser(null)
      setDeleteAccountClicked(false)
      navigate('/')
    } catch (error) {
      console.error('Account deletion failed: ', error.message)
      alert('Failed to delete account !')
      setDeleteAccountClicked(false)
    }
  }

  let toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <div className='shadow-md sticky top-0 z-50 bg-white py-2 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4'>
        <div className='flex items-center gap-x-6 md:gap-x-10'>
          <Link to='/'>
            <img
              src='https://i.pinimg.com/736x/2d/a2/39/2da239435be10f700af7401b21d4eea3.jpg'
              className='h-10 md:h-12 object-contain rounded-xl'
            />
          </Link>
          <nav className='hidden md:flex items-center gap-x-10'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `hover:text-pink-600 font-bold duration-200 text-sm ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `hover:text-pink-600 duration-200 font-bold text-sm ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              to='/whatsnew'
              className={({ isActive }) =>
                `hover:text-pink-600 duration-200 font-bold text-sm ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`
              }
            >
              WHAT'S NEW
            </NavLink>
            <NavLink
              to='/clothing'
              className={({ isActive }) =>
                `hover:text-pink-600 duration-200 font-bold text-sm ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`
              }
            >
              CLOTHING
            </NavLink>
          </nav>
        </div>

        <div className='flex items-center gap-x-4 sm:gap-x-6'>
          <div className='hidden md:block' ref={modalRef}>
            {user ? (
              <div className='relative group'>
                <div className='cursor-pointer gap-x-1 rounded-lg flex text-gray-500 font-bold text-sm duration-200 hover:text-white hover:bg-pink-600 items-center px-2 h-[40px] mt-1'>
                  {user.avatar ? (
                    <div className='h-[25px] w-[25px] rounded-full bg-amber-500 overflow-hidden'>
                      <img src={user.avatar} className='h-full w-full object-cover' alt='User avatar' />
                    </div>
                  ) : (
                    <Link className='fill-[#6969
69] hover:fill-white'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none">
                          <path stroke="currentColor" strokeWidth="1.5" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/>
                          <path fill="currentColor" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2..75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.310l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.75 4.75 0 0 0-4.553 3.392l1.438.428A3.25 3.25 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.75 4.75 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"/>
                        </g>
                      </svg>
                    </Link>
                  )}
                  Hi, {user.firstName}
                  <Link className='fill-[#696969] hover:fill-white relative'>
                    <svg
                      className='transition-transform duration-300 group-hover:rotate-[180deg]'
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path fill="currentColor" d="m12 10.828l-4.95 4.95l-1.414-1.414L12 8l6.364 6.364l-1.414 1.414z"/>
                    </svg>
                  </Link>
                </div>
                <div className='absolute z-50 hidden group-hover:block transition-all w-[230px]'>
                  <svg
                    className="fill-pink-600 relative left-17 z-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"/>
                  </svg>
                  <div className='z-50 bg-white border border-gray-500 flex flex-col rounded-xl p-1.5 relative right-4'>
                    <Link
                      to="/profile"
                      className='text-sm w-full text-left p-3 text-gray-500 hover:text-pink-600 flex gap-x-1.5'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" className='transition duration-300' stroke="currentColor" stroke-width="1.5">
                          <path className='transition duration-300' stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
                          <circle cx="12" cy="7" r="3"/>
                        </g>
                      </svg>
                      My profile
                    </Link>
                    <Link
                      to="/orders"
                      className='text-sm w-full text-left p-3 border-t border-gray-500 text-gray-500 hover:text-pink-600 flex gap-x-1.5'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className='transition duration-300'
                          fill="currentColor"
                          d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m-4-4v-3.075l6.575-6.55l3.075 3.05L11.075 16zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45L9.5 13.55zm3.525-3.525l-.475-.45l.925.925z"
                        />
                      </svg>
                      My orders
                    </Link>
                    <Link
                      to="/changeDetails"
                      className='text-sm w-full text-left p-3 border-t flex gap-x-1.5 border-gray-500 text-gray-500 hover:text-pink-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className='transition duration-300'
                          fill="currentColor"
                          d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20zm-8-2v-1.25c0-1.66-3.34-2.5-5-2.5s-5 .84-5 2.5V17zM9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7zm0 2v1h6V9zm0 2v1h4v-1z"
                        />
                      </svg>
                      Change Account Details
                    </Link>
                    <Link
                      to="/changePassword"
                      className='border-t border-gray-500 flex gap-x-1.5 text-sm w-full text-left p-3 text-gray-500 hover:text-pink-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className='transition duration-300'
                          fill="currentColor"
                          d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                        />
                      </svg>
                      Change Password
                    </Link>
                    <Link
                      to="/account"
                      className='border-t border-gray-500 text-sm w-full flex gap-x-1.5 text-left p-3 text-gray-500 hover:text-pink-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className='transition duration-300'
                          fill="currentColor"
                          d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"
                        />
                      </svg>
                      Register
                    </Link>
                    <Link
                      onClick={() => setDeleteAccountClicked(true)}
                      className='border-t flex gap-x-1.5 border-gray-500 text-sm w-full text-left p-3 text-gray-500 hover:text-pink-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                      >
                        <path
                          className='transition duration-300'
                          fill="currentColor"
                          d="M5 6a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6M2 13c0-1.113.903-2 2.009-2h6.248a5.5 5.5 0 0 0-.657 1H4.009C3.448 12 3 12.447 3 13c0 1.309.622 2.284 1.673 2.953C5.743 16.636 7.265 17 9 17q.3 0 .592-.015q.261.513.618.958Q9.617 18 9 18c-1.855 0-3.583-.386-4.865-1.203C2.833 15.967 2 14.69 2 13m17 1.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.646-1.146a.5.5 0 0 0-.708-.708L14.5 13.793l-1.146-1.147a.5.5 0 0 0-.708.708l1.147 1.146l-1.147 1.146a.5.5 0 0 0 .708.708l1.146-1.147l1.146 1.147a.5.5 0 0 0 .708-.708L15.207 14.5z"
                        />
                      </svg>
                      Delete Account
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className='border-t border-gray-500 flex gap-x-1.5 text-sm w-full text-left p-3 text-gray-500 hover:text-pink-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          className='transition duration-300'
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M7.023 5.5a9 9 0 1 0 9.953 0M12 2v8"
                          color="currentColor"
                        />
                      </svg>
                      Logout
                    </Link>
                  </div>
                </div>

                {deleteAccountClicked && (
                  <div className='w-full h-full py-2 sm:py-4 md:py-6 lg:py-8 bg-black/60 backdrop-blur-sm fixed left-0 top-0 flex justify-center items-center z-50'>
                    <div ref={modalRef} className='bg-white rounded-lg flex flex-col p-4'>
                      <p className='text-lg w-[280px]'>Are you sure you want to delete your account?</p>
                      <div className='flex w-full justify-evenly mt-6 font-semibold'>
                        <button
                          onClick={handleDeleteAccount}
                          className='bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-md cursor-pointer'
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteAccountClicked(false)}
                          className='bg-green-500 hover:bg-green-400 text-white px-5 py-2 rounded-md cursor-pointer'
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='relative group'>
                <button
                  onClick={handleSignUp}
                  className='cursor-pointer gap-x-1 rounded-lg flex text-gray-500 font-bold text-sm duration-200 hover:text-white hover:bg-pink-600 items-center px-2 h-[40px] mt-1'
                >
                  <Link className='fill-[#696969] hover:fill-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                      <g fill="none">
                        <path stroke="currentColor" strokeWidth="1.5" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/>
                        <path fill="currentColor" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.310l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.75 4.75 0 0 0-4.553 3.392l1.438.428A3.25 3.25 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.75 4.75 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"/>
                      </g>
                    </svg>
                  </Link>
                  SIGN UP
                  <Link className='fill-[#696969] hover:fill-white relative'>
                    <svg
                      className='transition-transform duration-300 group-hover:rotate-[180deg]'
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path fill="currentColor" d="m12 10.828l-4.95 4.95l-1.414-1.414L12 8l6.364 6.364l-1.414 1.414z"/>
                    </svg>
                  </Link>
                </button>
                <div className='absolute mt-0.5 z-50 hidden group-hover:block transition-all duration-300'>
                  <svg
                    className="fill-pink-600 relative left-17 z-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"/>
                  </svg>
                  <div className="absolute mt-2 w-[140px] flex-col justify-center items-center rounded-md bg-white border border-gray-500 hidden group-hover:block transition-all duration-300 z-50 p-3">
                    Wanna sign up?
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `font-bold text-sm hover:text-pink-600 duration-200 ${isActive ? 'text-pink-600' : 'text-gray-500'}`
            }
          >
            <button className="flex gap-x-2 cursor-pointer group">
              <svg
                className='group-hover:scale-110 fill-[#8b8b8b] hover:fill-pink-600'
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                />
              </svg>
              WISHLIST
            </button>
          </NavLink>

          <NavLink
            to="/cart/bag"
            className={({ isActive }) =>
              `font-bold text-sm hover:text-pink-600 duration-200 ${isActive ? 'text-pink-600' : 'text-gray-500'}`
            }
          >
            {({ isActive }) => (
              <button className="flex gap-x-2 cursor-pointer group">
                <p className='absolute text-pink-600 top-[0px] right-[100px] lg:top-[0px] lg:right-[68px] font-semibold'>({cartItemCount})</p>
                <Link to="/cart/bag">
                  <svg
                    className={`${
                      isActive ? 'stroke-pink-600' : ''
                    } transition-transform duration-800 group-hover:rotate-[360deg] stroke-[#8b8b8b] group-hover:stroke-pink-600`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 32 32"
                  >
                    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path d="M6 6h24l-3 13H9m18 4H10L5 2H2"/>
                      <circle cx="25" cy="27" r="2"/>
                      <circle cx="12" cy="27" r="2"/>
                    </g>
                  </svg>
                </Link>
                CART
              </button>
            )}
          </NavLink>

          <button className='md:hidden' onClick={toggleMobileMenu}>
            <svg
              className='w-6 h-6 fill-gray-600'
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>
            </svg>
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className='md:hidden bg-white border-t border-gray-200 py-4 px-4'>
          <nav className='flex flex-col gap-4'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `text-sm font-bold ${isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `text-sm font-bold ${isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              ABOUT
            </NavLink>
            <NavLink
              to='/whatsnew'
              className={({ isActive }) =>
                `text-sm font-bold ${isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              WHAT'S NEW
            </NavLink>
            <NavLink
              to='/clothing'
              className={({ isActive }) =>
                `text-sm font-bold ${isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              CLOTHING
            </NavLink>

            {user ? (
              <>
                <div className='flex items-center justify-center gap-x-2 text-sm font-bold text-gray-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none">
                      <path stroke="currentColor" strokeWidth="1.5" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/>
                      <path fill="currentColor" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.310l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.75 4.75 0 0 0-4.553 3.392l1.438.428A3.25 3.25 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.75 4.75 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"/>
                    </g>
                  </svg>
                  Hi, {user.firstName}
                </div>
                <div className='pl-6 flex flex-col gap-2'>
                  <Link
                    to="/profile"
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My profile
                  </Link>
                  <Link
                    to="/orders"
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My orders
                  </Link>
                  <Link
                    to="/changeDetails"
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Change Account Details
                  </Link>
                  <Link
                    to="/changePassword"
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Change Password
                  </Link>
                  <Link
                    to="/account"
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Register
                  </Link>
                  <Link
                    onClick={() => setDeleteAccountClicked(true)}
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                  >
                    Delete Account
                  </Link>
                  <Link
                    onClick={() => {
                      handleLogout()
                      setShowMobileMenu(false)
                    }}
                    className='text-sm text-gray-500 hover:text-pink-600 border-t-1 border-gray-300'
                  >
                    Logout
                  </Link>
                </div>

                {deleteAccountClicked && (
                  <div className='min-h-screen min-w-screen py-2 sm:py-4 md:py-6 lg:py-8 bg-black/60 backdrop-blur-sm fixed left-0 top-0 flex justify-center items-center z-50'>
                    <div className='bg-white rounded-lg flex flex-col p-4'>
                      <p className='text-lg w-[280px]'>Are you sure you want to delete your account?</p>
                      <div className='flex w-full justify-evenly mt-6 font-semibold'>
                        <button onClick={handleDeleteAccount} className='bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-md cursor-pointer'
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteAccountClicked(false)}
                          className='bg-green-500 hover:bg-green-400 text-white px-5 py-2 rounded-md cursor-pointer'
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  handleSignUp()
                  setShowMobileMenu(false)
                }}
                className='text-sm font-bold text-gray-500 hover:text-pink-600 flex items-center gap-x-2'
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <g fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/>
                    <path fill="currentColor" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.310l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.75 4.75 0 0 0-4.553 3.392l1.438.428A3.25 3.25 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.75 4.75 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"/>
                  </g>
                </svg>
                SIGN UP
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

export default Header