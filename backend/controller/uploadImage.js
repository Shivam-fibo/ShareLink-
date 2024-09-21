import  File from '../models/file.js'

export const uploadImage = async (req, res) => {
  const { userId } = req.body;
  const fileObj = {
      path: req.file.path,
      name: req.file.originalname,
      userId,
  };
  try {
      const file = await File.create(fileObj);
      res.status(200).json({ path: `http://localhost:8000/file/${file._id}` });
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
    try {
        const userId = req.user._id; 

      
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
