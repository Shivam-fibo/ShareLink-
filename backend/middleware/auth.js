import user from "../models/user.js";

import jwt from "jsonwebtoken";

 const authMiddleware = (async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await user.findById(decoded.id);

  next();
});
export default authMiddleware
