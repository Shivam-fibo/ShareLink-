import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

//signup

const signup = async (req, res) =>{
  
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: "this email is already exist try new one!"})
        }
        user = new User({name, email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
      await  user.save();
        const payload = { user: { id: user.id } };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({user, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Server error"})
    }
}

//login
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email address" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password is wrong" });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });


        return res.json({ user, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

//getUser
 const getUser = async(req, res, next) =>{
    const user = req.user;
    res.status(200).json({
      success: true,
      user
    })
  }

export {login, signup, getUser};