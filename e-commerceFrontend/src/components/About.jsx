// import React from 'react'
// import { Link } from 'react-router-dom'

// function About() {
//   return (
//     <div className='min-h-screen bg-[#EEEEEE]'>
//       <div className='bg-[#162bc7] pb-10'>

//         <p className='text-5xl text-white pt-10' style={{fontFamily:"Times New Roman"}}>Who We Are?</p>
//         <p className='text-white pt-3'>Our mission is to inspire dreamers around the world with timeless tales of courage, kindness, and magic.</p>
        
      
    

//       <p className='text-4xl mt-20 font-semibold'>Our Worldwide Collaborations</p>

//       <div className='flex gap-x-6 mt-10 mx-20 justify-around'>
//         <div className='flex flex-col justify-center items-center gap-y-3'>
//            <Link to="https://www.pixar.com/" target='_blank'>
//         <img src="https://i.pinimg.com/736x/72/c8/d3/72c8d31d8779299857123e1966c4a710.jpg"
//         className='h-20 rounded-md'
//         />
//         </Link>

//          <Link to="https://www.pixar.com/" target='_blank' className='font-bold'>Pixar Animation Studios</Link>

//           <Link to="https://www.pixar.com/" target='_blank'>Brought timeless stories like Toy Story, Finding Nemo, and Inside Out to life. Pixar's 
//   creative storytelling and groundbreaking animation continue to expand Disney's magical universe.</Link>
//         </div>

//         <div className='flex flex-col justify-center items-center gap-y-3'>
//          <Link to="https://www.marvel.com/movies" target='_blank'>
//           <img src="https://i.pinimg.com/736x/71/bd/6d/71bd6db31ad4398d82bc728f0bff4421.jpg"
//           className='h-20 rounded-md'
//           />
//           </Link>

//            <Link to="https://www.marvel.com/movies" target='_blank' className='font-bold'>Marvel Studios</Link>

//             <Link to="https://www.marvel.com/movies" target='_blank' className=''>Home to the epic Marvel Cinematic Universe, bringing superheroes like Iron Man, 
//    Spider-Man, and the Avengers into global blockbuster hits, merging action and heart.</Link>
//         </div>

//         <div className='flex flex-col justify-center items-center gap-y-3'>
//           <Link to="https://store.epicgames.com/en-US/" target='_blank'>
//              <img src="https://i.pinimg.com/736x/bb/4f/cc/bb4fccdedac0d2cd2f0a2a88804e825b.jpg"
//           className='h-20 rounded-md'
//           />
//           </Link>

//            <Link to="https://store.epicgames.com/en-US/" target='_blank' className='font-bold'>Epic Games</Link>

//              <Link to="https://store.epicgames.com/en-US/" target='_blank' className=''>Partnered with Disney for unforgettable in-game experiences in Fortnite, introducing Marvel, 
//     Star Wars, and Disney characters into one of the world's biggest gaming platforms.</Link>
//         </div>

//         <div className='flex flex-col justify-center items-center gap-y-3'>
//            <Link to="https://www.hotstar.com/in/home?ref=%2Fin" target='_blank'>
//                <img src="https://i.pinimg.com/736x/4e/c2/aa/4ec2aa9e29fe07f31598bc0659d2883e.jpg"
//           className='h-20 rounded-md'
//           />
//           </Link>

//            <Link to="https://www.hotstar.com/in/home?ref=%2Fin" target='_blank' className='font-bold'>Disney+ Hotstar</Link>

//              <Link to="https://www.hotstar.com/in/home?ref=%2Fin" target='_blank'>Disney's streaming home in India and Southeast Asia, offering exclusive Disney, 
//      Marvel, Pixar, and Star Wars content alongside regional and sports entertainment.</Link>
//         </div>
//       </div>

// <div className='flex justify-center mt-30 gap-x-18 pb-16'>
 
//  <div className='flex flex-col w-[500px] text-left'>
//   <h1 className='text-3xl font-semibold'>About us</h1>
  
//   <p className='pt-3 text-sm'>The Disney Princesses are a collection of iconic heroines who have inspired audiences 
//     for generations with their courage, kindness, and adventurous spirits. From Cinderella's 
//     glass slipper to Moana's ocean voyage, each princess has a unique story rooted in timeless 
//     fairytales, folklore, and cultural legends from around the world. These beloved characters 
//     not only captivate through unforgettable movies like Beauty and the Beast, Frozen, and Aladdin, 
//     but also teach valuable life lessons about bravery, compassion, self-belief, and the power of 
//     friendship.</p>
 
//  <br/>

//   <p className='text-sm'>Known for their enchanting songs such as Let It Go and A Whole New World, their voices 
//     continue to resonate with dreamers of all ages. The princess's signature styles and personalities
//      have made them global icons, celebrated in Disney Parks, merchandise, and live entertainment. 
//      Together, they form a global sisterhood that embraces diversity and inspires fans everywhere to 
//      believe in magic and chase their dreams.</p>
//   </div>

