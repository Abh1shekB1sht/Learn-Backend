import { Router } from 'express';
import { loginUser, logOutUser, registerUser } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js'
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router()

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]), 
  (req, res, next) => {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    next();
  },
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logOutUser);

export default router;