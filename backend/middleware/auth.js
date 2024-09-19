import jwt from 'jsonwebtoken';

import user from '../models/user.js';

const isAuthenticated = async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ msg: "Authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await user.findById(decoded.id);
  
    next();
};

export default isAuthenticated;
