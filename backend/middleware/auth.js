const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies; 
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    req.user = await user.findById(decoded.id);
    console.log("User:", req.user); // Debugging

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
 
export default authMiddleware