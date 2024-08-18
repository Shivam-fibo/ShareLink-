import mongoose from 'mongoose'


const  DBConnetion = async() =>{
  const  MONGO_URL = 'mongodb+srv://sg641818:shivam@file-share.kblxuh7.mongodb.net/'
    try {
        await mongoose.connect(MONGO_URL)        
        console.log("database is successfully connected")
    } catch (error) {
        console.log(error )
    }
}
export default DBConnetion