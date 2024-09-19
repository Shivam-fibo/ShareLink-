import express from "express";
import { uploadImage, downloadImage } from "../controller/uploadImage.js";
import upload from "../utils/upload.js";
import {login, signup, getUser} from '../controller/authController.js'
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post('/upload',upload.single("file") , uploadImage);
router.get('/file/:fileId', downloadImage);
router.post('/signup', signup);
router.post('/login', login)
router.get('/getuser', getUser);

export default router