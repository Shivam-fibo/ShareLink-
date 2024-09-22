import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies; 
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    console.log("Token from cookies:", req.cookies.token);
    
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging
    
    // Find user by the decoded ID
    req.user = await User.findById(decoded.user.id);
    console.log("User:", req.user); // Debugging

    // Check if the user exists
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Proceed to the next middleware
    next(); 
  } catch (err) {
    console.log("Error verifying token:", err); // Debugging
    return res.status(401).json({ message: 'Invalid token' });
  }
};
 
export default authMiddleware;
