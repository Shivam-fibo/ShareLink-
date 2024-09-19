import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true
  },
  email:
  {
    type: String, 
    required: true, 
    unique: true
  },
  password:
  {
    type: String,
     required: true,
     minLength: [6, "Password must contain at least 6 characters!"],
  },
  date:
  {
    type: Date, 
    default: Date.now
  },
})


export default mongoose.model('User', userSchema)