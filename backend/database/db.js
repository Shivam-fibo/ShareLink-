import mongoose from 'mongoose'


const  DBConnetion = async() =>{
 
    try {
        await mongoose.connect(process.env.MONGO_URL)        
        console.log("database is successfully connected")
    } catch (error) {
        console.log(error )
    }
}
export default DBConnetion