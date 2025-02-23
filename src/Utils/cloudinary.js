import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configuring Cloudinary
cloudinary.config({ 
  cloud_name: 'dcfpazr4b', 
  api_key: '534884361264524', 
  api_secret: 'eM-jhJ0tX2nk1R97TPIpQyusB2o' 
});

// Ensure temp directory exists
const createTempDirectory = () => {
  const tempDir = path.join(process.cwd(), 'public', 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
};

const uploadOnCloudinary = async (localFilePath, retries = 9) => {
    try {
        if (!localFilePath) return null;
        
        // Ensure temp directory exists before upload
        createTempDirectory();

        if (!fs.existsSync(localFilePath)) {
            console.error(`File not found: ${localFilePath}`);
            return null;
        }

        console.log('localFilePath', localFilePath);
        
        // Attempt the upload
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log('>>> localFilePath', response);

        // Remove file after successful upload
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.log('Error deleting local file:', unlinkError);
        }

        return response;

    } catch (error) {
        console.log('Error uploading', error);

        // Retry logic
        if (retries > 0) {
            console.log(`Retrying upload... Attempts remaining: ${retries}`);
            return uploadOnCloudinary(localFilePath, retries - 1);
        } else {
            console.log('Max retries reached. Upload failed.');
            try {
                fs.unlinkSync(localFilePath);
            } catch (unlinkError) {
                console.log('Error deleting local file:', unlinkError);
            }
            return null;
        }
    }
};

export { uploadOnCloudinary };