//   <div>
//     <img src="https://i.pinimg.com/736x/47/10/44/471044fabadf214f718322c693eb099f.jpg"
//     className='rounded-lg h-80'
//     />
//   </div>
// </div>

//     </div>
//   )
// }

// export default About

import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='min-h-screen bg-[#EEEEEE]'>
   {/* <div className='bg-[#162bc7] pb-10 px-4'>
  <p className='text-3xl sm:text-4xl lg:text-5xl text-white pt-10 text-center' style={{ fontFamily: "Times New Roman" }}>
    Who We Are?
  </p>
  <p className='text-white pt-3 text-center text-sm sm:text-base'>
    Our mission is to inspire dreamers around the world with timeless tales of courage, kindness, and magic.
  </p>

    <div className='flex gap-x-2 justify-center pt-6'>
         
          <div className='flex flex-col gap-y-2'>
           
            <p className='bg-black/20 rounded-lg w-[150px] h-[150px] text-white text-[9px] pl-3 pt-3 text-left pr-2'>
            From the enchanting castles to the deepest forests, each princess 
            brings her own story and heart to our royal family.
            <p className='text-[23px] pt-5'>12 Countries</p>
             <p className='text-[15px]'>234 employees</p>
            </p>

            <Link to="#">
            <img src="https://i.pinimg.com/736x/a4/2a/f8/a42af8aba2bcd4c6b26bbeda30db7639.jpg"
            className='rounded-lg w-[150px]'
            /></Link>
          </div>
         
          <div>
            <Link to="#">
             <img src="https://i.pinimg.com/736x/8b/a6/7d/8ba67d7d0e33bde1964f73b61e990177.jpg"
             className='rounded-lg w-[173px]'
             />
            </Link> 
          </div>
         
          <div className='flex flex-col gap-y-2'>
           
            <Link to="#">
            <img src="https://i.pinimg.com/736x/dc/23/36/dc233639c2316acfb9d8ce8b96da5cb2.jpg"
             className='rounded-lg w-[150px]'
             />
            </Link>

              <p className='bg-black/20 rounded-lg w-[150px] h-[150px] text-white text-left text-2xl pt-2 pl-3'>490+ 
              <p className='text-[15px]'>Magical Friends</p>
              <p className='text-[9px] pr-2 pt-4'>Our Disney Princess stories are loved in 49+ countries, and our fans help 
                keep the magic alive by sharing their dreams with us every day.</p>
              </p>

          </div>
      </div>
</div> */}

<div className='bg-[#162bc7] pb-4 xs:pb-6 sm:pb-8 lg:pb-10 px-2 xs:px-3 sm:px-4 lg:px-6'>
  <p className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white pt-4 xs:pt-6 sm:pt-8 lg:pt-10 text-center' style={{ fontFamily: "Times New Roman" }}>
    Who We Are?
  </p>
  <p className='text-white pt-2 xs:pt-3 sm:pt-3 text-[10px] xs:text-xs sm:text-sm md:text-base text-center px-1 xs:px-2 sm:px-3'>
    Our mission is to inspire dreamers around the world with timeless tales of courage, kindness, and magic.
  </p>

  <div className='flex sm:flex-row gap-x-1 xs:gap-x-2 sm:gap-x-3 gap-y-3 xs:gap-y-4 sm:gap-y-0 justify-center pt-3 xs:pt-4 sm:pt-6'>
    <div className='flex flex-col gap-y-2 xs:gap-y-3 items-center'>
      <p className='bg-black/20 rounded-lg w-[100px] xs:w-[110px] sm:w-[130px] lg:w-[150px] h-[100px] xs:h-[110px] sm:h-[130px] lg:h-[150px] text-white text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] pl-2 xs:pl-2 sm:pl-3 pt-2 xs:pt-2 sm:pt-3 text-left pr-2'>
        From the enchanting castles to the deepest forests, each princess 
        brings her own story and heart to our royal family.
        <p className='text-[14px] xs:text-[15px] sm:text-[20px] lg:text-[23px] pt-2 xs:pt-2 sm:pt-4 lg:pt-5'>12 Countries</p>
        <p className='text-[8px] xs:text-[11px] sm:text-[13px] lg:text-[15px]'>234 employees</p>
      </p>
      <a>
        <img 
          src="https://i.pinimg.com/736x/a4/2a/f8/a42af8aba2bcd4c6b26bbeda30db7639.jpg"
          className='rounded-lg w-[100px] xs:w-[110px] sm:w-[130px] lg:w-[150px]'
          alt="Princess castle"
        />
      </a>
    </div>

    <div className='flex justify-center'>
      <a href="#">
        <img 
          src="https://i.pinimg.com/736x/8b/a6/7d/8ba67d7d0e33bde1964f73b61e990177.jpg"
          className='rounded-lg w-[117px] md:w-[120px] sm:w-[150px] lg:w-[173px]'
          alt="Disney princess"
        />
      </a> 
    </div>

    <div className='flex flex-col gap-y-2 xs:gap-y-3 items-center'>
      <a href="#">
        <img 
          src="https://i.pinimg.com/736x/dc/23/36/dc233639c2316acfb9d8ce8b96da5cb2.jpg"
          className='rounded-lg w-[100px] xs:w-[110px] sm:w-[130px] lg:w-[150px]'
          alt="Magical scene"
        />
      </a>
      <p className='bg-black/20 rounded-lg w-[100px] xs:w-[110px] sm:w-[130px] lg:w-[150px] h-[100px] xs:h-[110px] sm:h-[130px] lg:h-[150px] text-white text-left text-lg xs:text-xl sm:text-xl lg:text-2xl pt-2 pl-2 xs:pl-2 sm:pl-3'>
        490+ 
        <p className='text-[10px] xs:text-[11px] sm:text-[13px] lg:text-[15px]'>Magical Friends</p>
        <p className='text-[5px] xs:text-[8px] sm:text-[9px] lg:text-[10px] pr-2 pt-2 xs:pt-3 sm:pt-3 lg:pt-4'>
          Our Disney Princess stories are loved in 49+ countries, and our fans help 
          keep the magic alive by sharing their dreams with us every day.
        </p>
      </p>
    </div>
  </div>
