import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'dcfpazr4b', 
  api_key: '534884361264524', 
  api_secret: 'eM-jhJ0tX2nk1R97TPIpQyusB2o' 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        console.log('localFilePath',localFilePath)
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log('>>> localFilePath',response)
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log('error uploading', error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}