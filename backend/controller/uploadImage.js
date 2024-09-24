import File from '../models/file.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config(); 

// Set up Cloudinary

  
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Set up Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2, // Ensure cloudinary.v2 is used
  params: {
    folder: 'uploads'
  },
});

const upload = multer({ storage });

export const uploadImage = async (req, res) => {
  const { userId } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  try {
    // Upload file to Cloudinary and wait for result
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: 'auto', // Handle all file types (image, video, etc.)
    });

    const fileObj = {
      path: result.secure_url, 
      name: req.file.originalname,
      fileUrl: result.secure_url,
      userId,
    };
    

    const file = await File.create(fileObj);

    res.status(200).json({ fileUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const downloadImage = async(request, response) =>{
    try {
        const file = await File.findById(request.params.fileId)
        file.downloadContent++
        await file.save()
        
        response.download(file.path, file.name)
    } catch (error) {
            console.error(response.error)
            response.status(500).json({error: error.message})
    }

}
export const getUserFiles = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(400).json({ message: 'User not found or unauthorized' });
      }
    try {
        const userId = req.user._id; 
        console.log(userId);
      
        const files = await File.find({ userId });

 
        if (!files.length) {
            return res.status(404).json({ message: 'No files found for this user' });
        }


        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching user files:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