</div>

      <p className='text-2xl sm:text-3xl lg:text-4xl mt-16 sm:mt-20 font-semibold text-center px-4'>Our Worldwide Collaborations</p>

      <div className='flex flex-col lg:flex-row gap-10 mt-10 px-4 sm:px-10 lg:px-20 justify-around items-center'>
        {[
          {
            title: "Pixar Animation Studios",
            desc: "Brought timeless stories like Toy Story, Finding Nemo, and Inside Out to life. Pixar's creative storytelling and groundbreaking animation continue to expand Disney's magical universe.",
            img: "https://i.pinimg.com/736x/72/c8/d3/72c8d31d8779299857123e1966c4a710.jpg",
            link: "https://www.pixar.com/"
          },
          {
            title: "Marvel Studios",
            desc: "Home to the epic Marvel Cinematic Universe, bringing superheroes like Iron Man, Spider-Man, and the Avengers into global blockbuster hits, merging action and heart.",
            img: "https://i.pinimg.com/736x/71/bd/6d/71bd6db31ad4398d82bc728f0bff4421.jpg",
            link: "https://www.marvel.com/movies"
          },
          {
            title: "Epic Games",
            desc: "Partnered with Disney for unforgettable in-game experiences in Fortnite, introducing Marvel, Star Wars, and Disney characters into one of the world's biggest gaming platforms.",
            img: "https://i.pinimg.com/736x/bb/4f/cc/bb4fccdedac0d2cd2f0a2a88804e825b.jpg",
            link: "https://store.epicgames.com/en-US/"
          },
          {
            title: "Disney+ Hotstar",
            desc: "Disney's streaming home in India and Southeast Asia, offering exclusive Disney, Marvel, Pixar, and Star Wars content alongside regional and sports entertainment.",
            img: "https://i.pinimg.com/736x/4e/c2/aa/4ec2aa9e29fe07f31598bc0659d2883e.jpg",
            link: "https://www.hotstar.com/in/home?ref=%2Fin"
          }
        ].map((item, idx) => (
          <div key={idx} className='flex flex-col justify-center items-center gap-y-3 max-w-sm text-center'>
            <Link to={item.link} target='_blank'>
              <img src={item.img} className='h-20 rounded-md' />
            </Link>
            <Link to={item.link} target='_blank' className='font-bold'>{item.title}</Link>
            <Link to={item.link} target='_blank' className='text-sm'>{item.desc}</Link>
          </div>
        ))}
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center mt-20 gap-10 px-4 pb-16'>
        <div className='flex flex-col w-full max-w-2xl text-left'>
          <h1 className='text-2xl sm:text-3xl font-semibold'>About us</h1>

          <p className='pt-3 text-sm'>The Disney Princesses are a collection of iconic heroines who have inspired audiences
            for generations with their courage, kindness, and adventurous spirits. From Cinderella's
            glass slipper to Moana's ocean voyage, each princess has a unique story rooted in timeless
            fairytales, folklore, and cultural legends from around the world. These beloved characters
            not only captivate through unforgettable movies like Beauty and the Beast, Frozen, and Aladdin,
            but also teach valuable life lessons about bravery, compassion, self-belief, and the power of
            friendship.</p>

          <br />

          <p className='text-sm'>Known for their enchanting songs such as Let It Go and A Whole New World, their voices
            continue to resonate with dreamers of all ages. The princess's signature styles and personalities
            have made them global icons, celebrated in Disney Parks, merchandise, and live entertainment.
            Together, they form a global sisterhood that embraces diversity and inspires fans everywhere to
            believe in magic and chase their dreams.</p>
        </div>

        <div>
          <img src="https://i.pinimg.com/736x/47/10/44/471044fabadf214f718322c693eb099f.jpg"
            className='rounded-lg h-72 sm:h-80 object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default About
