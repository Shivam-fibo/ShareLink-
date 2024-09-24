import  File from '../models/file.js'
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
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
    const fileObj = {
      path: req.file.path,
      name: req.file.originalname,
      fileUrl: result.secure_url,
      userId,
    };
    
    // If you want to save it in DB, otherwise remove this
    const file = await File.create(fileObj);

    res.status(200).json({  fileUrl: result.secure_url });
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
