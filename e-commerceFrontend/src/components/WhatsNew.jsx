import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

function WhatsNew() {
  let images = useLoaderData()
  let [currentIndex, setCurrentIndex] = useState(0)

  let slideLeft = (e) => {
    e.preventDefault()
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1)
    }
  }

  let slideRight = (e) => {
    e.preventDefault()
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1)
    }
  }

  return (
    <div className='min-h-screen bg-[#EEEEEE]'>

      <div className='w-full max-w-[1263px] h-[300px] sm:h-[500px] md:h-[600px] lg:h-[720px] overflow-hidden flex mx-auto relative'>
        {/* <div className='flex transition-transform duration-700 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}>
          {images.map((img, idx) => (
            <img key={idx} src={img} className='w-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer bg-no-repeat flex-shrink-0'
            />
          ))}
        </div> */}

        <div
  className="flex transition-transform duration-700 ease-in-out"
  style={{
    transform: `translateX(-${currentIndex * 100}%)`,
    width: `${images.length * 100}%`,
  }}
>
  {images.map((img, idx) => (
    <div key={idx} className="w-full flex-shrink-0">
      <img
        src={img}
        alt={`slide-${idx}`}
        className="w-full h-[250px] sm:h-[500px] md:h-[600px] lg:h-[720px] object-cover transition-transform hover:scale-105 duration-300 cursor-pointer bg-no-repeat"
      />
    </div>
  ))}
</div>

   <Link className="underline text-white absolute text-sm sm:text-base lg:text-lg bottom-26 sm:bottom-22 lg:bottom-24 left-1/2 -translate-x-1/2 z-10 text-center">Try our new Movies
</Link>

<button className="absolute bottom-15 sm:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-10 text-white font-bold bg-red-500 rounded-3xl px-4 sm:px-6 py-2 text-sm sm:text-base lg:text-lg"> Find out more
</button>

        <button onClick={slideLeft}
          className='z-10 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer group focus:outline-none'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
            <path fill="#fff" d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"
              className='fill-white/30 group-hover:fill-white duration-300 group-focus:fill-white'
            />
          </svg>
        </button>

        <button onClick={slideRight}
          className="z-10 absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer group focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
            <path d="m10.828 12l4.95 4.95l-1.414 1.415L8 12l6.364-6.364l1.414 1.414z"
              className="fill-white/30 group-hover:fill-white group-focus:fill-white duration-300"
            />
          </svg>
        </button>
      </div>

      <p className='text-xl sm:text-2xl md:text-3xl mt-8 flex px-6 sm:px-20'>Latest News</p>

      <div className='flex justify-center mt-10 px-4'>
        <img src='https://i.pinimg.com/736x/04/4d/1a/044d1ad66efbd22c158f452d2b91c3ba.jpg'
          className='object-cover bg-no-repeat w-full max-w-5xl h-auto max-h-[650px] cursor-pointer rounded-md'
        />
      </div>

      <div className='text-left mt-8 px-6 sm:px-20 flex flex-col'>
        <Link className='text-3xl sm:text-4xl md:text-5xl font-semibold max-w-4xl'>
          Disney Media+: Remarkable Partnerships . Magical Results
        </Link>

        <Link className='mt-4 text-base sm:text-lg max-w-5xl'>
          Disneymedia+ are passionate about creating promotional and marketing solutions for
          like-minded brands. We help our partners connect with consumers as they achieve their
          business objectives in creative and innovative ways through campaigns, products and experiences
          that leverage the length and breadth of Disney's assets from Disney to Pixar, Marvel and Lucasfilm
          (Star Wars).
        </Link>
      </div>

      <div className='flex flex-col lg:flex-row mt-12 justify-center gap-10 px-6 pb-16'>
        <div className='flex flex-col text-left text-xl max-w-md gap-y-3'>
           <Link to="https://www.youtube.com/watch?v=73QmOb3L0fU" target='_blank' className='relative cursor-pointer overflow-hidden'>
          <img src="https://i.pinimg.com/736x/8b/50/3f/8b503f2a19c1476ed2cc3f4db23c2f3a.jpg"
            className='h-[250px] sm:h-[400px] object-cover duration-400 transition-transform hover:scale-105 rounded-md'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
              <path d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"
                className='fill-white group-hover:fill-white/45 duration-600' />
              <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5"
                className='fill-white group-hover:fill-white/45 duration-600' />
            </svg>
          </div>
        </Link>
        <p>DuckTales</p>  
          <p className='text-sm'>
            Groove along with Shaan and Shubh to the TOOFANI rhythm and
            go WooHoo with us! Watch full episodes in Hindi on{' '}
            <Link to="https://www.youtube.com/watch?v=cPAbx5kgCJo" target='_blank' className='underline text-blue-600 font-bold'>
              YOUTUBE
            </Link>
          </p>
        </div>

        <div className='flex flex-col text-left text-xl max-w-md gap-y-3'>
           <Link to="https://www.youtube.com/watch?v=dyjUkQlmNj0" target='_blank' className='relative cursor-pointer overflow-hidden'>
          <img src="https://i.pinimg.com/736x/04/83/12/048312c52e57ca05a3d76312fd39f0e5.jpg"
            className='h-[250px] sm:h-[400px] object-cover duration-400 transition-transform hover:scale-105 rounded-md'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
              <path d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"
                className='fill-white group-hover:fill-white/45 duration-600' />
              <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5"
                className='fill-white group-hover:fill-white/45 duration-600' />
            </svg>
          </div>
        </Link>
         <p> Stay Fit With Cinderella and Fairy Godmother</p>
          <p className='text-sm'>
            Dance is a happy and healthy way for kids to stay fit. Here is an interactive video
            featuring Mickey and his friends who teach kids the virtues of staying healthy through a
            fun and engaging dance routine.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhatsNew

export function imagesLoader() {
  return [
    "https://4kwallpapers.com/images/walls/thumbs_3t/5880.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/16952.jpg",
    "https://i.pinimg.com/736x/ca/d4/56/cad45699427bf959d18b750d418ddfd5.jpg",
  ]
}
