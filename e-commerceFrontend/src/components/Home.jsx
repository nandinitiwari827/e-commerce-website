import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

function Home() {

  let images=useLoaderData()

  let [clicked, setClicked]=useState()
  
  return (
    <div className='min-h-screen bg-[#EEEEEE]'>

      <button onClick={()=>setClicked(!clicked)} className={`absolute top-[85px] cursor-pointer left-[25px] ${clicked? "z-30":"z-10"}`}>
     <svg className='hover:scale-110 duration-200'
     xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M18.5 4a1.5 1.5 0 0 0-3 0v.5H4a1.5 1.5 0 1 0 0 3h11.5V8a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3h-1.5zM4 10.5a1.5 1.5 0 0 0 0 3h1.5v.5a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3H8.5V10a1.5 1.5 0 1 0-3 0v.5zM2.5 18A1.5 1.5 0 0 1 4 16.5h11.5V16a1.5 1.5 0 0 1 3 0v.5H20a1.5 1.5 0 0 1 0 3h-1.5v.5a1.5 1.5 0 0 1-3 0v-.5H4A1.5 1.5 0 0 1 2.5 18"/></g></svg>
      </button>

      {clicked && (<div className="absolute sm:h-[720px] h-full sm:w-[300px] w-[180px] bg-white/15 z-20 flex flex-col sm:px-3 px-1">
        <Link to="#" className='hover:text-blue-700  font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Franchise</Link>
         <Link to="#" className='hover:text-blue-700 font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Movie/Show</Link>
          <Link to="#" className='hover:text-blue-700 font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Character</Link>
           <Link to="#" className='hover:text-blue-700 font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Department</Link>
            <Link to="#" className='hover:text-blue-700 font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Product type</Link>
             <Link to="#" className='hover:text-blue-700 font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Prices</Link>
              <Link to="#" className='hover:text-blue-700 font-semibold text-sm py-4 border-b-1 text-white border-gray-300'>Collaborations</Link>

              <Link to="account" className='flex gap-x-1 text-white justify-center hover:text-blue-700 font-semibold relative top-[300px]'>
    
                 <svg className='relative top-[1px]'
         xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-width="1.5" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/><path fill="currentColor" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.31l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.75 4.75 0 0 0-4.553 3.392l1.438.428A3.25 3.25 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.75 4.75 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"/>
         </g></svg>
              User</Link>
      </div>)}
    
      <div className="relative sm:w-[1263px] w-[400px] sm:h-[720px] h-[220px] overflow-hidden">
  <div className="flex sm:w-[1263px] w-[400px] h-full animate-[slideBanner_30s_infinite_ease-in-out]">

    <img 
      src="https://wallpapers.com/images/hd/disney-4k-gkwca18qluofxgum.jpg"
      className="sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer bg-no-repeat"
    />
   
    <img 
      src="https://4kwallpapers.com/images/walls/thumbs_3t/17907.jpeg"
      className="bg-no-repeat sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer"
    />

    <img 
      src="https://4kwallpapers.com/images/walls/thumbs_3t/11083.jpg"
      className="bg-no-repeat sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer"
    />

    <img 
      src="https://4kwallpapers.com/images/walls/thumbs_3t/17499.jpg"
      className="bg-no-repeat sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer"
    />
 
    <img 
      src="https://4kwallpapers.com/images/walls/thumbs_3t/20163.jpg"
      className="bg-no-repeat sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer"
    />

     <img 
      src="https://wallpapers.com/images/hd/disney-4k-gkwca18qluofxgum.jpg"
      className="sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer bg-no-repeat"
    />

     <img 
      src="https://wallpapers.com/images/hd/disney-4k-gkwca18qluofxgum.jpg"
      className="sm:w-[1263px] w-[400px] h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer bg-no-repeat"
    />
  </div>
  
      <Link className='z-10 absolute text-white text-right sm:left-[810px] left-[210px] sm:top-[500px] top-[110px]' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        <p className='sm:text-6xl text-2xl' style={{ fontFamily:'Times New Roman'}}>Princess World</p>
        <p style={{ fontFamily:'monospace'}} className='sm:text-[17px] text-[13px]'>RESORT</p>
        <p style={{ fontFamily:'sans-serif'}} className='font-semibold sm:text-3xl text-sm relative sm:top-2 top-0'>FLORIDA</p>
        <p className='font-bold text-white/90 relative sm:top-6 top-1'>BOOK NOW</p>
      </Link>
    </div>

<div className='flex overflow-hidden'>

  <div className="sm:w-[650px] w-[300px] sm:h-[670px] h-[210px] overflow-hidden">
    <img 
      src="https://i.pinimg.com/736x/a1/0a/32/a10a3218e0e6193fb34902259a8b8a73.jpg"
      className='transition-transform hover:scale-104 duration-300 w-full h-full object-cover cursor-pointer'
    />
     <Link className='z-10 sm:top-[1240px] top-[390px] absolute text-white sm:left-[250px] left-[50px]' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        <p className='sm:text-5xl text-lg' style={{ fontFamily:'Times New Roman'}}>Disneyland</p>
        <p style={{ fontFamily:'monospace'}} className='sm:text-[15px] text-[7px]'>RESORT</p>
        <p style={{ fontFamily:'sans-serif'}} className='font-semibold sm:text-2xl text-sm relative sm:top-2 top-0'>CALIFORNIA</p>
        <p className='sm:text-sm text-xs font-bold relative sm:top-3 top-1'>BOOK NOW</p>
      </Link>
  </div>

  <div className='flex flex-col'>

    <div className="sm:w-[614px] w-[200px] sm:h-[360px] h-[105px] overflow-hidden">
      <img 
        src="https://i.pinimg.com/736x/aa/fd/c9/aafdc9023109c5467125c52e881bc1ad.jpg"
        className='transition-transform hover:scale-104 duration-300 w-full h-full object-cover cursor-pointer'
      />

           <Link className='z-10 sm:top-[900px] top-[300px] absolute text-left sm:left-[700px] left-[185px] text-white' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        <p className='sm:text-4xl text-sm'>Hong Kong</p>
        <p className='sm:text-4xl text-sm'>Disneyland Resort</p>
        <p className='sm:text-sm text-xs font-bold relative sm:top-3 top-1'>BOOK NOW</p>
      </Link>
    </div>

    <div className="sm:w-[614px] w-[200px] sm:h-[310px] h-[105px] overflow-hidden">
      <img 
        src="https://i.pinimg.com/736x/0c/9b/fe/0c9bfe488fd9770e243a51e5e3e2d4f5.jpg"
        className='transition-transform hover:scale-104 duration-300 w-full h-full object-cover cursor-pointer'
      />

         <Link to="#" className='z-10 sm:top-[1280px] top-[424px] absolute text-right sm:left-[1030px] left-[280px] text-white' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        <p className='sm:text-3xl text-sm'>Tangled</p>
        <p className='sm:text-3xl text-sm'>Movie Tickets</p>
        <p className='sm:text-sm text-xs font-bold relative sm:top-3 top-0'>BOOK NOW</p>
      </Link>
      </div>

  </div>
</div>


    <p className='sm:text-3xl text-2xl mt-10 flex sm:ml-20 ml-5.5'>More Princess Magic</p>

    <div className='flex flex-col sm:flex-row pb-10 justify-center items-center sm:mt-10 mt-5 gap-y-10 sm:gap-y-0 sm:gap-x-3'>
      <div className='flex flex-col'>
      <img src="https://i.pinimg.com/736x/04/f6/06/04f606931d3851f2923e5176b47ecc19.jpg"
    className='sm:w-75 w-82 cursor-pointer'
    />

     <Link className='text-2xl text-left mt-4'>Tokyo Disney Resort</Link>

      <Link className='text-sm text-left w-[330px]'>Two theme parks, Disney Hotels and lots of fun.
      </Link>
      </div>

       <div className='flex flex-col'>
         <img src="https://i.pinimg.com/736x/38/26/cf/3826cf84d7a5e8ec609a86f0544eb382.jpg"
    className='sm:w-68.5 w-82 cursor-pointer'
    />
 <Link className='text-2xl text-left mt-4'>Disneyland Paris</Link>

  <Link className='text-sm text-left w-[330px]'>See Mickey Mouse like you've never seen before</Link>
       </div>

        <div className='flex flex-col'>
    <img src="https://i.pinimg.com/736x/22/b1/09/22b109f8dddbcb9c8edd8f3adc4b679d.jpg"
    className='sm:h-74 h-50 cursor-pointer'
    />

     <Link className='text-2xl text-left mt-4'>Disney Cruise Line</Link>

       <Link className='text-sm text-left w-[330px]'>Where Magic Meets the Sea</Link>
        </div>
    </div>   
    </div>
  )
}

export default Home

export let homeLoader=async()=>{
  return [
      "https://wallpapers.com/images/hd/disney-4k-gkwca18qluofxgum.jpg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/17907.jpeg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/11083.jpg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/17499.jpg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/20163.jpg",
      "https://wallpapers.com/images/hd/disney-4k-gkwca18qluofxgum.jpg",  
  ]
}