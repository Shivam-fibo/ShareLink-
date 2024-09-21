import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    downloadContent: {
        type: Number,
        required: true,
        default: 0
    },
    userId:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
         }, 


})

const File = mongoose.model('file', fileSchema)

export default File