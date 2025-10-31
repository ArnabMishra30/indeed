import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({message: "You haven't logged in yet.."})
    }
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(500).json({
            message: "Interal Server Error || Protect Middleware"
        })
    }
}