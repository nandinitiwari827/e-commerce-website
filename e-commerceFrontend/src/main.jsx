import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Layout1 from './Layout1.jsx'
import Home, {homeLoader} from './components/Home.jsx'
import About from './components/About.jsx'
import WhatsNew, {imagesLoader} from './components/WhatsNew.jsx'
import Clothing from './components/Clothing.jsx'
import Photo1 from './components/Clothes/Photo1.jsx'
import Login1 from './components/Login1.jsx'
import Login2 from './components/Login2.jsx'
import UserContextProvider from './contexts/UserContextProvider.jsx'
import { WishlistProvider } from './contexts/WishlistContext.jsx'
import Wishlist from './components/Wishlist.jsx'
import Cart from './components/Cart.jsx'
import { CartlistProvider } from './contexts/CartContext.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Profile from './components/Profile.jsx'
import Login from './components/Login.jsx'
import ChangeDetails from './components/ChangeDetails.jsx'
import ChangePassword from './components/ChangePassword.jsx'
import Orders from './components/Orders.jsx'
import Address from './components/Address.jsx'
import Payment from './components/Payment.jsx'
import OrderPlaced from './components/OrderPlaced.jsx'
import EachOrder from './components/EachOrder.jsx'

let router = createBrowserRouter([
  {
    path: "account",
    element: <Login1 />,
  },
  {
    path: "accountpage",
    element: <Login2 />,
  },
   {
    path: "login",
    element: <Login />,
  },
   {
    path: "changeDetails",
    element: <ChangeDetails />,
  },
   {
    path: "changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "whatsnew",
        element: <WhatsNew />,
        loader: imagesLoader,
      },
       {
        path: "wishlist",
        element: <Wishlist/>,
      },
         {
        path: "/cart",
        element: <Layout1/>,
        children: [
          {
            path: "bag",
            element: <Cart/>
          }, 
            {
            path: "address",
            element: <Address/>
          }, 
          {
            path: "payment",
            element: <Payment/>
          }, 
        ],
      },
      {
        path: "clothing",
        element: <Clothing />,
      },
      {
        path: "clothing/photo1/:id",
        element: <Photo1 />,
      },
      {
        element: <PrivateRoute/>,
        children: [
            {
        path: "profile",
        element: <Profile/>,
      },
       {
        path: "orderPlaced",
        element: <OrderPlaced/>,
      },
       {
        path: "orders",
        element: <Orders/>,
      },
       {
        path: "orders/:id",
        element: <EachOrder/>,
      }, 
        ]
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <WishlistProvider>
        <CartlistProvider>
    <RouterProvider router={router}/>
    </CartlistProvider>
    </WishlistProvider>
    </UserContextProvider>
  </StrictMode>,
)
