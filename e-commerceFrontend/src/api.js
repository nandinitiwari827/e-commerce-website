import axios from "axios"

let API_BASE_URL = "http://localhost:1234/api/v1"

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized - token expired or invalid");
      localStorage.removeItem("accessToken");
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
);

export let registerUser=async(formData)=>{
    try{
        let response=await axios.post(`${API_BASE_URL}/users/register`, formData, {
            headers: {
                "Content-type": "application/json"
            }
        })
        return response.data
    }catch(error){
        console.log("Registration error: " ,error.response?.data || error.message)
        throw error
    }
}

export let checkEmailExists = async (email) => {
  try {
    let response = await axios.post(`${API_BASE_URL}/users/check-email`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export let loginUser=async(loginData)=>{
    try{
        let response=await axios.post(`${API_BASE_URL}/users/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        console.log('Login response:', response.data);
        return response.data
    }catch(error){
       console.log('Login error (full response): ', error.response);
    console.log('Login error message: ', error.response?.data?.message || error.message);
    throw error
    }
}

export const getCurrentUser = async () => {
  try {
    console.log("Calling getCurrentUser with URL:", `${API_BASE_URL}/users/current-user`);
    let response = await axios.get(`${API_BASE_URL}/users/current-user`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    console.log("getCurrentUser response:", response.data);
    return response.data;
  } catch (error) {
    console.error("getCurrentUser error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
}

export let logoutUser=async()=>{
    try{
        let response=await axios.post(`${API_BASE_URL}/users/logout`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
     if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Logout failed with status: ${response.status}`);
        }
    }catch(error){
      console.error('Logout failed:', {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
        });
    throw error
    }
}

export let changeCurrentPassword = async (oldPassword, newPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/change-password`, {
            oldPassword,
            newPassword,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('API error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
        });
        throw new Error(error.response?.data?.message || 'Failed to change password')
    }
}

export let updateAccountDetails=async(updateData)=>{
     try {
        let response = await axios.patch(`${API_BASE_URL}/users/update-account`, updateData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
       console.log("Details updation error: " ,error.response?.data || error.message)
        throw error
    }
}

export let updateAvatar=async(formaData)=>{
     try {
        let response = await axios.patch(`${API_BASE_URL}/users/update-avatar`,formaData, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Upload avatar error: " ,error.response?.data || error.message)
        throw error
    }
}

export let deleteAvatar=async()=>{
     try {
        let response = await axios.delete(`${API_BASE_URL}/users/delete-avatar`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Delete avatar error: " ,error.response?.data || error.message)
        throw error
    }
}

export let deleteAccount=async(userId)=>{
      try{
         let accessToken = localStorage.getItem("accessToken");
        
         let response=await axios.delete(`${API_BASE_URL}/users/delete-account/${userId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
     if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Account deletion failed with status: ${response.status}`);
        }
    }catch(error){
      console.error('Account deletion failed:', {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
        })
    throw error
    }
}

export let createProduct=async(productData)=>{
      try {
        let response = await axios.post(`${API_BASE_URL}/products/`,productData, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Create product error: " ,error.response?.data || error.message)
        throw error
    }
}

export let updateProduct=async(productId, productData)=>{
      try {
        let response = await axios.patch(`${API_BASE_URL}/products/${productId}`, productData, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Update product error: " ,error.response?.data || error.message)
        throw error
    }
}

export let deleteProduct=async(productId)=>{
      try {
        let response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Delete product error: " ,error.response?.data || error.message)
        throw error
    }
}

export let getProductById=async(productId)=>{
      try {
        let response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Get product by Id error: " ,error.response?.data || error.message)
        throw error
    }
}

export let getAllProducts=async()=>{
      try {
        let response = await axios.get(`${API_BASE_URL}/products/`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Get all products error: " ,error.response?.data || error.message)
        throw error
    }
}

export let rateProduct=async(productId, rating)=>{
      try {
        let response = await axios.post(`${API_BASE_URL}/products/${productId}`, {rating} , {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Rating product error: " ,error.response?.data || error.message)
        throw error
    }
}

export let addToWishlist=async(productId)=>{
      try {
        let response = await axios.post(`${API_BASE_URL}/wishlist/${productId}`, {}, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Add product to wishlist error: " ,error.response?.data || error.message)
        throw error
    }
}

export let removeFromWishlist=async(productId)=>{
      try {
        let response = await axios.delete(`${API_BASE_URL}/wishlist/${productId}`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Remove product from wishlist error: " ,error.response?.data || error.message)
        throw error
    }
}

export let getWishlist=async()=>{
      try {
        let response = await axios.get(`${API_BASE_URL}/wishlist/` , {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Get wishlist error: " ,error.response?.data || error.message)
        throw error
    }
}

export let addToCart=async(productId, size, quantity=1)=>{
      try {
        let response = await axios.post(`${API_BASE_URL}/cart/${productId}`, {size, quantity}, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Add product to cart error: " ,error.response?.data || error.message)
        throw error
    }
}

export let removeFromCart=async(productId, size)=>{
      try {
        let response = await axios.delete(`${API_BASE_URL}/cart/${productId}`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: {size}
        })
        return response.data
    } catch (error) {
       console.log("Remove product from cart error: " ,error.response?.data || error.message)
        throw error
    }
}

export let getCartlist=async()=>{
      try {
        let response = await axios.get(`${API_BASE_URL}/cart/` , {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Get cartlist error: " ,error.response?.data || error.message)
        throw error
    }
}

export let clearCart=async()=>{
      try {
        let response = await axios.delete(`${API_BASE_URL}/cart/` , {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("clear cart error: " ,error.response?.data || error.message)
        throw error
    }
}

export let createOrder=async(orderData)=>{
     try {
        let response = await axios.post(`${API_BASE_URL}/orders/`,orderData, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Create order error: " ,error.response?.data || error.message)
        throw error
    }
}

export let getOrderById=async(orderId)=>{
     try {
        let response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Get product by id error: " ,error.response?.data || error.message)
        throw error
    }
}

export let getAllOrders=async()=>{
     try {
        let response = await axios.get(`${API_BASE_URL}/orders/`, {
              headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
       console.log("Get all orders error: " ,error.response?.data || error.message)
        throw error
    }
}
