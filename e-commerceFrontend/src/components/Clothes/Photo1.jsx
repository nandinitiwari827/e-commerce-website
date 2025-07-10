import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCartlist } from '../../contexts/CartContext';
import { getProductById, rateProduct, addToWishlist, removeFromWishlist, getWishlist, addToCart, getCartlist } from '../../api.js';

function Photo1() {
  let { id } = useParams()
  let { cartlist, addItemToCart, setCartlist } = useCartlist()
  let { addItemToWishlist, removeItemFromWishlist, wishlist, setWishlist } = useWishlist()
  let [rating, setRating] = useState(0)
  let [quantity, setQuantity] = useState(1)
  let [liked, setLiked] = useState(false)
  let [sizeClicked, setSizeClicked] = useState(null)
  let [btnClicked, setBtnClicked] = useState(false)
  let [sizeChartClicked, setSizeChartClicked] = useState(false)
  let [imgClicked, setImgClicked] = useState(false)
  let [clickedImg, setClickedImg] = useState(null)
  let [product, setProduct] = useState({})
  let [sizes, setSizes] = useState([])
  let [wishlistLoading, setWishlistLoading] = useState(false)
  let [cartLoading, setCartLoading] = useState(false)
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)
  let [currentImageIndex, setCurrentImageIndex] = useState(0)
  let modalRef = useRef(null)

  let stars = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ];

  let sizeTypes = [
    { id: 1, size: 26, alpha: "XS", chest: 32, waist: 26 },
    { id: 2, size: 28, alpha: "S", chest: 34, waist: 28 },
    { id: 3, size: 30, alpha: "S", chest: 36, waist: 30 },
    { id: 4, size: 32, alpha: "M", chest: 38, waist: 32 },
    { id: 5, size: 34, alpha: "M", chest: 40, waist: 34 },
    { id: 6, size: 36, alpha: "L", chest: 42, waist: 36 },
    { id: 7, size: 38, alpha: "L", chest: 44, waist: 38 },
    { id: 8, size: 40, alpha: "XL", chest: 46, waist: 40 },
    { id: 9, size: 42, alpha: "XL", chest: 48, waist: 42 },
    { id: 10, size: 44, alpha: "XXL", chest: 50, waist: 44 },
    { id: 11, size: 46, alpha: "XXL", chest: 52, waist: 46 },
    { id: 12, size: 48, alpha: "3XL", chest: 54, waist: 48 },
    { id: 13, size: 50, alpha: "3XL", chest: 56, waist: 50 },
    { id: 14, size: 52, alpha: "4XL", chest: 58, waist: 52 },
    { id: 15, size: 54, alpha: "4XL", chest: 60, waist: 54 },
  ];

  let images = [
    product.img1,
    product.img2,
    product.img3,
    product.img4,
    product.img5,
    product.img6
  ].filter(img => img) 

  useEffect(() => {
    let fetchProduct = async () => {
      try {
        setLoading(true)
        let response = await getProductById(id)
        let transformedProduct = {
          id: response.data._id,
          name: response.data.name,
          price: response.data.price,
          img1: response.data.images[0] || '',
          img2: response.data.images[1] || '',
          img3: response.data.images[2] || '',
          img4: response.data.images[3] || '',
          img5: response.data.images[4] || '',
          img6: response.data.images[5] || ''
        }
        let transformedSizes = response.data.sizes.map((size, index) => ({
          id: index + 1,
          name: size
        }))
        setProduct(transformedProduct)
        setSizes(transformedSizes)
        setQuantity(1)

        let userId = JSON.parse(localStorage.getItem("user"))?._id;
        let existingRating = response.data.ratings.find(r => r.user === userId)
        setRating(existingRating ? existingRating.rating : 0)

        let isInWishlist = wishlist.some(item => item.id === response.data._id)
        setLiked(isInWishlist)
        setLoading(false)
      } catch (err) {
        console.log('API Error: ', err)
        setError('Failed to fetch product.')
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, wishlist, setWishlist])

  useEffect(() => {
    let handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSizeChartClicked(false)
        setImgClicked(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sizeChartClicked, imgClicked])

  useEffect(() => {
    let fetchCartlist = async () => {
      try {
        let response = await getCartlist()
        setCartlist(response.data.items || [])
        setLoading(false)
      } catch (err) {
        console.log("Error fetching cartlist: ", err.response?.data || err.message)
        setError("Failed to fetch cart")
        setCartlist([])
        setLoading(false)
      }
    }
    fetchCartlist()
  }, [setCartlist])

  let starRating = async (e, value) => {
    e.preventDefault()
    try {
      await rateProduct(id, value)
      setRating(value)
    } catch (error) {
      console.error("Error rating product:", error)
      alert("Error rating product")
    }
  }

  let increaseQuantity = () => {
    if (quantity < 6) setQuantity(quantity + 1)
  }

  let decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  let handleSizeChart = (e) => {
    e.preventDefault()
    setSizeChartClicked(!sizeChartClicked)
  }

  let heartLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      setWishlistLoading(true)
      if (liked) {
        await removeFromWishlist(product.id)
        removeItemFromWishlist(product.id)
      } else {
        await addToWishlist(product.id)
        addItemToWishlist(product)
      }
      let response = await getWishlist()
      let transformedWishlist = response.data.products.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        img1: product.images[0],
        img2: product.images[1],
        sizes: product.sizes
      }))
      setWishlist(transformedWishlist)
      setLiked(!liked)
    } catch (err) {
      console.log('Wishlist Error: ', err)
      alert(err.response?.data.message || "Failed to update wishlist")
    } finally {
      setWishlistLoading(false)
    }
  }

  let btnClicking = async (e) => {
    e.preventDefault()
    if (sizeClicked === null) {
      setBtnClicked(true)
      return;
    }
    if (!localStorage.getItem("accessToken")) {
      alert("Please log in to add items to cart")
      return;
    }
    try {
      setCartLoading(true)
      let cartItem = {
        ...product,
        selectedSize: sizeClicked,
        selectedQuantity: quantity,
      }
      await addToCart(product.id, sizeClicked, quantity)
      addItemToCart(cartItem)
      let response = await getCartlist()
      if (!response.data || !response.data.items) {
        throw new Error("Invalid cartlist response from server")
      }
      let transformedCartlist = response.data.items.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        img1: item.product.images[0],
        selectedSize: item.size,
        selectedQuantity: item.quantity,
      }))
      setCartlist(transformedCartlist)
      alert("Item added to cart")
    } catch (err) {
      console.error("Cart Error: ", err.response?.data || err.message)
      alert(err.response?.data.message || "Failed to add product to cart")
    } finally {
      setCartLoading(false)
    }
  }

  let nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  let prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex justify-center items-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600 text-sm sm:text-base md:text-lg">
        {error || "Product not found"}
      </div>
    )
  }

  return (
    <>
     <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:pr-0 lg:pr-0">
        <div className="w-full max-w-[900px] pt-6 sm:pt-8">
          {/* Carousel for xs and sm screens */}
          <div className="lg:hidden relative w-full h-[200px] sm:h-[300px] md:h-[380px] overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                img && (
                  <div key={index} className="min-w-full h-full flex items-center justify-center">
                    <Link
                      onClick={() => {
                        setImgClicked(true)
                        setClickedImg(img)
                      }}
                      className="cursor-zoom-in block"
                    >
                      <img
                        src={img}
                        alt={`Product image ${index + 1}`}
                        className="w-55 object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                )
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Grid for lg screens */}
          <div className="hidden lg:flex flex-wrap gap-3 sm:gap-4">
            {images.map((img, index) => (
              img && (
                <div
                  key={index}
                  className="w-[calc(50%-0.5rem)] h-[380px] overflow-hidden"
                >
                  <Link
                    onClick={() => {
                      setImgClicked(true)
                      setClickedImg(img)
                    }}
                    className="cursor-zoom-in block"
                  >
                    <img
                      src={img}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      loading="lazy"
                    />
                  </Link>
                </div>
              )
            ))}
          </div>
        </div>

        {imgClicked && (
          <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6">
            <button
              onClick={() => setImgClicked(false)}
              className="absolute top-3 sm:top-4 right-4 sm:right-6 text-black z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 16 16"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                />
              </svg>
            </button>
            <img
              ref={modalRef}
              src={clickedImg}
              alt="Enlarged product image"
              className="object-contain max-h-[90vh] max-w-[90vw] p-2 sm:p-4"
            />
          </div>
        )}

        <div className="sticky top-4 sm:top-16 right-0 w-full lg:w-[650px] h-[725px] max-w-[400px] bg-[#F8F8F8] px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col items-start overflow-auto scrollbar-hidden">
          <p className="text-xs sm:text-sm pt-4 sm:pt-6 pb-4 text-gray-600">
            Disney Store / Clothing / Women / Dresses & Skirts
          </p>
          <p className="text-green-800 font-semibold text-sm sm:text-base" style={{ fontFamily: "revert-layer" }}>
            NEW
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold w-full text-left mt-2">
            {product.name}
          </p>
          <p className="py-3 sm:py-4 text-lg sm:text-xl">${product.price}</p>

          <div className="flex items-center">
            {stars.map((star) => (
              <button
                key={star.id}
                onClick={(e) => starRating(e, star.id)}
                className="cursor-pointer"
              >
                <svg
                  className={`transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${star.id <= rating ? "fill-yellow-500" : "fill-[#C2C6CB]"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            ))}
            <p className="text-blue-500 text-base sm:text-lg md:text-xl ml-3 sm:ml-4">({rating}.0)</p>
          </div>

          <div className="flex justify-between w-full pt-6 sm:pt-8">
            {btnClicked && sizeClicked === null ? (
              <p className="font-semibold text-red-600 text-xs sm:text-sm">Size: Select a Size</p>
            ) : (
              <p className="font-semibold text-xs sm:text-sm">Size: {sizeClicked}</p>
            )}
            <button
              onClick={handleSizeChart}
              className="cursor-pointer underline text-xs sm:text-sm"
            >
              Size Chart
            </button>
          </div>

          {sizeChartClicked && (
            <div className="fixed inset-0 z-[999] bg-white/30 backdrop-blur-sm flex justify-center items-center">
              <div ref={modalRef} className="bg-white overflow-y-auto px-4 sm:px-6 md:px-8 h-[80vh] top-7 lg:top-13 relative sm:h-full max-w-[90vw] sm:max-w-[600px]">
                <button
                  onClick={handleSizeChart}
                  className="cursor-pointer absolute top-4 right-4 sm:top-6 sm:right-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path
                      fill="none"
                      stroke="gray"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                    />
                  </svg>
                </button>
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10">Size Chart</p>
                <div className="flex flex-col border-t border-gray-300 mt-5 sm:mt-7 pt-6 sm:pt-8 pb-8 sm:pb-10">
                  <div className="flex text-xs sm:text-sm">
                    <p className="border border-gray-500 font-bold h-8 sm:h-9 w-16 sm:w-20 text-left pl-1">Size</p>
                    <p className="border border-gray-500 font-bold h-8 sm:h-9 w-20 sm:w-24 text-left pl-1">Alpha</p>
                    <p className="border border-gray-500 font-bold h-8 sm:h-9 w-32 sm:w-40 text-left pl-1">Chest in Inches</p>
                    <p className="border border-gray-500 font-bold h-8 sm:h-9 w-32 sm:w-40 text-left pl-1">Waist in Inches</p>
                  </div>
                  {sizeTypes.map((sizetype) => (
                    <div key={sizetype.id} className="flex text-xs sm:text-sm">
                      <p className="border-b border-l border-r border-gray-500 h-8 sm:h-9 w-16 sm:w-20 text-left pl-1">{sizetype.size}</p>
                      <p className="border-b border-l border-r border-gray-500 h-8 sm:h-9 w-20 sm:w-24 text-left pl-1">{sizetype.alpha}</p>
                      <p className="border-b border-l border-r border-gray-500 h-8 sm:h-9 w-32 sm:w-40 text-left pl-1">{sizetype.chest}</p>
                      <p className="border-b border-l border-r border-gray-500 h-8 sm:h-9 w-32 sm:w-40 text-left pl-1">{sizetype.waist}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 sm:gap-3 w-full pt-4 sm:pt-5">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => {
                  setSizeClicked(size.name)
                  setBtnClicked(false)
                }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-1 ring-gray-500 text-gray-500 text-xs sm:text-sm cursor-pointer hover:text-white hover:bg-[#0A5CA9] hover:ring-0 ${sizeClicked === size.name ? "bg-[#07437A] text-white" : ""}`}
              >
                {size.name}
              </button>
            ))}
          </div>

          <p className="font-bold pt-6 sm:pt-8 text-sm sm:text-base">Quantity</p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <button
              onClick={() => {
                decreaseQuantity()
                setBtnClicked(false)
              }}
              disabled={quantity === 1}
              className={`cursor-pointer ${quantity === 1 ? "stroke-gray-300" : "stroke-black"} w-6 h-6 sm:w-7 sm:h-7`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  strokeWidth="1"
                  d="M4 8h8m2.5 0a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
            </button>
            <p className="px-4 sm:px-6 text-lg sm:text-xl">{quantity}</p>
            <button
              onClick={() => {
                increaseQuantity()
                setBtnClicked(false)
              }}
              disabled={quantity === 6}
              className={`cursor-pointer ${quantity === 6 ? "fill-gray-300" : "fill-black"} w-6 h-6 sm:w-7 sm:h-7`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path
                  d="M960 0q133 0 255 34t230 96t194 150t150 195t97 229t34 256q0 133-34 255t-96 230t-150 194t-195 150t-229 97t-256 34q-133 0-255-34t-230-96t-194-150t-150-195t-97-229T0 960q0-133 34-255t96-230t150-194t195-150t229-97T960 0m0 1792q115 0 221-30t198-84t169-130t130-168t84-199t30-221q0-115-30-221t-84-198t-130-169t-168-130t-199-84t-221-30q-115 0-221 30t-198 84t-169 130t-130 168t-84 199t-30 221q0 115 30 221t84 198t130 169t168 130t199 84t221 30m64-896h512v128h-512v512H896v-512H384V896h512V384h128z"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-between w-full pt-8 sm:pt-12">
            <button
              onClick={btnClicking}
              className={`cursor-pointer text-white py-2.5 sm:py-3.5 px-8 sm:px-12 md:px-16 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-600 text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-blue-800 ${btnClicked ? "bg-[#0E2E94] bg-none" : ""}`}
              style={{ fontFamily: "revert-layer" }}
            >
              ADD TO BAG - ${product.price}
            </button>
            <button
              onClick={heartLike}
              className="cursor-pointer"
            >
              {wishlistLoading || cartLoading ? (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[9999]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-8 border-dotted border-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <svg
                  className={`transition-colors w-8 h-8 sm:w-10 sm:h-10 ${liked ? "fill-blue-500" : "stroke-blue-500 fill-[#F8F8F8]"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Photo1