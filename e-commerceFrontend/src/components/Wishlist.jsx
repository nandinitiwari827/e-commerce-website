import React, {useState, useRef, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../contexts/WishlistContext'
import { useCartlist } from '../contexts/CartContext'
import { getWishlist, removeFromWishlist, addToCart, getCartlist } from '../api.js'

function Wishlist() {

    let {wishlist, setWishlist, removeItemFromWishlist}=useWishlist()

     let {cartlist, addItemToCart, setCartlist}= useCartlist()

    let [moveToBagClicked, setMoveToBagClicked]=useState(false)
    let [sizeClicked, setSizeClicked]=useState(null)
    let [selectedItem, setSelectedItem]=useState(null)
    let [loading, setLoading]=useState(true)
    let [error, setError]=useState(null)

     let modalRef = useRef(null)
    useEffect(() => {
    let handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedItem(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    selectedItem,
  ])
   
    useEffect(()=>{ 
  let fetchWishlist=async()=>{
        try{
          setLoading(true)
         let response=await getWishlist()
         let transformedWishlist=(response.data.products || []).map(product=>
          ({
            id: product._id,
            name: product.name,
            price: product.price,
            img1: product.images[0],
            img2: product.images[1],
            sizes: product.sizes
          }))
          setWishlist(transformedWishlist)
          setLoading(false)
        
        }catch(err){
          console.error('Wishlist fetch error: ', err.response?.data || err.message)
          setError('Failed to fetch wishlist')
          setWishlist([])
          setLoading(false)
        }
      } 

      fetchWishlist()
    }, [setWishlist])

let handleAddToCart = async (e) => {
  e.preventDefault();
  if (!sizeClicked) {
    alert('Please select a size');
    return;
  }

  if (cartlist.some((cartItem) => cartItem.id === selectedItem.id && cartItem.selectedSize === sizeClicked)) {
    alert('Item already in cart');
    setSelectedItem(null);
    setSizeClicked(null);
    return;
  }

  try {
    await addToCart(selectedItem.id, sizeClicked, 1);
    addItemToCart({ ...selectedItem, selectedSize: sizeClicked, selectedQuantity: 1 });

      await removeFromWishlist(selectedItem.id);
      removeItemFromWishlist(selectedItem.id);
    
    try {
      let cartResponse = await getCartlist();
      let transformedCartlist = (cartResponse.data?.items || []).map(item => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        img1: item.product.images[0],
        selectedSize: item.size,
        selectedQuantity: item.quantity,
      }));
      setCartlist(transformedCartlist);
    } catch (cartErr) {
      console.error('Get cartlist error: ', cartErr.response?.data || cartErr.message);
    }
    alert('Item added to cart')
  } catch (err) {
    console.error('Add to cart error: ', err.response?.data || err.message);
    alert('Failed to add item to cart');
  } finally {
    setSelectedItem(null);
    setSizeClicked(null);
  }
};
   
    let handleCross=async(e,id)=>{
        e.preventDefault()
        e.stopPropagation()
        try{
          await removeFromWishlist(id)
         removeItemFromWishlist(id)
  
        }catch(err){
          console.log('Wishlist removal error:', err)
          alert('Failed to remove from wishlist')
        }}

     let handleMoveToBag=(e, item)=>{
        e.preventDefault()
        e.stopPropagation()
        setMoveToBagClicked(true)
        setSelectedItem(item) 
      }
    
let navigate=useNavigate()

 if(loading){
return (
  <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center'>
 <div className="w-14 h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
 </div>
)}

    if(error){
      return <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>{error || "Failed to fetch wishlist"}</div>
    }

  return (
    <>
{wishlist.length===0? (<div className='flex flex-col w-full justify-center items-center mt-12'>
 
  <p className='font-bold text-gray-700 text-5xl'>My Wishlist</p>
  <p className='text-3xl text-pink-600 font-semibold pt-12'>Hey Princess!</p>
  <div><img className='h-70 rounded-xl mt-4'
  src="https://i.pinimg.com/736x/fb/c7/1f/fbc71fade180d3563e9297d5fee7783d.jpg"/>
  </div>
  <button className='cursor-pointer text-2xl hover:bg-pink-500 duration-200 rounded-xl py-4 px-10 mt-5 font-bold text-white bg-pink-600' onClick={()=>navigate("/clothing")}>Let's Shop!</button>
</div>)

:(<div className='max-w-6xl mx-auto px-4 mt-8 mb-20'>

  <p className='font-bold text-gray-700 text-lg flex items-center mb-6 sm:text-xl sm:pl-0 pl-2'>
    My Wishlist <span className='text-gray-600 font-normal ml-2'>{wishlist.length} items</span>
  </p>

  <div className='grid gap-6 grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

    {wishlist.map(item => (
      <Link to={`/clothing/photo1/${item.id}`} key={item.id}
        className='border border-gray-300 bg-white relative flex flex-col items-center text-center p-3 w-[160px] sm:w-[180px] md:w-[200px] mx-auto'>

        <button onClick={(e) => handleCross(e, item.id)} className='absolute top-2 right-2 cursor-pointer z-10'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
            <path fill="#8b8a8a" fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" clipRule="evenodd" />
            <path fill="black" d="M11.854 4.854a.5.5 0 0 0-.707-.707L8 7.293 4.854 4.147a.5.5 0 1 0-.707.707L7.293 8l-3.146 3.146a.5.5 0 0 0 .707.708L8 8.707l3.147 3.147a.5.5 0 0 0 .707-.708L8.708 8z" />
          </svg>
        </button>

        <div className="relative w-full h-[200px]">
          <img className='absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 hover:opacity-0 rounded-sm'
            src={item.img1}/>
          <img className='absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100 rounded-sm'
            src={item.img2}/>
        </div>

        <p className='text-sm font-medium mt-3 truncate w-full'>{item.name}</p>
        <p className='text-base font-bold mt-1'>${item.price}</p>

        <button onClick={(e) => handleMoveToBag(e, item)}
          className='mt-3 w-full py-2 text-sm font-semibold text-blue-600 border-t border-gray-200 hover:bg-gray-50'>
          MOVE TO BAG
        </button>
      </Link>
    ))}
  </div>
</div>
)}

         {selectedItem && (
      <div className='flex justify-center items-center min-h-screen fixed inset-0 z-50 bg-black/30 backdrop-blur-sm'>
      <div  ref={modalRef} className='items-center shadow-3xl px-6 py-5 rounded-sm bg-white'>
        <div className='flex gap-x-5'>
           <img className="h-25 border-1" src={selectedItem.img1}/>
           <div className='flex flex-col text-left mt-2 gap-y-1'>
            <p className='text-gray-600 text-lg'>{selectedItem.name}</p>
             <p className='font-bold'>${selectedItem.price}</p>
           </div>

           <button onClick={()=>setSelectedItem(null)} className='relative z-10 bottom-[50px] left-[10px] cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="gray" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/>
      </svg></button>
        </div>

        <div className='border-t-1 border-gray-200 mt-5 pt-3'>
          <p className='font-bold text-left'>Select Size</p>

        <div className='flex flex-wrap gap-3 pt-3 w-[300px]'>
        {selectedItem.sizes && selectedItem.sizes.map((size, index) => (
          <button key={index}
            onClick={() => setSizeClicked(size)}
            className={`${sizeClicked === size ? "bg-[#07437A] text-white" : ""} w-[50px] h-[50px] rounded-3xl ring-1 ring-gray-500 text-gray-500 cursor-pointer hover:text-white hover:bg-[#0A5CA9] hover:ring-0`}
          >
            {size}
          </button>
        ))}
      </div>
      
        <button onClick={handleAddToCart} className='cursor-pointer bg-blue-600 text-white w-full py-2 rounded-sm mt-7 mb-3'>Done</button>
        </div>
      </div>
      </div>
     )}
    </>
  )
}

export default Wishlist