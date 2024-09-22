    import express from "express";
    import { uploadImage, downloadImage, getUserFiles } from "../controller/uploadImage.js";
    import upload from "../utils/upload.js";
    import {login, signup, getUser, logout} from '../controller/authController.js'
    import authMiddleware from "../middleware/auth.js";


    const router = express.Router();

    router.post('/upload', upload.single("file") , uploadImage);
    router.get('/file/:fileId', downloadImage);
    router.get('/user/:id/files', getUserFiles);
    router.post('/signup', signup);
    router.post('/login', login)
    router.post('/logout',logout)
    router.get('/getuser', getUser);
    router.get('/user/:userId/files', getUserFiles);

  

    export default router