import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../contexts/WishlistContext'
import { getAllProducts, addToWishlist, removeFromWishlist, getWishlist } from '../api.js'

function Clothing() {

   let {addItemToWishlist, wishlist, setWishlist, removeItemFromWishlist}=useWishlist()

  let [products, setProducts]=useState([])
  let [wishlistLoading, setWishlistLoading]=useState(false)
  let [loading, setLoading]=useState(true)
  let [error, setError]=useState(null)

  useEffect(()=>{
    let fetchProducts=async()=>{
      try{
        setLoading(true)
        let response=await getAllProducts()
        let transformedProducts=response.data.map(product=>
        ({
          id: product._id,
          name: product.name,
          price: product.price,
          img1: product.images[0],
          img2: product.images[1]
        }))
        setProducts(transformedProducts)
        setLoading(false)
      }catch(err){
        setError('Failed to fetch products.')
        setLoading(false)
      }
    }

    let fetchWishlist=async()=>{
      try{
       let response=await getWishlist()
       let transformedWishlist=response.data.products.map(product=>
        ({
          id: product._id,
          name: product.name,
          price: product.price,
          img1: product.images[0],
          img2: product.images[1],
          sizes: product.sizes
        }))
        setWishlist(transformedWishlist)
      }catch(err){
        console.error('Wishlist fetch error: ', err)
      }
    } 

    fetchProducts()
    fetchWishlist()
  }, [])

   let firstHalf=products.slice(0,20)
   let secondHalf=products.slice(20)

    let handleWishIcon=async(e, product)=>{
        e.preventDefault()
        e.stopPropagation()

        try{
          setWishlistLoading(product.id)
        if(wishlist.some((item)=>item.id===product.id)) {
          await removeFromWishlist(product.id)
          removeItemFromWishlist(product.id)
          } else {
          await addToWishlist(product.id)
          addItemToWishlist(product)
          }}catch(err){
            console.log('Wishlist Error: ', err)
            alert("Failed to add product to wishlist")
          }finally {
          setWishlistLoading(false);  
  }
    }

    if(loading){
       return (
     <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center'>
 <div className="w-14 h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
 </div>
  )
    }

    if(error){
      return <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>{error}</div>
    }
    
  return (
    <div className='min-h-screen bg-[#EEEEEE]'>
        <div>
            <img className='h-full w-full object-cover'
            src="https://cdn-ssl.s7.shopdisney.com/is/image/ShopDisney/mb_franchise-disney_20190701_2x?fit=constrain&cropN=0,0,1,1&fmt=webp&qlt=70&wid=2400"
            />
            
            <h1 className='sm:text-3xl text-lg z-10 absolute sm:top-[190px] top-[90px] sm:left-[100px] left-[20px] font-semibold'>Princess Clothing</h1>
            <p className='text-left z-10 absolute sm:top-[230px] top-[120px] sm:w-[500px] w-[150px] sm:left-[100px] left-[20px] text-[8px] sm:text-lg'>Shop shirts, bottoms, and more featuring memorable characters and moments from 
                beloved Disney stories.</p>
        </div>

        <div className='text-left text-lg sm:text-2xl font-bold sm:mt-20 mt-10 sm:ml-18 ml-5 relative sm:top-10 '>GOOD FOR CUTE LITTLE KIDS</div>

<div className='sm:text-5xl text-2xl text-amber-900 font-extrabold sm:mt-20 mt-10 sm:py-8 py-4 bg-amber-500 mask-t-from-3 sm:mx-18 mx-5'>NEW ARRIVALS</div>

        <div className='flex flex-wrap justify-center sm:gap-6 gap-4 sm:mx-10 mx-0 pt-6'>
       
       {firstHalf.map(product=>(
      <Link to={`/clothing/photo1/${product.id}`} key={product.id} className='bg-orange-500 h-[225px] w-[150px] relative group'>
            <img src={product.img1}
            className='absolute rounded-2xl p-2 inset-0 object-cover transition-opacity duration-300 opacity-100 hover:opacity-0'/>
            <img src={product.img2} 
            className='absolute rounded-2xl p-2 inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100'/>
            
            <div className="absolute bottom-2 w-full">
            <p className='text-yellow-100 text-sm font-semibold'>{product.name}</p>
            <p className='text-yellow-100 text-xl font-bold'>${product.price}</p>
            <p className='text-yellow-100 text-sm font-semibold'>Shop Now</p> 
            </div>

            <button onClick={(e)=>handleWishIcon(e, product)} 
                className={`cursor-pointer absolute left-30 bottom-2 transition-opacity ${wishlist.some((item) => item.id === product.id)? 'opacity-100' : 'sm:opacity-0 sm:group-hover:opacity-100 opacity-100'}`}>

                  {wishlistLoading===product.id? (
                   <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[9999]">
                   <div className="w-12 h-12 border-8 border-dotted border-orange-500 rounded-full animate-spin"></div>
                  </div>
                  ) : (
                      <svg className={`opacity-0 group-hover:opacity-100 transition-color ${wishlist.some((item) => item.id === product.id)? 'fill-yellow-100 opacity-100' : 'fill-orange-500 stroke-yellow-100 opacity-100'}`}
                    xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"/>
                    </svg>
                  )}
              
            </button>
            </Link>
       ))}
      
        </div>

         <div className='text-left text-gray-600 mt-20 sm:ml-18 ml-3 text-sm sm:text-lg'>Disney Store / Franchises / Disney / Clothing</div>

         <div className='flex flex-wrap justify-center sm:gap-x-6 gap-x-4 sm:gap-y-12 gap-y-6 sm:mx-10 mx-2 border-t-1 border-gray-300 mt-6 pt-8 pb-30'>
         
          {secondHalf.map(product=>(
         <Link to={`/clothing/photo1/${product.id}`} key={product.id} className='bg-white relative group sm:w-[270px] sm:h-[410px] w-[150px] h-[270px] rounded-sm'>
           
           <button onClick={(e)=>handleWishIcon(e, product)} 
                className={`cursor-pointer absolute sm:left-57 left-31 sm:top-2 top-1 transition-opacity ${wishlist.some((item) => item.id === product.id)? 'opacity-100' : 'sm:opacity-0 sm:group-hover:opacity-100 opacity-100'}`}>
                  {wishlistLoading===product.id? (
                     <div className="fixed inset-0 bg-black/10 backdrop-blur-sm min-h-screen flex items-center justify-center z-[9999]">
                   <div className="w-12 h-12 border-8 border-dotted border-orange-500 rounded-full animate-spin"></div>
                  </div>
                  ) : (
                  <svg className={`opacity-0 group-hover:opacity-100 transition-color ${wishlist.some((item) => item.id === product.id)? 'fill-red-600 opacity-100' : 'fill-white stroke-blue-500 opacity-100'}`}
                  xmlns="http://www.w3.org/2000/svg" sm:width="34" width="20" sm:height="34" height="20" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"/>
                  </svg>
                  )}
            </button>

         <img className='sm:h-58 h-35 absolute sm:top-13 top-6 sm:pl-4.5 pl-1 inset-0 rounded-sm object-cover transition-opacity duration-300 opacity-100 hover:opacity-0'
         src={product.img1}/>
         
         <img className='sm:h-58 h-35 absolute sm:top-13 top-6 sm:pl-4.5 pl-1 rounded-sm inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100'
         src={product.img2}/>

         <p className='absolute sm:text-lg text-sm sm:pt-3 pt-2 sm:top-73 top-41 w-full justify-center group-hover:text-blue-500'>{product.name}</p>
         <p className='absolute sm:text-xl text-lg sm:pt-2 pt-1 w-full justify-center sm:top-82 top-51 font-bold'>${product.price}</p>
         <p className='absolute w-full justify-center text-blue-600 text-sm font-semibold sm:top-94 top-60' style={{fontFamily: "revert-layer"}}>KIDS</p>
         </Link>
             ))}       
         </div>
        </div>
  )
}

export default Clothing