import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bottom-0 border-t bg-white w-full border-gray-200'>
      <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start mt-8 px-4 lg:px-0'>
        <div className='flex flex-col sm:flex-row items-center gap-6 lg:gap-x-12 ml-0 lg:ml-12'>
          <Link to='/'>
            <img src='https://i.pinimg.com/736x/2d/a2/39/2da239435be10f700af7401b21d4eea3.jpg'
              className='h-16 sm:h-20'
            />
          </Link>

          <div className='flex flex-wrap sm:flex-nowrap gap-4 sm:gap-x-8 items-center'>
            <Link to='/' className="font-bold text-sm text-black">
              HOME
            </Link>
            <Link to='/about' className="font-bold text-sm text-black">
              ABOUT
            </Link>
            <Link to='/whatsnew' className="font-bold text-sm text-black">
              WHAT'S NEW
            </Link>
          </div>
        </div>

        <div className='flex items-center gap-x-5 mt-6 lg:mt-0 mr-0 lg:mr-14'>
          <Link to="https://x.com/" target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"/>
            </svg>
          </Link>

          <Link to="https://www.facebook.com/" target='_blank' className='fill-black hover:fill-blue-600'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"/>
            </svg>
          </Link>

          <Link to="https://www.instagram.com/#" target='_blank' className='fill-black hover:fill-pink-600'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 8.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5"/><path fillRule="evenodd" d="M6.77 3.082a47.5 47.5 0 0 1 10.46 0c1.899.212 3.43 1.707 3.653 3.613a45.7 45.7 0 0 1 0 10.61c-.223 1.906-1.754 3.401-3.652 3.614a47.5 47.5 0 0 1-10.461 0c-1.899-.213-3.43-1.708-3.653-3.613a45.7 45.7 0 0 1 0-10.611C3.34 4.789 4.871 3.294 6.77 3.082M17 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-9.75 6a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0" clipRule="evenodd"/>
            </svg>
          </Link>

          <Link to="https://www.youtube.com/" target='_blank' className='fill-black hover:fill-red-600'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 4.15c-1.191 0-2.58.028-3.934.066l-.055.002c-1.378.039-2.49.07-3.366.215c-.913.151-1.671.44-2.277 1.063c-.608.625-.873 1.398-.998 2.323c-.12.89-.12 2.018-.12 3.42v1.524c0 1.4 0 2.528.12 3.419c.124.925.39 1.698.998 2.323c.606.624 1.364.912 2.277 1.063c.876.145 1.988.176 3.366.215l.055.002c1.355.038 2.743.066 3.934.066s2.58-.028 3.934-.066l.055-.002c1.378-.039 2.49-.07 3.366-.215c.913-.151 1.671-.44 2.277-1.063c.608-.625.874-1.398.998-2.323c.12-.89.12-2.018.12-3.42v-1.524c0-1.401 0-2.529-.12-3.419c-.124-.925-.39-1.698-.998-2.323c-.606-.624-1.364-.912-2.277-1.063c-.876-.145-1.988-.176-3.367-.215l-.054-.002A145 145 0 0 0 12 4.15m-1.128 10.501A.75.75 0 0 1 9.75 14v-4a.75.75 0 0 1 1.122-.651l3.5 2a.75.75 0 0 1 0 1.302z" clipRule="evenodd"/>
            </svg>
          </Link>
        </div>
      </div>

      <p className='text-sm text-gray-900 mt-6 px-4 text-center'>For questions or concerns, write to us at <Link className='underline hover:text-gray-500'>princess465@gmail.com</Link></p>

      <div className='flex justify-center mt-10'>
        <img src="https://i.pinimg.com/736x/2d/a2/39/2da239435be10f700af7401b21d4eea3.jpg"
          className='h-10'
        />
      </div>

      <div className='mt-6 flex flex-wrap justify-center items-center text-gray-800 w-full px-4 text-xs gap-x-4 gap-y-2'>
        <Link to="#" className='hover:text-blue-500'>About</Link>
        <Link to="#" className='hover:text-blue-500'>Careers</Link>
        <Link to="#" className='hover:text-blue-500'>Internet Safety</Link>
        <Link to="#" className='hover:text-blue-500'>Terms of Use</Link>
        <Link to="#" className='hover:text-blue-500'>Privacy Policy</Link>
        <Link to="#" className='hover:text-blue-500'>DMCA Notices</Link>
        <Link to="#" className='hover:text-blue-500'>Supplemental Terms of Use</Link>
        <Link to="#" className='hover:text-blue-500'>Addendum to Privacy Policy - for India</Link>
        <Link to="#" className='hover:text-blue-500'>Contest Terms and Conditions</Link>
        <Link to="#" className='hover:text-blue-500'>Channel Distribution</Link>
        <Link to="#" className='hover:text-blue-500'>Interest-Based Ads</Link>
      </div>

      <p className='my-7 text-xs text-gray-800 text-center'>© Disney © Disney•Pixar © & ™ Lucasfilm LTD © Marvel. All Rights Reserved</p>
    </footer>
  )
}

export default Footer
