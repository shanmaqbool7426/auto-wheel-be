import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuring Cloudinary
cloudinary.config({ 
  cloud_name: 'dcfpazr4b', 
  api_key: '534884361264524', 
  api_secret: 'eM-jhJ0tX2nk1R97TPIpQyusB2o' 
});

const uploadOnCloudinary = async (localFilePath, retries = 3) => {
    try {
        if (!localFilePath) return null;
        
        // Direct upload without temp directory
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Clean up the file if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;

    } catch (error) {
        console.log('Error uploading:', error);

        if (retries > 0) {
            console.log(`Retrying upload... Attempts remaining: ${retries}`);
            return uploadOnCloudinary(localFilePath, retries - 1);
        }

        // Clean up on final failure
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

export { uploadOnCloudinary };
