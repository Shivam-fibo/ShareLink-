import axios from 'axios'

const API_URL = 'http://localhost:8000'
export const uploadFile = async(data) =>{
        try {
       const response =  await axios.post(`${API_URL}/upload`, data)
          console.log(response.data.fileUrl)
            return response.data.fileUrl
        } catch (error) {
                console.log("Error", error)
        }
}