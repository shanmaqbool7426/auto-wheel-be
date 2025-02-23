import { v2 as cloudinary } from "cloudinary";

// Configuring Cloudinary
cloudinary.config({ 
  cloud_name: 'dcfpazr4b', 
  api_key: '534884361264524', 
  api_secret: 'eM-jhJ0tX2nk1R97TPIpQyusB2o' 
});

const uploadOnCloudinary = async (fileBuffer, retries = 3) => {
    try {
        if (!fileBuffer) return null;
        
        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(fileBuffer);
        });

        return response;
    } catch (error) {
        console.log('Error uploading:', error);
        if (retries > 0) {
            return uploadOnCloudinary(fileBuffer, retries - 1);
        }
        return null;
    }
};

export { uploadOnCloudinary };
