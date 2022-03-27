import axios from 'axios'
const API_URL = 'http://localhost:2000/api/users/'

const resgisterMidware = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)
    
    if (response.data) {
        console.log(response.data)
    }

    return response.data
}

const loginMidware = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        console.log(response.data)
    }

    return response.data
}

const fileUploadMidware = async (fileData) => {
    const response = await axios.post(API_URL + 'file-upload', fileData)

    if (response.data) {
        console.log(response.data)
    }

    return response.data
}



const authService = { resgisterMidware , loginMidware, fileUploadMidware }

export default authService
