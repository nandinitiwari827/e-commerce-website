import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { State, City } from 'country-state-city'
import { usePostalCodeValidation } from 'postal-code-checker';

function Address() {
    let navigate=useNavigate()

    let [errors, setErrors]=useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLine: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    })

        let [formData, setFormData]=useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLine: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    })

     let handleChange=(e)=>{
        let {name, value}=e.target
        setFormData({...formData, [name]: value})
        setErrors({...errors, [name]: ''})
    }

    let phoneNumberRegex=/^[0-9]{10}$/

    let indianStates = useMemo(() => State.getStatesOfCountry('IN'), [])

  let { validatePostalCode } = usePostalCodeValidation();

      let handleContinue = async(e)=>{
      e.preventDefault()
      setErrors({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLine: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    })

        let newErrors={}
        if(!formData.firstName){
            newErrors.firstName='Please enter your first name.'
        }
        if(!formData.phoneNumber || (formData.phoneNumber && !phoneNumberRegex.test(formData.phoneNumber))){
            newErrors.phoneNumber='Please enter your phone number of 10 digits.'
        }
        if(!formData.addressLine){
            newErrors.addressLine='Please enter your address.'
        }

       let indianStates = State.getStatesOfCountry('IN')
        let stateIso = indianStates.find(
        (s) => s.name.toLowerCase() === formData.state.trim().toLowerCase()
        )?.isoCode;
        let stateCities = stateIso ? City.getCitiesOfState('IN', stateIso) : []
        let isValidCity = stateCities.some(c => c.name.toLowerCase() === formData.city.trim().toLowerCase())
        if (!formData.city) {
        newErrors.city = 'Please enter city.'
        } else if (!isValidCity) {
        newErrors.city = 'City not found in the selected state.'
        }

        let isValidState = indianStates.some(s => s.name.toLowerCase() === formData.state.trim().toLowerCase())
        if (!formData.state) {
        newErrors.state = 'Please enter state.'
        } else if (!isValidState) {
        newErrors.state = 'Please enter a valid Indian state.'
        }

    let postalCode = formData.postalCode.trim();
    let isValidPostalCode = postalCode && validatePostalCode('IN', postalCode); 
    if (!postalCode) {
      newErrors.postalCode = 'Please enter PIN code.';
    } else if (!isValidPostalCode) {
      newErrors.postalCode = 'Invalid PIN code for India.';
    }
    
        if (!formData.country) {
        newErrors.country = 'Please enter country.'
        } else if (formData.country.trim().toLowerCase() !== 'india') {
        newErrors.country = 'Only India is supported as a country.'
        }

    if(Object.keys(newErrors).length>0){
    setErrors(newErrors)
    return
    }

    try{
      let userData = JSON.parse(localStorage.getItem("user"));
      let user = userData?._id;
        if (!user) {
            navigate("/login");
            return;
        }
     
        localStorage.setItem("shippingAddress", JSON.stringify(formData));
         navigate("/cart/payment")
    }catch(error){
     console.error("Order placing error: ")
    
    }}

 return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-[600px] rounded-lg border-1 border-gray-400 px-4 mt-8 py-2'>
        <p className='text-lg font-semibold p-2 text-left w-full border-b-1 border-gray-300'>Add Address</p>

        <div className='flex flex-col gap-y-5 mt-4'>
          <textarea
            type='text'
            name='addressLine'
            placeholder='Full address'
            value={formData.addressLine}
            onChange={handleChange}
            className='border-1 border-gray-400 rounded-md p-2'
          />
          {errors.addressLine && <p className='text-xs sm:text-[13px] text-red-600 relative bottom-3 text-left'>{errors.addressLine}</p>}

          <div className='flex justify-between gap-x-6'>
            <div className='w-full flex flex-col gap-y-2'>
              <input
                type='text'
                name='postalCode'
                placeholder='Pincode'
                value={formData.postalCode}
                onChange={handleChange}
                className='border-1 border-gray-400 rounded-md p-2 w-full'
              />
              {errors.postalCode && <p className='text-xs sm:text-[13px] text-red-600 relative text-left'>{errors.postalCode}</p>}
            </div>

            <div className='w-full flex flex-col gap-y-2'>
              <input
                type='text'
                name='city'
                placeholder='City/District'
                value={formData.city}
                onChange={handleChange}
                className='border-1 border-gray-400 rounded-md p-2 w-full'
              />
              {errors.city && <p className='text-xs sm:text-[13px] text-red-600 relative text-left'>{errors.city}</p>}
            </div>
          </div>

          <div className='flex justify-between gap-x-6'>
            <div className='w-full flex flex-col gap-y-2'>
              <input
                type='text'
                name='country'
                placeholder='Country'
                value={formData.country}
                onChange={handleChange}
                className=' border-1 border-gray-400 rounded-md p-2 w-full'
              />
              {errors.country && <p className='text-xs sm:text-[13px] text-red-600 relative text-left'>{errors.country}</p>}
            </div>

            <div className='w-full flex flex-col gap-y-2'>
              <input
                type='text'
                name='state'
                placeholder='State'
                value={formData.state}
                onChange={handleChange}
                className='border-1 border-gray-400 rounded-md p-2 w-full'
              />
              {errors.state && <p className='text-xs sm:text-[13px] text-red-600 relative text-left'>{errors.state}</p>}
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <p className='text-left text-lg'>Contact Details</p>

          <div className='flex flex-col gap-y-5 bg-[#F5F5F5] rounded-sm p-4 mt-2'>
            <input
              type='text'
              name='firstName'
              placeholder='First name'
              value={formData.firstName}
              onChange={handleChange}
              className='border-1 border-gray-400 rounded-md p-2 bg-white'
            />
            {errors.firstName && <p className='text-xs sm:text-[13px] text-red-600 relative text-left bottom-3'>{errors.firstName}</p>}

            <input
              type='text'
              name='lastName'
              placeholder='last name'
              value={formData.lastName}
              onChange={handleChange}
              className='border-1 border-gray-400 rounded-md p-2 bg-white'
            />

            <input
              type='text'
              name='phoneNumber'
              placeholder='Phone number'
              value={formData.phoneNumber}
              onChange={handleChange}
              className='border-1 border-gray-400 rounded-md p-2 bg-white'
            />
            {errors.phoneNumber && <p className='text-xs sm:text-[13px] text-red-600 relative text-left bottom-3'>{errors.phoneNumber}</p>}
          </div>
        </div>

        <button
          onClick={handleContinue}
          className='py-3 font-bold bg-blue-600 w-full max-w-[350px] rounded-sm mb-5 cursor-pointer hover:bg-blue-800 text-white mt-9 text-lg'>
          Continue To Payment
        </button>
      </div>
    </div>
  )
}

export default Address