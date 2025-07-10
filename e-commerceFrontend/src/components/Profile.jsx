import React, { useState, useEffect, useRef } from 'react'
import logo from "../assets/logo.png"
import { updateAvatar, getCurrentUser, deleteAvatar } from '../api.js'

function Profile() {

     let [avatarClicked, setAvatarClicked] = useState(false)
     let [avatarUrl, setAvatarUrl] = useState("")
     let [avatarCameraClicked, setAvatarCameraClicked] = useState(false)
     let [user, setUser] = useState(null)
     let [loading, setLoading] = useState(false)
     let [pageLoader, setPageLoader]=useState(false)
     let [error, setError]=useState("")

let handleUpdateAvatar = () => {
setAvatarCameraClicked(true);
  };

  let handleUploadAvatar = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    setAvatarCameraClicked(false);

    try {
      let res = await updateAvatar(formData);
      setAvatarUrl(res.data.avatar);
    let updatedRes = await getCurrentUser();
    let updatedUser = updatedRes.data.user;

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      alert('upload failed');
    } finally {
      setLoading(false);
    }
  };

  let handleAvatarDelete = async () => {
    try {
      await deleteAvatar();
      setAvatarUrl('');
      setAvatarCameraClicked(false);
       let updatedRes = await getCurrentUser()
    let updatedUser = updatedRes.data.user

    setUser(updatedUser)

    localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (err) {
      alert('Failed to delete photo!');
    }
  }

   let modalRef = useRef(null);
  useEffect(() => {
    let handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAvatarClicked(false);
        setAvatarCameraClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
   avatarCameraClicked,
   avatarClicked,
  ])

  useEffect(()=>{
    let fetchUser=async()=>{
        try{
            setPageLoader(true)
            let response=await getCurrentUser()
            let userData=response.data.user
            setUser(userData)
            setAvatarUrl(userData.avatar)
            setPageLoader(false)
        }catch(err){
            console.error("Failed to fetch user: ",err)
             setError('Failed to fetch profile')
            setPageLoader(false)
        }
    }
    fetchUser()
  }, [])

   if(pageLoader){
     return (
      <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center'>
        <div className="w-14 h-14 border-8 border-dotted border-pink-500 rounded-full animate-spin"></div>
      </div>
    )}

    if(error){
    return <div className='min-h-screen bg-[#EEEEEE] flex justify-center items-center text-red-600'>Failed to fetch profile</div>
  }

return (
    <div className='w-full min-h-screen bg-cover bg-no-repeat' style={{ backgroundImage: `url("https://i.pinimg.com/736x/13/28/10/132810513b8650c6691ffd2f8538338f.jpg")` }}>
      <div className='w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8'>
        <div className='bg-white p-3 sm:p-4 md:p-5 flex flex-col md:flex-row gap-y-6 md:gap-x-6 items-center justify-center relative'>

          <div onClick={() => avatarUrl ? setAvatarCameraClicked(true) : document.getElementById("avatarInput").click()}>
            <div className='bg-gray-100 h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-[170px] lg:w-[170px] overflow-hidden relative'>
              {avatarUrl && (
                <img className="cursor-pointer object-cover w-full h-full" src={avatarUrl} />
              )}
              {loading && (
                <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 bg-black/30">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-4 border-dotted border-white rounded-full animate-spin"></div>
                </div>
              )}
              {!avatarUrl && !loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={handleUpdateAvatar} className="text-white bg-pink-600 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 512 512">
                      <path fill="white" fillRule="evenodd" d="M426.667 320v64h64v42.667h-64v64H384v-64h-64V384h64v-64z..."/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-y-2 text-left'>
            <p className='font-semibold text-2xl'>{user?.firstName} {user?.lastName || ""}</p>
            <div className='text-lg text-gray-600 flex gap-x-1'>Email: <span className='text-gray-500'>{user?.email}</span></div>
            <div className='text-lg text-gray-600 flex gap-x-1'>Mobile: <span className='text-gray-500'>{user?.phoneNumber}</span></div>
            <div className='text-lg text-gray-600 flex gap-x-1'>Date of Birth: <span className='text-gray-500'>{user?.birthdate && new Date(user?.birthdate).toLocaleDateString("en-GB")}</span></div>
          </div>

          <div className='absolute right-4 bottom-4 md:static md:self-end'>
            <img className='h-10' src={logo} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile