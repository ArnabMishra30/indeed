import express from 'express'
import { getallusers, getuserbyid, logincontroller, logout, registercontroller, updateuser } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

//url or API -- http://localhost:5000/api/v1/user/register
router.post("/register", registercontroller)
router.post("/login", logincontroller)
router.put("/update", protect, updateuser)
router.get("/allusers",protect, getallusers)
router.get("/:id",protect, getuserbyid)
router.post("/logout", protect, logout)

export default router;