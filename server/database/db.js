import mongoose from 'mongoose'



const DBConnection = async () =>{
    const MONODB_URL = 'mongodb+srv://sg641818:shivam@file-sharing.j6gzgyg.mongodb.net/';
    try {   
        await  mongoose.connect(MONODB_URL)
       console.log('Database connect succesfully')
    } catch (error) {
            console.error('Error while connect with database', error.message)
    }
}

export default DBConnection;