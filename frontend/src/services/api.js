import axios from 'axios'

const API_URL = 'https://file-sharing-application-one.vercel.app'
export const uploadFile = async(data) =>{
        try {
       const response =  await axios.post(`${API_URL}/upload`, data)
          console.log(response.data)
            return response.data
        } catch (error) {
                console.log("Error", error)
        }
}